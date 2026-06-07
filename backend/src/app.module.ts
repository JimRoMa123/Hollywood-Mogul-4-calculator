import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculatorModule } from './calculator/calculator.module';
import { HistoryModule } from './history/history.module';
import { Calculation } from './history/entities/calculation.entity';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '.env'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3000', 10),
      username: process.env.DB_USERNAME || 'sofi',
      password: process.env.DB_PASSWORD || 'hollywood2024',
      database: process.env.DB_DATABASE || 'hm4_calculator',
      entities: [Calculation],
      synchronize: true,
      logging: false,
    }),
    CalculatorModule,
    HistoryModule,
  ],
})
export class AppModule {}
