import { Injectable } from '@nestjs/common';
import { CalculateMovieDto } from '../calculator/dto/calculate-movie.dto';

export const TECHNICAL_GENRES = [
  'Science Fiction',
  'Superhero',
  'Action',
  'Adventure',
  'Fantasy',
  'Horror',
  'Thriller',
  'Blockbuster',
];

export const AWARDS_FRIENDLY_GENRES = [
  'Drama',
  'Biography',
  'Historical',
  'War Drama',
  'Romance',
  'Independent',
];

// Helper: convert 1-5 star to 0-100 scale
const s2p = (stars: number): number => Math.min(100, Math.max(0, (stars / 5) * 100));

@Injectable()
export class FinancialEngine {
  calculate(dto: CalculateMovieDto): {
    fbp: number;
    projectedBoxOffice: number;
    projectedCostOverrun: number;
    marketingEfficiencyPoint: number;
  } {
    const {
      projectType,
      releaseType,
      budget,
      marketingBudget,
      studioCash,
      genre,
      storyScope,
      director,
      castData,
      preProduction,
      productionCrew,
      postProduction,
      writer,
      movieRating,
      intelligence,
      dialogue,
      hasAdditionalVillains,
      additionalVillain,
      distributionMode,
      franchiseMode,
      franchiseMomentum,
      hasNudity,
      soundtrack,
      runningTimeMinutes,
    } = dto;

    const totalBudget = budget + marketingBudget;

    const isAdditionalVillains =
      !!(hasAdditionalVillains || (additionalVillain && additionalVillain !== 'None'));

    const storyScopeP = s2p(storyScope);
    const dirPerfectionism = s2p(director.perfectionist);
    const dirOnBudget = s2p(director.onBudget);

    // ── 1. Creative conflict tension
    const avgHumility =
      castData.length > 0
        ? castData.reduce((acc, c) => acc + s2p(c.humility), 0) / castData.length
        : 50;

    const tensionFactor = Math.abs(dirPerfectionism - avgHumility) / 100;
    const overrunPct = 0.15 + tensionFactor * 0.3; // 15% to 45%
    const projectedCostOverrun = budget * overrunPct;
    const realCost = budget + projectedCostOverrun;

    // ── 2. Marketing curve
    const optimalMarketing = budget * 0.2;
    const marketingEfficiencyPoint = optimalMarketing;
    let marketingScore = 0;
    if (marketingBudget <= optimalMarketing) {
      marketingScore = (marketingBudget / optimalMarketing) * 40;
    } else {
      const excess = marketingBudget - optimalMarketing;
      const penaltyFactor = Math.min(excess / optimalMarketing, 1.5);
      marketingScore = 40 - penaltyFactor * 20;
    }

    // ── 3. Production phase costs & technical check
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

    // VFX/Technical percentage estimation
    const vfxInvestment =
      postCost +
      productionCrew.practicalEffectsCost * productionCrew.practicalEffectsMonths +
      productionCrew.creatureEffectsCost * productionCrew.creatureEffectsMonths;
    const totalTechnicalPct = budget > 0 ? (vfxInvestment / budget) * 100 : 0;

    const isTechnicalGenre = TECHNICAL_GENRES.includes(genre);
    let genreFinancialModifier = 0;
    if (isTechnicalGenre) {
      if (totalTechnicalPct >= 20) genreFinancialModifier += 10;
      else genreFinancialModifier -= 15;
    }

    // ── 4. Set design vs Story Scope
    const setDesignPct = s2p(preProduction.setDesign);
    const scopeSetMismatch = storyScopeP - setDesignPct;
    const scopePenalty =
      scopeSetMismatch > 30 ? -(scopeSetMismatch - 30) * 0.3 : 0;

    // ── 5. Distribution mode bonuses
    let distributionBonus = 0;
    if (distributionMode === 'streaming' || releaseType === 'Streaming') {
      distributionBonus = 15;
    } else if (distributionMode === 'presale') {
      distributionBonus = 25;
    } else if (releaseType === 'Direct-to-Video') {
      distributionBonus = 5;
    }

    // ── 6. Cash safety check
    let cashPenalty = 0;
    const contingencyReserve = studioCash - totalBudget;
    const contingencyRatio = contingencyReserve / totalBudget;
    if (isAdditionalVillains) {
      if (contingencyRatio < 0.15) {
        cashPenalty = -40;
      } else if (contingencyRatio < 0.25) {
        cashPenalty = -20;
      }
    }

    // ── 7. Nudity penalty
    const nudityPenalty = hasNudity ? -8 : 0;

    // ── 8. Director budget management
    const dirBudgetBonus = (dirOnBudget / 100) * 10;

    // ── 9. Franchise momentum
    const franchiseBonus = franchiseMode
      ? (franchiseMomentum || 0) * 0.15
      : 0;

    // ── 10. Writer quality bonus
    const writerAvg =
      (s2p(writer.storyScopeDepth) +
        s2p(writer.characterDevelopment) +
        s2p(writer.intelligence) +
        s2p(writer.dialogue) +
        s2p(writer.pace)) /
      5;
    const writerBonus = (writerAvg / 100) * 8;

    // ── 11. Rating restrictiveness penalty
    const ratingPenalty =
      movieRating.parentalGuidanceAge >= 17
        ? -10
        : movieRating.parentalGuidanceAge >= 13
          ? -5
          : 0;

    // ── 12. Intelligence/Dialogue quality bonus
    const intellDialogueBonus = ((s2p(intelligence) + s2p(dialogue)) / 200) * 5;

    // ── 13. Production cost overrun penalty
    const prodOverrunPenalty =
      totalProdCost > budget
        ? -Math.min(20, ((totalProdCost - budget) / budget) * 30)
        : 0;

    // ── 14. Soundtrack boost/penalty
    let soundtrackFbpModifier = 0;
    if (soundtrack.hasSoundtrack) {
      soundtrackFbpModifier += soundtrack.recordingArtistStature * 2;
      soundtrackFbpModifier -= soundtrack.recordCompanyPercent / 10;
    }

    // ── 15. Running time penalty
    let runningTimeFbpPenalty = 0;
    if (runningTimeMinutes > 150) {
      runningTimeFbpPenalty = -Math.min(10, (runningTimeMinutes - 150) / 10);
    } else if (runningTimeMinutes < 80) {
      runningTimeFbpPenalty = -5;
    }

    // ── 16. Story Ending FBP influence
    let endingFbpModifier = 0;
    if (dto.storyEnding === 'Happy') endingFbpModifier = 5;
    else if (dto.storyEnding === 'Sad' || dto.storyEnding === 'Tragic') endingFbpModifier = -5;

    // ── 17. Musical FBP cost modifier
    let musicalFbpModifier = 0;
    if (dto.isMusical) {
      musicalFbpModifier = genre === 'Musical' ? 5 : -5;
    }

    // ── 18. Creatures check
    let creaturesFbpPenalty = 0;
    if (dto.hasCreatures && productionCrew.creatureEffects < 4) {
      creaturesFbpPenalty = -10;
    } else if (dto.hasCreatures && productionCrew.creatureEffects >= 4) {
      creaturesFbpPenalty = 5;
    }

    // ── 19. Director Specialty Matching Genre
    let dirGenreFbpModifier = 0;
    if (genre === 'Action' || genre === 'Adventure') {
      dirGenreFbpModifier = director.actionSkill >= 4 ? 5 : (director.actionSkill < 3 ? -10 : 0);
    } else if (genre === 'Comedy') {
      dirGenreFbpModifier = director.comedySkill >= 4 ? 5 : (director.comedySkill < 3 ? -10 : 0);
    }

    // ── 20. Cast Skills Matching Genre
    let castGenreFbpModifier = 0;
    if (castData.length > 0) {
      if (genre === 'Action' || genre === 'Adventure') {
        const avgActSkill =
          castData.reduce((acc, c) => acc + c.actionSkill, 0) / castData.length;
        castGenreFbpModifier = avgActSkill >= 4 ? 5 : (avgActSkill < 3 ? -8 : 0);
      } else if (genre === 'Comedy') {
        const avgComSkill =
          castData.reduce((acc, c) => acc + c.comedySkill, 0) / castData.length;
        castGenreFbpModifier = avgComSkill >= 4 ? 5 : (avgComSkill < 3 ? -8 : 0);
      }
    }

    // ── Solvency base score
    const budgetRatio = Math.min(realCost / studioCash, 2);
    const solvencyScore = Math.max(0, 40 - budgetRatio * 20);

    let fbp =
      solvencyScore +
      marketingScore +
      genreFinancialModifier +
      distributionBonus +
      cashPenalty +
      nudityPenalty +
      dirBudgetBonus +
      franchiseBonus +
      scopePenalty +
      writerBonus +
      ratingPenalty +
      prodOverrunPenalty +
      intellDialogueBonus +
      soundtrackFbpModifier +
      runningTimeFbpPenalty +
      endingFbpModifier +
      musicalFbpModifier +
      creaturesFbpPenalty +
      dirGenreFbpModifier +
      castGenreFbpModifier;

    fbp = Math.min(Math.max(fbp, 0), 100);

    // ── Projected box office
    const baseMultiplier = projectType === 'Series' ? 1.2 : (distributionMode === 'streaming' ? 1.8 : 2.5);
    const genreMultiplier = isTechnicalGenre
      ? 3.5
      : AWARDS_FRIENDLY_GENRES.includes(genre)
        ? 2.0
        : 2.5;
    const projectedBoxOffice =
      budget * baseMultiplier * genreMultiplier * (fbp / 100) * 1.2;

    return {
      fbp: Math.round(fbp * 10) / 10,
      projectedBoxOffice: Math.round(projectedBoxOffice),
      projectedCostOverrun: Math.round(projectedCostOverrun),
      marketingEfficiencyPoint: Math.round(marketingEfficiencyPoint),
    };
  }
}
