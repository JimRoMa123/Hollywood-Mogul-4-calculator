import { Injectable } from '@nestjs/common';
import { CalculateMovieDto } from '../calculator/dto/calculate-movie.dto';

@Injectable()
export class VolatilityEngine {
  calculate(dto: CalculateMovieDto): {
    vrc: number;
    vrcMin: number;
    vrcMax: number;
    riskLabel: string;
    lightningInBottle: boolean;
    bankruptcyRisk: boolean;
  } {
    const avgHumility = dto.castData.length > 0
      ? dto.castData.reduce((acc, c) => acc + c.humility, 0) / dto.castData.length
      : 50;

    // ── 1. Creative conflict tension (§4.3)
    const tension = Math.abs(dto.dirPerfectionism - avgHumility);

    // ── 2. Lightning in a bottle: high tension → rare upside event
    const lightningInBottle = tension > 60;
    const lightningBonus = lightningInBottle ? 30 : 0;

    // ── 3. Environmental chaos (§6.1)
    const chaosBase = dto.hasAdditionalVillains ? 25 : 0;
    const contingencyRatio = (dto.studioCash - dto.budget - dto.marketingBudget) / dto.budget;
    const bankruptcyRisk = dto.hasAdditionalVillains && contingencyRatio < 0.15;
    const chaosAmplifier = bankruptcyRisk ? 40 : chaosBase;

    // ── 4. Nudity instability (§6.3)
    const nudityInstability = dto.hasNudity ? 10 : 0;

    // ── 5. VFX risk: high VFX % with low director effects skill
    const totalVfxPct = dto.vfxBudgetPct + dto.creatureFxPct;
    const vfxRisk = totalVfxPct > 25 && dto.dirEffects < 50
      ? (totalVfxPct - 25) * 0.6
      : 0;

    // ── 6. Director on-budget = risk mitigation
    const budgetMitigation = (dto.dirOnBudget / 100) * 15;

    // ── 7. Franchise stability
    const franchiseStability = dto.franchiseMode ? -(dto.franchiseMomentum || 0) * 0.1 : 0;

    // ── Base VRC (higher = more volatile/risky)
    let vrcBase = (tension * 0.3) + chaosAmplifier + nudityInstability + vfxRisk - budgetMitigation + franchiseStability;

    vrcBase = Math.min(Math.max(vrcBase, 0), 100);

    // ── Calculate range band
    const vrcMin = Math.max(0, vrcBase - 20);
    const vrcMax = Math.min(100, vrcBase + lightningBonus);
    const vrc = (vrcMin + vrcMax) / 2;

    // ── Risk label
    let riskLabel = 'BAJO';
    if (vrc > 75 || bankruptcyRisk) riskLabel = 'CATASTRÓFICO';
    else if (vrc > 55) riskLabel = 'ALTO';
    else if (vrc > 35) riskLabel = 'MEDIO';
    else riskLabel = 'BAJO';

    return {
      vrc: Math.round(vrc * 100) / 100,
      vrcMin: Math.round(vrcMin * 100) / 100,
      vrcMax: Math.round(vrcMax * 100) / 100,
      riskLabel,
      lightningInBottle,
      bankruptcyRisk,
    };
  }
}
