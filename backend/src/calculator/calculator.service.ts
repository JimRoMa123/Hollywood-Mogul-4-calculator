import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalculateMovieDto } from './dto/calculate-movie.dto';
import { Calculation } from '../history/entities/calculation.entity';
import { FinancialEngine } from '../engine/financial.engine';
import { CriticalEngine } from '../engine/critical.engine';
import { VolatilityEngine } from '../engine/volatility.engine';
import { AlertsEngine } from '../engine/alerts.engine';

@Injectable()
export class CalculatorService {
  constructor(
    @InjectRepository(Calculation)
    private readonly calculationRepo: Repository<Calculation>,
    private readonly financialEngine: FinancialEngine,
    private readonly criticalEngine: CriticalEngine,
    private readonly volatilityEngine: VolatilityEngine,
    private readonly alertsEngine: AlertsEngine,
  ) {}

  async calculate(dto: CalculateMovieDto) {
    // Run all three engines
    const financial = this.financialEngine.calculate(dto);
    const critical = this.criticalEngine.calculate(dto);
    const volatility = this.volatilityEngine.calculate(dto);

    // Generate alerts and recommendations
    const { alerts, recommendations } = this.alertsEngine.generate(dto, {
      bankruptcyRisk: volatility.bankruptcyRisk,
      lightningInBottle: volatility.lightningInBottle,
      projectedCostOverrun: financial.projectedCostOverrun,
      marketingEfficiencyPoint: financial.marketingEfficiencyPoint,
    });

    // Save to database
    const calculation = this.calculationRepo.create({
      ...dto,
      franchiseMode: dto.franchiseMode ?? false,
      franchiseMomentum: dto.franchiseMomentum ?? 0,
      fbp: financial.fbp,
      iab: critical.iab,
      vrc: volatility.vrc,
      vrcMin: volatility.vrcMin,
      vrcMax: volatility.vrcMax,
      riskLabel: volatility.riskLabel,
      alerts,
      recommendations,
      projectedBoxOffice: financial.projectedBoxOffice,
      projectedCostOverrun: financial.projectedCostOverrun,
    });

    const saved = await this.calculationRepo.save(calculation);

    return {
      id: saved.id,
      movieTitle: dto.movieTitle,
      // Core outputs
      fbp: financial.fbp,
      iab: critical.iab,
      vrc: volatility.vrc,
      vrcMin: volatility.vrcMin,
      vrcMax: volatility.vrcMax,
      riskLabel: volatility.riskLabel,
      budget: dto.budget,
      marketingBudget: dto.marketingBudget,
      // Detailed breakdowns
      criticalBreakdown: critical.criticalBreakdown,
      projectedBoxOffice: financial.projectedBoxOffice,
      projectedCostOverrun: financial.projectedCostOverrun,
      marketingEfficiencyPoint: financial.marketingEfficiencyPoint,
      lightningInBottle: volatility.lightningInBottle,
      bankruptcyRisk: volatility.bankruptcyRisk,
      // Alerts & recommendations
      alerts,
      recommendations,
    };
  }
}
