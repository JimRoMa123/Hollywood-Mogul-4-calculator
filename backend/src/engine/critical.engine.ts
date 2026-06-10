import { Injectable } from '@nestjs/common';
import { CalculateMovieDto } from '../calculator/dto/calculate-movie.dto';
import { TECHNICAL_GENRES, AWARDS_FRIENDLY_GENRES } from './financial.engine';

// Helper: convert 1-5 star to 0-100 scale
const s2p = (stars: number): number => Math.min(100, Math.max(0, (stars / 5) * 100));

@Injectable()
export class CriticalEngine {
  calculate(dto: CalculateMovieDto): {
    iab: number;
    criticalBreakdown: Record<string, number>;
  } {
    const {
      productionType,
      genre,
      pace,
      plotTwists,
      subplots,
      charDevelopment,
      director,
      castData,
      productionCrew,
      postProduction,
      budget,
      writer,
      movieRating,
      intelligence,
      dialogue,
      hasNudity,
      franchiseMode,
      franchiseMomentum,
      preProduction,
      roles,
    } = dto;

    // Convert star ratings to percentages for calculations
    const paceP = s2p(pace);
    const plotTwistsP = s2p(plotTwists);
    const subplotsP = s2p(subplots);
    const charDevP = s2p(charDevelopment);

    const dirPerfectionism = s2p(director.perfectionist);
    const dirScriptFidelity = s2p(director.scriptAsWritten);
    const dirEffects = s2p(director.effects);

    const avgHumility =
      castData.length > 0
        ? castData.reduce((acc, c) => acc + s2p(c.humility), 0) / castData.length
        : 50;

    const avgSexAppeal =
      castData.length > 0
        ? castData.reduce((acc, c) => acc + s2p(c.sexAppeal), 0) / castData.length
        : 50;

    const avgScreenPresence =
      castData.length > 0
        ? castData.reduce((acc, c) => acc + s2p(c.screenPresence), 0) / castData.length
        : 50;

    // ── 1. Script quality score
    const scriptComplexity = (plotTwistsP + subplotsP) / 2;
    let scriptScore = 0;
    if (dirPerfectionism >= scriptComplexity) {
      scriptScore = (scriptComplexity / 100) * 25;
    } else {
      const gap = scriptComplexity - dirPerfectionism;
      scriptScore = Math.max(0, (scriptComplexity / 100) * 25 - gap * 0.4);
    }

    // ── 2. Character development vs Screen Presence
    const characterScore = (charDevP / 100) * (avgScreenPresence / 100) * 20;

    // ── 3. Director perfectionism ceiling
    const perfectionismScore = (dirPerfectionism / 100) * 20;

    // ── 4. Sex Appeal penalty for critical reception
    const sexAppealPenalty =
      avgSexAppeal > 70 && avgHumility < 40 ? -(avgSexAppeal - 70) * 0.3 : 0;

    // ── 5. Genre awards affinity
    let genreAwardsBonus = 0;
    if (AWARDS_FRIENDLY_GENRES.includes(genre)) {
      genreAwardsBonus = 15;
    } else if (TECHNICAL_GENRES.includes(genre)) {
      genreAwardsBonus = -8;
    }

    // ── 6. Script fidelity
    const scriptFidelityScore =
      dirScriptFidelity > 70
        ? (dirScriptFidelity / 100) * ((charDevP + paceP) / 200) * 10
        : (dirScriptFidelity / 100) * 5;

    // ── 7. VFX waste check for critics
    const postCost =
      postProduction.postProductionTeamCost * postProduction.editingMonths +
      postProduction.vfxCompanyCost * postProduction.vfxMonths;
    const vfxInvestment =
      postCost +
      productionCrew.practicalEffectsCost * productionCrew.practicalEffectsMonths +
      productionCrew.creatureEffectsCost * productionCrew.creatureEffectsMonths;
    const totalTechnicalPct = budget > 0 ? (vfxInvestment / budget) * 100 : 0;

    let vfxCriticalPenalty = 0;
    if (totalTechnicalPct > 30 && dirEffects < 50) {
      vfxCriticalPenalty = -12;
    }

    // ── 8. Nudity modifier
    const nudityModifier =
      hasNudity && !AWARDS_FRIENDLY_GENRES.includes(genre) ? -5 : 0;

    // ── 9. Franchise bias
    const franchiseBias =
      franchiseMode && (franchiseMomentum || 0) > 70 ? -10 : 0;

    // ── 10. Writer quality bonus
    const writerAvg =
      (s2p(writer.storyScopeDepth) +
        s2p(writer.characterDevelopment) +
        s2p(writer.intelligence) +
        s2p(writer.dialogue) +
        s2p(writer.pace)) /
      5;
    const writerCriticalBonus = (writerAvg / 100) * 10;

    // ── 11. Intelligence/dialogue critical bonus
    const intellDialogueCritical = ((s2p(intelligence) + s2p(dialogue)) / 200) * 8;

    // ── 12. Production Type & Genre combination
    let prodTypeIabModifier = 0;
    if (productionType === 'Animation' || productionType === 'Stop Motion') {
      prodTypeIabModifier =
        genre === 'Family' || genre === 'Animation' || genre === 'Comedy' ? 10 : -5;
    }

    // ── 13. Musical quality
    let musicalIabModifier = 0;
    if (dto.isMusical) {
      musicalIabModifier = genre === 'Musical' ? 10 : -3;
    }

    // ── 14. Era requirements (accuracy)
    let eraIabPenalty = 0;
    if (['Medieval', 'Ancient', 'Victorian'].includes(dto.era)) {
      if (preProduction.costumeDesign < 4 || preProduction.setDesign < 4) {
        eraIabPenalty = -8;
      }
    }

    // ── 15. Story Ending IAB influence
    let endingIabModifier = 0;
    if (
      dto.storyEnding === 'Tragic' ||
      dto.storyEnding === 'Sad' ||
      dto.storyEnding === 'Bittersweet'
    ) {
      endingIabModifier = 5;
    }

    // ── 16. Based on True Story bonus
    const trueStoryIabBonus = dto.basedOnTrueStory ? 5 : 0;

    // ── 17. Role Difficulty check (matching director perfectionism)
    let roleComplexityIabPenalty = 0;
    if (roles && roles.length > 0) {
      const avgRoleDiff =
        roles.reduce((acc, r) => acc + r.roleDifficulty, 0) / roles.length;
      if (avgRoleDiff > director.perfectionist) {
        roleComplexityIabPenalty = -5;
      }
    }

    // ── 18. Director Drama Skill for Drama
    let dirGenreIabModifier = 0;
    if (AWARDS_FRIENDLY_GENRES.includes(genre)) {
      dirGenreIabModifier =
        director.dramaSkill >= 4 ? 5 : (director.dramaSkill < 3 ? -10 : 0);
    }

    // ── 19. Cast Drama Skill for Drama
    let castGenreIabModifier = 0;
    if (castData.length > 0 && AWARDS_FRIENDLY_GENRES.includes(genre)) {
      const avgDramaSkill =
        castData.reduce((acc, c) => acc + c.dramaSkill, 0) / castData.length;
      castGenreIabModifier = avgDramaSkill >= 4 ? 5 : (avgDramaSkill < 3 ? -8 : 0);
    }

    // ── 20. Production Crews ratings
    let preProdIabBonus = 0;
    if (
      preProduction.costumeDesignTeamRating >= 4 &&
      preProduction.costumeDesign >= 4
    ) {
      preProdIabBonus += 4;
    }
    if (productionCrew.stuntTeamRating >= 4 && productionCrew.stunts >= 4) {
      preProdIabBonus += 3;
    }
    if (
      productionCrew.makeUpDesignTeamRating >= 4 &&
      productionCrew.makeUpEffects >= 4
    ) {
      preProdIabBonus += 3;
    }

    let iab =
      scriptScore +
      characterScore +
      perfectionismScore +
      sexAppealPenalty +
      genreAwardsBonus +
      scriptFidelityScore +
      vfxCriticalPenalty +
      nudityModifier +
      franchiseBias +
      writerCriticalBonus +
      intellDialogueCritical +
      prodTypeIabModifier +
      musicalIabModifier +
      eraIabPenalty +
      endingIabModifier +
      trueStoryIabBonus +
      roleComplexityIabPenalty +
      dirGenreIabModifier +
      castGenreIabModifier +
      preProdIabBonus;

    iab = Math.min(Math.max(iab, 0), 100);

    const criticalBreakdown = {
      scriptQuality: Math.round(scriptScore * 10) / 10,
      characterDepth: Math.round(characterScore * 10) / 10,
      directorVision: Math.round(perfectionismScore * 10) / 10,
      genreAffinity: Math.round(genreAwardsBonus * 10) / 10,
      castSubstance: Math.round((100 - avgSexAppeal + avgScreenPresence) / 4),
    };

    return {
      iab: Math.round(iab * 10) / 10,
      criticalBreakdown,
    };
  }
}
