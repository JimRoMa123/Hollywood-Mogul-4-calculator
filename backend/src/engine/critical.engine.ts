import { Injectable } from '@nestjs/common';
import { CalculateMovieDto } from '../calculator/dto/calculate-movie.dto';
import { TECHNICAL_GENRES, AWARDS_FRIENDLY_GENRES } from './financial.engine';

@Injectable()
export class CriticalEngine {
  calculate(dto: CalculateMovieDto): {
    iab: number;
    criticalBreakdown: Record<string, number>;
  } {
    const avgHumility =
      dto.castData.length > 0
        ? dto.castData.reduce((acc, c) => acc + c.humility, 0) /
          dto.castData.length
        : 50;

    const avgSexAppeal =
      dto.castData.length > 0
        ? dto.castData.reduce((acc, c) => acc + c.sexAppeal, 0) /
          dto.castData.length
        : 50;

    const avgScreenPresence =
      dto.castData.length > 0
        ? dto.castData.reduce((acc, c) => acc + c.screenPresence, 0) /
          dto.castData.length
        : 50;

    // ── 1. Script quality score (§3.1)
    // High pace + plotTwists + subplots BUT director needs high perfectionism
    const scriptComplexity = (dto.plotTwists + dto.subplots) / 2;
    const directorCapacity = dto.dirPerfectionism;
    let scriptScore = 0;
    if (directorCapacity >= scriptComplexity) {
      scriptScore = (scriptComplexity / 100) * 25;
    } else {
      // Director can't handle the complexity
      const gap = scriptComplexity - directorCapacity;
      scriptScore = Math.max(0, (scriptComplexity / 100) * 25 - gap * 0.4);
    }

    // ── 2. Character development vs Screen Presence (§4.1, §3.1)
    const charDevScore = dto.charDevelopment / 100;
    const screenPresenceRatio = avgScreenPresence / 100;
    const characterScore = charDevScore * screenPresenceRatio * 20;

    // ── 3. Director perfectionism ceiling (§4.2)
    const perfectionismScore = (dto.dirPerfectionism / 100) * 20;

    // ── 4. Sex Appeal penalty for critical reception (§8.1)
    // High Sex Appeal + low Humility = critics hate it
    const sexAppealPenalty =
      avgSexAppeal > 70 && avgHumility < 40 ? -(avgSexAppeal - 70) * 0.3 : 0;

    // ── 5. Genre awards affinity (§8.2)
    let genreAwardsBonus = 0;
    if (AWARDS_FRIENDLY_GENRES.includes(dto.genre)) {
      genreAwardsBonus = 15;
    } else if (TECHNICAL_GENRES.includes(dto.genre)) {
      genreAwardsBonus = -8; // Critics dislike pure blockbusters
    }

    // ── 6. Script fidelity: requires good source material
    const scriptFidelityScore =
      dto.dirScriptFidelity > 70
        ? (dto.dirScriptFidelity / 100) *
          ((dto.charDevelopment + dto.pace) / 200) *
          10
        : (dto.dirScriptFidelity / 100) * 5;

    // ── 7. VFX waste check for critics (§3.2, §4.2)
    const totalVfxPct = dto.vfxBudgetPct + dto.creatureFxPct;
    let vfxCriticalPenalty = 0;
    if (totalVfxPct > 30 && dto.dirEffects < 50) {
      vfxCriticalPenalty = -12; // Wasted VFX hurts critical perception
    }

    // ── 8. Nudity: R-rating can help or hurt depending on genre
    const nudityModifier =
      dto.hasNudity && !AWARDS_FRIENDLY_GENRES.includes(dto.genre) ? -5 : 0;

    // ── 9. Franchise bias
    const franchiseBias =
      dto.franchiseMode && (dto.franchiseMomentum || 0) > 70 ? -10 : 0; // Critics dislike franchise fatigue

    const criticalBreakdown = {
      scriptQuality: Math.round(scriptScore * 10) / 10,
      characterDepth: Math.round(characterScore * 10) / 10,
      directorVision: Math.round(perfectionismScore * 10) / 10,
      genreAffinity: Math.round(genreAwardsBonus * 10) / 10,
      castSubstance: Math.round((100 - avgSexAppeal + avgScreenPresence) / 4),
    };

    let iab =
      scriptScore +
      characterScore +
      perfectionismScore +
      sexAppealPenalty +
      genreAwardsBonus +
      scriptFidelityScore +
      vfxCriticalPenalty +
      nudityModifier +
      franchiseBias;

    iab = Math.min(Math.max(iab, 0), 100);

    return {
      iab: Math.round(iab * 100) / 100,
      criticalBreakdown,
    };
  }
}
