import { MovieFormData } from '../types/calculator.types';

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

export const calculateLiveMetrics = (form: MovieFormData): LiveMetrics => {
  const {
    budget,
    marketingBudget,
    studioCash,
    genre,
    pace,
    plotTwists,
    subplots,
    storyScope,
    charDevelopment,
    vfxBudgetPct,
    creatureFxPct,
    stuntsPct,
    setDesignPct,
    dirPerfectionism,
    dirScriptFidelity,
    dirOnBudget,
    dirEffects,
    castData,
    hasNudity,
    hasAdditionalVillains,
    distributionMode,
    franchiseMode,
    franchiseMomentum,
  } = form;

  const warnings: string[] = [];
  const totalBudget = budget + marketingBudget;

  // 1. Cast stats
  const avgHumility =
    castData.length > 0
      ? castData.reduce((acc, c) => acc + c.humility, 0) / castData.length
      : 50;

  const avgSexAppeal =
    castData.length > 0
      ? castData.reduce((acc, c) => acc + c.sexAppeal, 0) / castData.length
      : 50;

  const avgScreenPresence =
    castData.length > 0
      ? castData.reduce((acc, c) => acc + c.screenPresence, 0) / castData.length
      : 50;

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

  let genreFinancialModifier = 0;
  const isTechnicalGenre = TECHNICAL_GENRES.includes(genre);
  const totalTechnicalPct = vfxBudgetPct + creatureFxPct + stuntsPct;

  if (isTechnicalGenre) {
    if (totalTechnicalPct >= 20) {
      genreFinancialModifier += 10;
    } else {
      genreFinancialModifier -= 15;
    }
  }

  const scopeSetMismatch = storyScope - setDesignPct * 2;
  const scopePenalty = scopeSetMismatch > 30 ? -(scopeSetMismatch - 30) * 0.3 : 0;

  let distributionBonus = 0;
  if (distributionMode === 'streaming') {
    distributionBonus = 15;
  } else if (distributionMode === 'presale') {
    distributionBonus = 25;
  }

  let cashPenalty = 0;
  const contingencyReserve = studioCash - totalBudget;
  const contingencyRatio = contingencyReserve / totalBudget;
  if (hasAdditionalVillains) {
    if (contingencyRatio < 0.15) {
      cashPenalty = -40;
    } else if (contingencyRatio < 0.25) {
      cashPenalty = -20;
    }
  }

  const nudityPenalty = hasNudity ? -8 : 0;
  const dirBudgetBonus = (dirOnBudget / 100) * 10;
  const franchiseBonus = franchiseMode ? (franchiseMomentum || 0) * 0.15 : 0;

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
    scopePenalty;

  fbp = Math.min(Math.max(fbp, 0), 100);

  const baseMultiplier = distributionMode === 'streaming' ? 1.8 : 2.5;
  const genreMultiplier = isTechnicalGenre
    ? 3.5
    : AWARDS_FRIENDLY_GENRES.includes(genre)
      ? 2.0
      : 2.5;
  const projectedBoxOffice = budget * baseMultiplier * genreMultiplier * (fbp / 100) * 1.2;

  // 3. Critical calculations
  const scriptComplexity = (plotTwists + subplots) / 2;
  let scriptScore: number;
  if (dirPerfectionism >= scriptComplexity) {
    scriptScore = (scriptComplexity / 100) * 25;
  } else {
    const gap = scriptComplexity - dirPerfectionism;
    scriptScore = Math.max(0, (scriptComplexity / 100) * 25 - gap * 0.4);
  }

  const characterScore = (charDevelopment / 100) * (avgScreenPresence / 100) * 20;
  const perfectionismScore = (dirPerfectionism / 100) * 20;
  const sexAppealPenalty =
    avgSexAppeal > 70 && avgHumility < 40 ? -(avgSexAppeal - 70) * 0.3 : 0;

  let genreAwardsBonus = 0;
  if (AWARDS_FRIENDLY_GENRES.includes(genre)) {
    genreAwardsBonus = 15;
  } else if (TECHNICAL_GENRES.includes(genre)) {
    genreAwardsBonus = -8;
  }

  const scriptFidelityScore =
    dirScriptFidelity > 70
      ? (dirScriptFidelity / 100) * ((charDevelopment + pace) / 200) * 10
      : (dirScriptFidelity / 100) * 5;

  const totalVfxPct = vfxBudgetPct + creatureFxPct;
  let vfxCriticalPenalty = 0;
  if (totalVfxPct > 30 && dirEffects < 50) {
    vfxCriticalPenalty = -12;
  }

  const nudityModifier = hasNudity && !AWARDS_FRIENDLY_GENRES.includes(genre) ? -5 : 0;
  const franchiseBias = franchiseMode && (franchiseMomentum || 0) > 70 ? -10 : 0;

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

  // 4. Volatility calculations
  const tension = Math.abs(dirPerfectionism - avgHumility);
  const lightningInBottle = tension > 60;
  const lightningBonus = lightningInBottle ? 30 : 0;
  const chaosBase = hasAdditionalVillains ? 25 : 0;
  const bankruptcyRisk = hasAdditionalVillains && contingencyRatio < 0.15;
  const chaosAmplifier = bankruptcyRisk ? 40 : chaosBase;
  const nudityInstability = hasNudity ? 10 : 0;
  const vfxRisk = totalVfxPct > 25 && dirEffects < 50 ? (totalVfxPct - 25) * 0.6 : 0;
  const budgetMitigation = (dirOnBudget / 100) * 15;
  const franchiseStability = franchiseMode ? -(franchiseMomentum || 0) * 0.1 : 0;

  let vrcBase =
    tension * 0.3 +
    chaosAmplifier +
    nudityInstability +
    vfxRisk -
    budgetMitigation +
    franchiseStability;

  vrcBase = Math.min(Math.max(vrcBase, 0), 100);
  const vrcMin = Math.max(0, vrcBase - 20);
  const vrcMax = Math.min(100, vrcBase + lightningBonus);
  const vrc = (vrcMin + vrcMax) / 2;

  let riskLabel = 'BAJO';
  if (vrc > 75 || bankruptcyRisk) riskLabel = 'CATASTRÓFICO';
  else if (vrc > 55) riskLabel = 'ALTO';
  else if (vrc > 35) riskLabel = 'MEDIO';

  // Generate real-time warnings
  if (bankruptcyRisk) {
    warnings.push('⚠️ Riesgo inminente de quiebra (Villanos Adicionales sin presupuesto de reserva).');
  } else if (hasAdditionalVillains && contingencyRatio < 0.25) {
    warnings.push('⚠️ Reserva de contingencia baja para lidiar con Villanos Adicionales.');
  }

  if (totalVfxPct > 25 && dirEffects < 50) {
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
