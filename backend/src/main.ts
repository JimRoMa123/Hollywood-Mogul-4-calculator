import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://hm4_frontend:5173',
    ],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      exceptionFactory: (errors) => {
        // Clean errors by recursively stripping target property to avoid massive logs
        const stripTarget = (errs: any[]): any[] => {
          return errs.map((err) => {
            const { target, ...rest } = err;
            if (rest.children && rest.children.length > 0) {
              rest.children = stripTarget(rest.children);
            }
            return rest;
          });
        };
        console.error(
          '❌ Validation Errors:',
          JSON.stringify(stripTarget(errors), null, 2),
        );

        const getConstraints = (error: any): string[] => {
          const list: string[] = [];
          if (error.constraints) {
            list.push(...Object.values(error.constraints));
          }
          if (error.children) {
            for (const child of error.children) {
              list.push(...getConstraints(child));
            }
          }
          return list;
        };

        const messages = errors.map(getConstraints).flat();
        return new BadRequestException(messages);
      },
    }),
  );

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🎬 HM4 Calculator API running on http://localhost:${port}/api`);
}
bootstrap().catch((err) => console.error(err));
