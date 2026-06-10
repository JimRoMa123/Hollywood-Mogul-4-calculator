import { Injectable } from '@nestjs/common';
import { CalculateMovieDto } from '../calculator/dto/calculate-movie.dto';

// Helper: convert 1-5 star to 0-100 scale
const s2p = (stars: number): number => Math.min(100, Math.max(0, (stars / 5) * 100));
// Helper: convert 1-3 star to 0-100 scale
const s3p = (stars: number): number => Math.min(100, Math.max(0, (stars / 3) * 100));

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
    const {
      director,
      castData,
      hasAdditionalVillains,
      additionalVillain,
      budget,
      marketingBudget,
      studioCash,
      hasNudity,
      productionCrew,
      postProduction,
      franchiseMode,
      franchiseMomentum,
      movieRating,
      preProduction,
      soundtrack,
    } = dto;

    const dirPerfectionism = s2p(director.perfectionist);
    const dirEffects = s2p(director.effects);
    const dirOnBudget = s2p(director.onBudget);

    const avgHumility =
      castData.length > 0
        ? castData.reduce((acc, c) => acc + s2p(c.humility), 0) / castData.length
        : 50;

    const isAdditionalVillains =
      !!(hasAdditionalVillains || (additionalVillain && additionalVillain !== 'None'));

    // ── 1. Creative conflict tension
    const tension = Math.abs(dirPerfectionism - avgHumility);

    // ── 2. Lightning in a bottle
    const lightningInBottle = tension > 60;
    const lightningBonus = lightningInBottle ? 30 : 0;

    // ── 3. Environmental chaos
    const chaosBase = isAdditionalVillains ? 25 : 0;
    const totalBudget = budget + marketingBudget;
    const contingencyReserve = studioCash - totalBudget;
    const contingencyRatio = contingencyReserve / budget;
    const bankruptcyRisk = isAdditionalVillains && contingencyRatio < 0.15;
    const chaosAmplifier = bankruptcyRisk ? 40 : chaosBase;

    // ── 4. Nudity instability
    const nudityInstability = hasNudity ? 10 : 0;

    // ── 5. VFX risk
    const preCost =
      preProduction.costumeDesignTeamCost * preProduction.costumeDesignMonths +
      preProduction.setDesignTeamCost * preProduction.setDesignMonths;

    const prodCost =
      productionCrew.crewCost * productionCrew.crewMonths +
      productionCrew.stuntTeamCost * productionCrew.stuntMonths +
      productionCrew.makeUpDesignTeamCost * productionCrew.makeUpMonths +
      productionCrew.practicalEffectsCost * productionCrew.practicalEffectsMonths +
      productionCrew.creatureEffectsCost * productionCrew.creatureEffectsMonths;

    const postCost =
      postProduction.postProductionTeamCost * postProduction.editingMonths +
      postProduction.vfxCompanyCost * postProduction.vfxMonths;

    const musicCost = soundtrack.hasSoundtrack ? soundtrack.musicClearanceRights : 0;
    const totalProdCost = preCost + prodCost + postCost + musicCost;

    const vfxInvestment =
      postCost +
      productionCrew.practicalEffectsCost * productionCrew.practicalEffectsMonths +
      productionCrew.creatureEffectsCost * productionCrew.creatureEffectsMonths;
    const totalTechnicalPct = budget > 0 ? (vfxInvestment / budget) * 100 : 0;

    const vfxRisk =
      totalTechnicalPct > 25 && dirEffects < 50 ? (totalTechnicalPct - 25) * 0.6 : 0;

    // ── 6. Director budget mitigation
    const budgetMitigation = (dirOnBudget / 100) * 15;

    // ── 7. Franchise stability
    const franchiseStability = franchiseMode
      ? -(franchiseMomentum || 0) * 0.1
      : 0;

    // ── 8. Rating content risk
    const contentRisk =
      ((s2p(movieRating.violence) +
        s3p(movieRating.gore) +
        s3p(movieRating.controversy) +
        s2p(movieRating.language) +
        s2p(movieRating.sensuality)) /
        500) *
      15;

    // ── Base VRC
    let vrcBase =
      tension * 0.3 +
      chaosAmplifier +
      nudityInstability +
      vfxRisk -
      budgetMitigation +
      franchiseStability +
      contentRisk;

    vrcBase = Math.min(Math.max(vrcBase, 0), 100);

    const vrcMin = Math.max(0, vrcBase - 20);
    const vrcMax = Math.min(100, vrcBase + lightningBonus);
    const vrc = (vrcMin + vrcMax) / 2;

    let riskLabel = 'BAJO';
    if (vrc > 75 || bankruptcyRisk) riskLabel = 'CATASTRÓFICO';
    else if (vrc > 55) riskLabel = 'ALTO';
    else if (vrc > 35) riskLabel = 'MEDIO';

    return {
      vrc: Math.round(vrc * 10) / 10,
      vrcMin: Math.round(vrcMin * 10) / 10,
      vrcMax: Math.round(vrcMax * 10) / 10,
      riskLabel,
      lightningInBottle,
      bankruptcyRisk,
    };
  }
}
