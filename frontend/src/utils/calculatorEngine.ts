import type { MovieFormData } from '../types/calculator.types';

export type LiveMetrics = {
  fbp: number;
  iab: number;
  vrc: number;
  riskLabel: string;
  projectedCostOverrun: number;
  marketingEfficiencyPoint: number;
  projectedBoxOffice: number;
  warnings: string[];
};

export const TECHNICAL_GENRES = [
  'Science Fiction', 'Superhero', 'Action', 'Adventure',
  'Fantasy', 'Horror', 'Thriller', 'Blockbuster',
];

export const AWARDS_FRIENDLY_GENRES = [
  'Drama', 'Biography', 'Historical', 'War Drama',
  'Romance', 'Independent',
];

// Helper: convert 1-5 star to 0-100 scale
const s2p = (stars: number): number => Math.min(100, Math.max(0, (stars / 5) * 100));
// Helper: convert 1-3 star to 0-100 scale
const s3p = (stars: number): number => Math.min(100, Math.max(0, (stars / 3) * 100));

export const calculateLiveMetrics = (form: MovieFormData): LiveMetrics => {
  const {
    projectType, releaseType, productionType,
    budget, marketingBudget, studioCash, genre,
    pace, plotTwists, subplots, storyScope, charDevelopment,
    director, castData, roles,
    hasNudity, hasAdditionalVillains, additionalVillain,
    distributionMode, franchiseMode, franchiseMomentum,
    preProduction, productionCrew, postProduction,
    writer, movieRating, intelligence, dialogue,
    soundtrack, runningTimeMinutes,
  } = form;

  const warnings: string[] = [];
  const totalBudget = budget + marketingBudget;

  const isAdditionalVillains = hasAdditionalVillains || (additionalVillain && additionalVillain !== 'None');

  // Convert star ratings to percentages for calculations
  const paceP = s2p(pace);
  const plotTwistsP = s2p(plotTwists);
  const subplotsP = s2p(subplots);
  const storyScopeP = s2p(storyScope);
  const charDevP = s2p(charDevelopment);

  const dirPerfectionism = s2p(director.perfectionist);
  const dirScriptFidelity = s2p(director.scriptAsWritten);
  const dirOnBudget = s2p(director.onBudget);
  const dirEffects = s2p(director.effects);

  // 1. Cast stats
  const avgHumility = castData.length > 0
    ? castData.reduce((acc, c) => acc + s2p(c.humility), 0) / castData.length : 50;
  const avgSexAppeal = castData.length > 0
    ? castData.reduce((acc, c) => acc + s2p(c.sexAppeal), 0) / castData.length : 50;
  const avgScreenPresence = castData.length > 0
    ? castData.reduce((acc, c) => acc + s2p(c.screenPresence), 0) / castData.length : 50;

  // 2. Financial calculation
  const tensionFactor = Math.abs(dirPerfectionism - avgHumility) / 100;
  const overrunPct = 0.15 + tensionFactor * 0.3;
  const projectedCostOverrun = budget * overrunPct;
  const realCost = budget + projectedCostOverrun;

  const optimalMarketing = budget * 0.2;
  const marketingEfficiencyPoint = optimalMarketing;
  let marketingScore: number;
  if (marketingBudget <= optimalMarketing) {
    marketingScore = (marketingBudget / optimalMarketing) * 40;
  } else {
    const excess = marketingBudget - optimalMarketing;
    const penaltyFactor = Math.min(excess / optimalMarketing, 1.5);
    marketingScore = 40 - penaltyFactor * 20;
  }

  const isTechnicalGenre = TECHNICAL_GENRES.includes(genre);

  // Production phase costs
  const preCost = (preProduction.costumeDesignTeamCost * preProduction.costumeDesignMonths) +
                  (preProduction.setDesignTeamCost * preProduction.setDesignMonths);
  const prodCost = (productionCrew.crewCost * productionCrew.crewMonths) +
                   (productionCrew.stuntTeamCost * productionCrew.stuntMonths) +
                   (productionCrew.makeUpDesignTeamCost * productionCrew.makeUpMonths) +
                   (productionCrew.practicalEffectsCost * productionCrew.practicalEffectsMonths) +
                   (productionCrew.creatureEffectsCost * productionCrew.creatureEffectsMonths);
  const postCost = (postProduction.postProductionTeamCost * postProduction.editingMonths) +
                   (postProduction.vfxCompanyCost * postProduction.vfxMonths);
  const musicCost = soundtrack.hasSoundtrack ? soundtrack.musicClearanceRights : 0;
  const totalProdCost = preCost + prodCost + postCost + musicCost;

  // VFX/Technical percentage estimation
  const vfxInvestment = postCost + (productionCrew.practicalEffectsCost * productionCrew.practicalEffectsMonths) +
                        (productionCrew.creatureEffectsCost * productionCrew.creatureEffectsMonths);
  const totalTechnicalPct = budget > 0 ? (vfxInvestment / budget) * 100 : 0;

  let genreFinancialModifier = 0;
  if (isTechnicalGenre) {
    if (totalTechnicalPct >= 20) genreFinancialModifier += 10;
    else genreFinancialModifier -= 15;
  }

  // Set design vs story scope
  const setDesignPct = s2p(preProduction.setDesign);
  const scopeSetMismatch = storyScopeP - setDesignPct;
  const scopePenalty = scopeSetMismatch > 30 ? -(scopeSetMismatch - 30) * 0.3 : 0;

  let distributionBonus = 0;
  if (distributionMode === 'streaming' || releaseType === 'Streaming') distributionBonus = 15;
  else if (distributionMode === 'presale') distributionBonus = 25;
  else if (releaseType === 'Direct-to-Video') distributionBonus = 5;

  let cashPenalty = 0;
  const contingencyReserve = studioCash - totalBudget;
  const contingencyRatio = contingencyReserve / totalBudget;
  if (isAdditionalVillains) {
    if (contingencyRatio < 0.15) cashPenalty = -40;
    else if (contingencyRatio < 0.25) cashPenalty = -20;
  }

  const nudityPenalty = hasNudity ? -8 : 0;
  const dirBudgetBonus = (dirOnBudget / 100) * 10;
  const franchiseBonus = franchiseMode ? (franchiseMomentum || 0) * 0.15 : 0;

  const budgetRatio = Math.min(realCost / studioCash, 2);
  const solvencyScore = Math.max(0, 40 - budgetRatio * 20);

  // Writer quality bonus
  const writerAvg = (s2p(writer.storyScopeDepth) + s2p(writer.characterDevelopment) +
                     s2p(writer.intelligence) + s2p(writer.dialogue) + s2p(writer.pace)) / 5;
  const writerBonus = (writerAvg / 100) * 8;

  // Rating restrictiveness penalty
  const ratingPenalty = movieRating.parentalGuidanceAge >= 17 ? -10 :
                        movieRating.parentalGuidanceAge >= 13 ? -5 : 0;

  // Intelligence/Dialogue quality bonus
  const intellDialogueBonus = (s2p(intelligence) + s2p(dialogue)) / 200 * 5;

  // Production cost overrun penalty
  const prodOverrunPenalty = totalProdCost > budget ? -Math.min(20, ((totalProdCost - budget) / budget) * 30) : 0;

  // Additional dynamic mappings to FBP:
  // - Soundtrack boost/penalty
  let soundtrackFbpModifier = 0;
  if (soundtrack.hasSoundtrack) {
    soundtrackFbpModifier += soundtrack.recordingArtistStature * 2; // up to +10 for stature 5
    soundtrackFbpModifier -= soundtrack.recordCompanyPercent / 10; // up to -10 for 100% royalty
  }

  // - Running time penalty
  let runningTimeFbpPenalty = 0;
  if (runningTimeMinutes > 150) {
    runningTimeFbpPenalty = -Math.min(10, (runningTimeMinutes - 150) / 10);
  } else if (runningTimeMinutes < 80) {
    runningTimeFbpPenalty = -5;
  }

  // - Story Ending FBP influence
  let endingFbpModifier = 0;
  if (form.storyEnding === 'Happy') endingFbpModifier = 5;
  else if (form.storyEnding === 'Sad' || form.storyEnding === 'Tragic') endingFbpModifier = -5;

  // - Musical FBP cost modifier
  let musicalFbpModifier = 0;
  if (form.isMusical) {
    musicalFbpModifier = genre === 'Musical' ? 5 : -5;
  }

  // - Creatures check
  let creaturesFbpPenalty = 0;
  if (form.hasCreatures && productionCrew.creatureEffects < 4) {
    creaturesFbpPenalty = -10;
  } else if (form.hasCreatures && productionCrew.creatureEffects >= 4) {
    creaturesFbpPenalty = 5;
  }

  // - Director Specialty Matching Genre
  let dirGenreFbpModifier = 0;
  if (genre === 'Action' || genre === 'Adventure') {
    dirGenreFbpModifier = director.actionSkill >= 4 ? 5 : (director.actionSkill < 3 ? -10 : 0);
  } else if (genre === 'Comedy') {
    dirGenreFbpModifier = director.comedySkill >= 4 ? 5 : (director.comedySkill < 3 ? -10 : 0);
  }

  // - Cast Skills Matching Genre
  let castGenreFbpModifier = 0;
  if (castData.length > 0) {
    if (genre === 'Action' || genre === 'Adventure') {
      const avgActSkill = castData.reduce((acc, c) => acc + c.actionSkill, 0) / castData.length;
      castGenreFbpModifier = avgActSkill >= 4 ? 5 : (avgActSkill < 3 ? -8 : 0);
    } else if (genre === 'Comedy') {
      const avgComSkill = castData.reduce((acc, c) => acc + c.comedySkill, 0) / castData.length;
      castGenreFbpModifier = avgComSkill >= 4 ? 5 : (avgComSkill < 3 ? -8 : 0);
    }
  }

  let fbp = solvencyScore + marketingScore + genreFinancialModifier + distributionBonus +
            cashPenalty + nudityPenalty + dirBudgetBonus + franchiseBonus + scopePenalty +
            writerBonus + ratingPenalty + prodOverrunPenalty + intellDialogueBonus +
            soundtrackFbpModifier + runningTimeFbpPenalty + endingFbpModifier +
            musicalFbpModifier + creaturesFbpPenalty + dirGenreFbpModifier + castGenreFbpModifier;
  fbp = Math.min(Math.max(fbp, 0), 100);

  const baseMultiplier = projectType === 'Series' ? 1.2 : (distributionMode === 'streaming' ? 1.8 : 2.5);
  const genreMultiplier = isTechnicalGenre ? 3.5 : AWARDS_FRIENDLY_GENRES.includes(genre) ? 2.0 : 2.5;
  const projectedBoxOffice = budget * baseMultiplier * genreMultiplier * (fbp / 100) * 1.2;

  // 3. Critical calculations
  const scriptComplexity = (plotTwistsP + subplotsP) / 2;
  let scriptScore: number;
  if (dirPerfectionism >= scriptComplexity) {
    scriptScore = (scriptComplexity / 100) * 25;
  } else {
    const gap = scriptComplexity - dirPerfectionism;
    scriptScore = Math.max(0, (scriptComplexity / 100) * 25 - gap * 0.4);
  }

  const characterScore = (charDevP / 100) * (avgScreenPresence / 100) * 20;
  const perfectionismScore = (dirPerfectionism / 100) * 20;
  const sexAppealPenalty = avgSexAppeal > 70 && avgHumility < 40 ? -(avgSexAppeal - 70) * 0.3 : 0;

  let genreAwardsBonus = 0;
  if (AWARDS_FRIENDLY_GENRES.includes(genre)) genreAwardsBonus = 15;
  else if (TECHNICAL_GENRES.includes(genre)) genreAwardsBonus = -8;

  const scriptFidelityScore = dirScriptFidelity > 70
    ? (dirScriptFidelity / 100) * ((charDevP + paceP) / 200) * 10
    : (dirScriptFidelity / 100) * 5;

  let vfxCriticalPenalty = 0;
  if (totalTechnicalPct > 30 && dirEffects < 50) vfxCriticalPenalty = -12;

  const nudityModifier = hasNudity && !AWARDS_FRIENDLY_GENRES.includes(genre) ? -5 : 0;
  const franchiseBias = franchiseMode && (franchiseMomentum || 0) > 70 ? -10 : 0;

  // Writer impact on critical score
  const writerCriticalBonus = (writerAvg / 100) * 10;
  // Intelligence/dialogue critical bonus
  const intellDialogueCritical = (s2p(intelligence) + s2p(dialogue)) / 200 * 8;

  // Additional dynamic mappings to IAB:
  // - Production Type & Genre combination
  let prodTypeIabModifier = 0;
  if (productionType === 'Animation' || productionType === 'Stop Motion') {
    prodTypeIabModifier = (genre === 'Family' || genre === 'Animation' || genre === 'Comedy') ? 10 : -5;
  }

  // - Musical quality
  let musicalIabModifier = 0;
  if (form.isMusical) {
    musicalIabModifier = genre === 'Musical' ? 10 : -3;
  }

  // - Era requirements (accuracy)
  let eraIabPenalty = 0;
  if (['Medieval', 'Ancient', 'Victorian'].includes(form.era)) {
    if (preProduction.costumeDesign < 4 || preProduction.setDesign < 4) {
      eraIabPenalty = -8;
    }
  }

  // - Story Ending IAB influence
  let endingIabModifier = 0;
  if (form.storyEnding === 'Tragic' || form.storyEnding === 'Sad' || form.storyEnding === 'Bittersweet') {
    endingIabModifier = 5;
  }

  // - Based on True Story bonus
  let trueStoryIabBonus = form.basedOnTrueStory ? 5 : 0;

  // - Role Difficulty check (matching director perfectionism)
  let roleComplexityIabPenalty = 0;
  if (roles && roles.length > 0) {
    const avgRoleDiff = roles.reduce((acc, r) => acc + r.roleDifficulty, 0) / roles.length;
    if (avgRoleDiff > director.perfectionist) {
      roleComplexityIabPenalty = -5;
    }
  }

  // - Director Drama Skill for Drama
  let dirGenreIabModifier = 0;
  if (AWARDS_FRIENDLY_GENRES.includes(genre)) {
    dirGenreIabModifier = director.dramaSkill >= 4 ? 5 : (director.dramaSkill < 3 ? -10 : 0);
  }

  // - Cast Drama Skill for Drama
  let castGenreIabModifier = 0;
  if (castData.length > 0 && AWARDS_FRIENDLY_GENRES.includes(genre)) {
    const avgDramaSkill = castData.reduce((acc, c) => acc + c.dramaSkill, 0) / castData.length;
    castGenreIabModifier = avgDramaSkill >= 4 ? 5 : (avgDramaSkill < 3 ? -8 : 0);
  }

  // - Production Crews ratings
  let preProdIabBonus = 0;
  if (preProduction.costumeDesignTeamRating >= 4 && preProduction.costumeDesign >= 4) preProdIabBonus += 4;
  if (productionCrew.stuntTeamRating >= 4 && productionCrew.stunts >= 4) preProdIabBonus += 3;
  if (productionCrew.makeUpDesignTeamRating >= 4 && productionCrew.makeUpEffects >= 4) preProdIabBonus += 3;

  let iab = scriptScore + characterScore + perfectionismScore + sexAppealPenalty +
            genreAwardsBonus + scriptFidelityScore + vfxCriticalPenalty +
            nudityModifier + franchiseBias + writerCriticalBonus + intellDialogueCritical +
            prodTypeIabModifier + musicalIabModifier + eraIabPenalty + endingIabModifier +
            trueStoryIabBonus + roleComplexityIabPenalty + dirGenreIabModifier +
            castGenreIabModifier + preProdIabBonus;
  iab = Math.min(Math.max(iab, 0), 100);

  // 4. Volatility calculations
  const tension = Math.abs(dirPerfectionism - avgHumility);
  const lightningInBottle = tension > 60;
  const lightningBonus = lightningInBottle ? 30 : 0;
  const chaosBase = isAdditionalVillains ? 25 : 0;
  const bankruptcyRisk = isAdditionalVillains && contingencyRatio < 0.15;
  const chaosAmplifier = bankruptcyRisk ? 40 : chaosBase;
  const nudityInstability = hasNudity ? 10 : 0;
  const vfxRisk = totalTechnicalPct > 25 && dirEffects < 50 ? (totalTechnicalPct - 25) * 0.6 : 0;
  const budgetMitigation = (dirOnBudget / 100) * 15;
  const franchiseStability = franchiseMode ? -(franchiseMomentum || 0) * 0.1 : 0;

  // Rating content risk
  const contentRisk = (s2p(movieRating.violence) + s3p(movieRating.gore) +
                       s3p(movieRating.controversy) + s2p(movieRating.language) +
                       s2p(movieRating.sensuality)) / 500 * 15;

  let vrcBase = tension * 0.3 + chaosAmplifier + nudityInstability + vfxRisk -
                budgetMitigation + franchiseStability + contentRisk;
  vrcBase = Math.min(Math.max(vrcBase, 0), 100);
  const vrcMin = Math.max(0, vrcBase - 20);
  const vrcMax = Math.min(100, vrcBase + lightningBonus);
  const vrc = (vrcMin + vrcMax) / 2;

  let riskLabel = 'BAJO';
  if (vrc > 75 || bankruptcyRisk) riskLabel = 'CATASTRÓFICO';
  else if (vrc > 55) riskLabel = 'ALTO';
  else if (vrc > 35) riskLabel = 'MEDIO';

  // Warnings
  if (bankruptcyRisk) {
    warnings.push('⚠️ Riesgo inminente de quiebra (Villanos Adicionales sin presupuesto de reserva).');
  } else if (isAdditionalVillains && contingencyRatio < 0.25) {
    warnings.push('⚠️ Reserva de contingencia baja para lidiar con Villanos Adicionales.');
  }

  if (totalTechnicalPct > 25 && dirEffects < 50) {
    warnings.push('⚠️ Desperdicio de Efectos: El director no tiene habilidad para manejar el CGI asignado.');
  }

  if (marketingBudget > optimalMarketing * 2) {
    warnings.push('⚠️ Saturación de Marketing: Estás gastando más del doble del punto de eficiencia.');
  }

  if (tension > 60) {
    warnings.push('⚡ Tensión creativa extrema: Posibilidad de "Rayo en la botella", pero con altos sobrecostos.');
  } else if (tension > 40) {
    warnings.push('😤 Fricción Director-Elenco: Se esperan retrasos y ligeros sobrecostos.');
  }

  if (scopeSetMismatch > 30) {
    warnings.push('🎭 Diseño de set insuficiente para la escala de la historia (Story Scope).');
  }

  if (avgSexAppeal > 70 && avgHumility < 40) {
    warnings.push('💅 Reparto con mucho ego: Los críticos castigarán la superficialidad del elenco.');
  }

  if (franchiseMode && franchiseMomentum > 70) {
    warnings.push('📉 Fatiga de marca: Los críticos penalizarán la secuela por ser repetitiva.');
  }

  if (totalProdCost > budget) {
    warnings.push(`🚨 Costos de producción ($${(totalProdCost / 1e6).toFixed(1)}M) superan el presupuesto ($${(budget / 1e6).toFixed(1)}M).`);
  }

  if (writerAvg < 40) {
    warnings.push('✍️ Escritor débil: El guion limitará toda la producción.');
  }

  if (movieRating.parentalGuidanceAge >= 17) {
    warnings.push('🔞 Clasificación R (17+): Audiencia masivamente restringida.');
  }

  if (director.minBudgetRequirement > 0 && budget < director.minBudgetRequirement) {
    warnings.push(`🎬 Director exige presupuesto mínimo de $${(director.minBudgetRequirement / 1e6).toFixed(1)}M.`);
  }

  return {
    fbp: Math.round(fbp * 10) / 10,
    iab: Math.round(iab * 10) / 10,
    vrc: Math.round(vrc * 10) / 10,
    riskLabel,
    projectedCostOverrun: Math.round(projectedCostOverrun),
    marketingEfficiencyPoint: Math.round(marketingEfficiencyPoint),
    projectedBoxOffice: Math.round(projectedBoxOffice),
    warnings,
  };
};
