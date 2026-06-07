import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { Calculation } from './entities/calculation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calculation])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
