import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';
import { Calculation } from '../history/entities/calculation.entity';
import { FinancialEngine } from '../engine/financial.engine';
import { CriticalEngine } from '../engine/critical.engine';
import { VolatilityEngine } from '../engine/volatility.engine';
import { AlertsEngine } from '../engine/alerts.engine';

@Module({
  imports: [TypeOrmModule.forFeature([Calculation])],
  controllers: [CalculatorController],
  providers: [
    CalculatorService,
    FinancialEngine,
    CriticalEngine,
    VolatilityEngine,
    AlertsEngine,
  ],
})
export class CalculatorModule {}
