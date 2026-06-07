import { Injectable } from '@nestjs/common';
import { CalculateMovieDto } from '../calculator/dto/calculate-movie.dto';

// Genre categories for special rules
export const TECHNICAL_GENRES = [
  'Science Fiction', 'Superhero', 'Action', 'Adventure', 
  'Fantasy', 'Horror', 'Thriller', 'Blockbuster'
];

export const AWARDS_FRIENDLY_GENRES = [
  'Drama', 'Biography', 'Historical', 'War Drama', 
  'Romance', 'Independent'
];

export const FAMILY_GENRES = [
  'Family', 'Animation', 'Comedy', 'Musical'
];

@Injectable()
export class FinancialEngine {
  calculate(dto: CalculateMovieDto): {
    fbp: number;
    projectedBoxOffice: number;
    projectedCostOverrun: number;
    marketingEfficiencyPoint: number;
  } {
    const { budget, marketingBudget, studioCash } = dto;
    const totalBudget = budget + marketingBudget;

    // ── 1. Conflict overrun multiplier (15%-45%) from §4.3
    const avgHumility = dto.castData.length > 0
      ? dto.castData.reduce((acc, c) => acc + c.humility, 0) / dto.castData.length
      : 50;

    const tensionFactor = Math.abs(dto.dirPerfectionism - avgHumility) / 100;
    const overrunPct = 0.15 + (tensionFactor * 0.30); // 15% to 45%
    const projectedCostOverrun = budget * overrunPct;
    const realCost = budget + projectedCostOverrun;

    // ── 2. Marketing curve: diminishing returns (§5.3)
    // Optimal marketing = 15-25% of budget
    const optimalMarketing = budget * 0.20;
    const marketingEfficiencyPoint = optimalMarketing;
    let marketingScore = 0;
    if (marketingBudget <= optimalMarketing) {
      marketingScore = (marketingBudget / optimalMarketing) * 40;
    } else {
      // Diminishing returns past optimal
      const excess = marketingBudget - optimalMarketing;
      const penaltyFactor = Math.min(excess / optimalMarketing, 1.5);
      marketingScore = 40 - (penaltyFactor * 20);
    }

    // ── 3. Genre compatibility with budget (§3.2)
    let genreFinancialModifier = 0;
    const isTechnicalGenre = TECHNICAL_GENRES.includes(dto.genre);
    const totalTechnicalPct = dto.vfxBudgetPct + dto.creatureFxPct + dto.stuntsPct;

    if (isTechnicalGenre) {
      // Technical genres need VFX investment
      if (totalTechnicalPct >= 20) genreFinancialModifier += 10;
      else genreFinancialModifier -= 15; // under-invested in VFX for this genre
    }

    // ── 4. Set design vs Story Scope (§3.1)
    const scopeSetMismatch = dto.storyScope - (dto.setDesignPct * 2);
    const scopePenalty = scopeSetMismatch > 30 ? -(scopeSetMismatch - 30) * 0.3 : 0;

    // ── 5. Distribution mode bonuses (§7)
    let distributionBonus = 0;
    if (dto.distributionMode === 'streaming') {
      distributionBonus = 15; // eliminates box office decay risk
    } else if (dto.distributionMode === 'presale') {
      distributionBonus = 25; // de-risks production cost via pre-sales
    }

    // ── 6. Cash safety check (§6.1)
    let cashPenalty = 0;
    if (dto.hasAdditionalVillains) {
      const contingencyReserve = studioCash - totalBudget;
      const contingencyRatio = contingencyReserve / totalBudget;
      if (contingencyRatio < 0.15) {
        cashPenalty = -40; // Near-bankruptcy risk
      } else if (contingencyRatio < 0.25) {
        cashPenalty = -20;
      }
    }

    // ── 7. Nudity penalty (§6.3)
    const nudityPenalty = dto.hasNudity ? -8 : 0; // demographic restriction

    // ── 8. Director budget management
    const dirBudgetBonus = (dto.dirOnBudget / 100) * 10;

    // ── 9. Franchise momentum (§9.1)
    const franchiseBonus = dto.franchiseMode ? (dto.franchiseMomentum || 0) * 0.15 : 0;

    // ── Compute base score
    const budgetRatio = Math.min(realCost / studioCash, 2);
    const solvencyScore = Math.max(0, 40 - (budgetRatio * 20));

    let fbp = solvencyScore + marketingScore + genreFinancialModifier + 
              distributionBonus + cashPenalty + nudityPenalty + 
              dirBudgetBonus + franchiseBonus + scopePenalty;

    fbp = Math.min(Math.max(fbp, 0), 100);

    // ── Projected box office (rough model)
    const baseMultiplier = dto.distributionMode === 'streaming' ? 1.8 : 2.5;
    const genreMultiplier = isTechnicalGenre ? 3.5 : (AWARDS_FRIENDLY_GENRES.includes(dto.genre) ? 2.0 : 2.5);
    const projectedBoxOffice = budget * baseMultiplier * genreMultiplier * (fbp / 100) * 1.2;

    return {
      fbp: Math.round(fbp * 100) / 100,
      projectedBoxOffice: Math.round(projectedBoxOffice),
      projectedCostOverrun: Math.round(projectedCostOverrun),
      marketingEfficiencyPoint: Math.round(marketingEfficiencyPoint),
    };
  }
}
