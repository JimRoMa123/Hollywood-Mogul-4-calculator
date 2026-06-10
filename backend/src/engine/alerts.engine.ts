import { Injectable } from '@nestjs/common';
import { CalculateMovieDto } from '../calculator/dto/calculate-movie.dto';
import {
  AlertItem,
  Recommendation,
} from '../history/entities/calculation.entity';
import { TECHNICAL_GENRES } from './financial.engine';

// Helper: convert 1-5 star to 0-100 scale
const s2p = (stars: number): number => Math.min(100, Math.max(0, (stars / 5) * 100));

@Injectable()
export class AlertsEngine {
  generate(
    dto: CalculateMovieDto,
    extras: {
      bankruptcyRisk: boolean;
      lightningInBottle: boolean;
      projectedCostOverrun: number;
      marketingEfficiencyPoint: number;
    },
  ): { alerts: AlertItem[]; recommendations: Recommendation[] } {
    const alerts: AlertItem[] = [];
    const recommendations: Recommendation[] = [];

    const {
      castData,
      director,
      budget,
      marketingBudget,
      hasAdditionalVillains,
      studioCash,
      preProduction,
      productionCrew,
      postProduction,
      writer,
      movieRating,
      storyScope,
      genre,
      hasNudity,
      franchiseMode,
      franchiseMomentum,
      pace,
      subplots,
    } = dto;

    const dirPerfectionism = s2p(director.perfectionist);
    const dirEffects = s2p(director.effects);
    const dirOnBudget = s2p(director.onBudget);

    const avgHumility =
      castData.length > 0
        ? castData.reduce((acc, c) => acc + s2p(c.humility), 0) / castData.length
        : 50;

    const avgSexAppeal =
      castData.length > 0
        ? castData.reduce((acc, c) => acc + s2p(c.sexAppeal), 0) / castData.length
        : 50;

    // Production phase costs & technical check
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

    const totalProdCost = preCost + prodCost + postCost;

    // VFX/Technical percentage estimation
    const vfxInvestment =
      postCost +
      productionCrew.practicalEffectsCost * productionCrew.practicalEffectsMonths +
      productionCrew.creatureEffectsCost * productionCrew.creatureEffectsMonths;
    const totalTechnicalPct = budget > 0 ? (vfxInvestment / budget) * 100 : 0;

    // ── Critical: Bankruptcy risk
    if (extras.bankruptcyRisk) {
      alerts.push({
        level: 'critical',
        code: 'BANKRUPTCY_RISK',
        message:
          '⚠️ QUIEBRA INMINENTE: Tienes "Villanos Adicionales" activados sin fondo de contingencia suficiente (mín. 15% del budget). Probabilidad de quiebra > 85%.',
      });
    }

    // ── Critical: VFX waste
    if (totalTechnicalPct > 25 && dirEffects < 50) {
      alerts.push({
        level: 'critical',
        code: 'VFX_WASTE',
        message: `🎬 DESPERDICIO TÉCNICO: ${totalTechnicalPct.toFixed(0)}% del budget en efectos visuales con un director con solo ${director.effects}/5 en "Manejo de Efectos". Esta inversión será drenada como desperdicio de producción.`,
      });
      recommendations.push({
        category: 'Director',
        action: 'WARNING',
        message:
          'Reemplaza al director con alguien que tenga Manejo de Efectos > 70 (3.5+ estrellas), o reduce el VFX budget a menos del 15%.',
      });
    }

    // ── Critical: Marketing over-saturation
    if (marketingBudget > extras.marketingEfficiencyPoint * 2) {
      alerts.push({
        level: 'critical',
        code: 'MARKETING_OVERKILL',
        message: `📢 SATURACIÓN DE MARKETING: Tu presupuesto publicitario ($${(marketingBudget / 1e6).toFixed(1)}M) supera el doble del punto óptimo ($${(extras.marketingEfficiencyPoint / 1e6).toFixed(1)}M). Estás quemando capital en rendimientos negativos.`,
      });
    }

    // ── Warning: Director-Cast conflict
    const tension = Math.abs(dirPerfectionism - avgHumility);
    if (tension > 40 && tension <= 60) {
      alerts.push({
        level: 'warning',
        code: 'DIRECTOR_CAST_CONFLICT',
        message: `😤 CONFLICTO DIRECTOR-ELENCO: Tensión creativa de ${tension.toFixed(0)} puntos. Espera sobrecostes del ${Math.round(15 + (tension / 100) * 30)}% del presupuesto base por retrasos y conflictos en el set.`,
      });
    }

    // ── Warning: Lightning in a bottle
    if (extras.lightningInBottle) {
      alerts.push({
        level: 'warning',
        code: 'LIGHTNING_IN_BOTTLE',
        message: `⚡ RAYO EN LA BOTELLA: Tensión extrema (${tension.toFixed(0)} pts). Hay una ventana probabilística para crear una obra maestra histórica, pero los sobrecostes y el caos en set son inevitables. Alto riesgo, alto premio.`,
      });
    }

    // ── Warning: Story Scope vs Set Design
    const storyScopeP = s2p(storyScope);
    const setDesignPct = s2p(preProduction.setDesign);
    if (storyScopeP > 70 && setDesignPct < 30) {
      alerts.push({
        level: 'warning',
        code: 'SCOPE_SET_MISMATCH',
        message: `🎭 ALCANCE SIN PRODUCCIÓN: Story Scope de ${storyScope}/5 estrellas requiere Set Design robusto. Con el set asignado actual, el espectador percibirá la película como visualmente inferior al guion.`,
      });
    }

    // ── Warning: Nudity cascade
    if (hasNudity) {
      alerts.push({
        level: 'warning',
        code: 'NUDITY_CASCADE',
        message:
          '🔞 FLAG DESNUDEZ ACTIVADO: La clasificación R eliminará franjas demográficas masivas. Los actores que acepten demandarán primas del 20-40% sobre su salario estándar. Descuenta este porcentaje de tu presupuesto de talento.',
      });
    }

    // ── Warning: Production cost overrun
    if (totalProdCost > budget) {
      alerts.push({
        level: 'warning',
        code: 'PRODUCTION_OVERRUN',
        message: `🚨 Costos de producción ($${(totalProdCost / 1e6).toFixed(1)}M) superan el presupuesto asignado ($${(budget / 1e6).toFixed(1)}M).`,
      });
    }

    // ── Writer warning
    const writerAvg =
      (s2p(writer.storyScopeDepth) +
        s2p(writer.characterDevelopment) +
        s2p(writer.intelligence) +
        s2p(writer.dialogue) +
        s2p(writer.pace)) /
      5;
    if (writerAvg < 40) {
      alerts.push({
        level: 'warning',
        code: 'WEAK_WRITER',
        message: '✍️ Escritor débil: El guion limitará toda la producción.',
      });
    }

    // ── Parental rating restrictiveness
    if (movieRating.parentalGuidanceAge >= 17) {
      alerts.push({
        level: 'warning',
        code: 'RATED_R',
        message: '🔞 Clasificación R (17+): Audiencia masivamente restringida.',
      });
    }

    // ── Director minimum budget requirement
    if (director.minBudgetRequirement > 0 && budget < director.minBudgetRequirement) {
      alerts.push({
        level: 'critical',
        code: 'DIRECTOR_BUDGET_REQ',
        message: `🎬 Director exige presupuesto mínimo de $${(director.minBudgetRequirement / 1e6).toFixed(1)}M.`,
      });
    }

    // ── Info: Talent inflation warning
    const hasLowSalaryHighPerformers = castData.some(
      (c) => c.salary < 100000 && s2p(c.screenPresence) > 80,
    );
    if (hasLowSalaryHighPerformers) {
      alerts.push({
        level: 'info',
        code: 'UNICORN_TALENT',
        message:
          '🦄 UNICORNIO ESTADÍSTICO DETECTADO: Tienes talento de alto rendimiento con salario bajo. Firma contratos multianuales AHORA antes de que el éxito de la película dispare sus honorarios.',
      });
      recommendations.push({
        category: 'Contratos',
        action: 'ACCEPT',
        message:
          'Firma opciones de secuela para tu talento genérico de alto rendimiento inmediatamente. Después del estreno, su valor se multiplicará exponencialmente.',
      });
    }

    // ── Backend points recommendation
    const isAwardsPursuer =
      dirPerfectionism > 70 && s2p(pace) < 50 && s2p(subplots) > 60;
    if (isAwardsPursuer) {
      recommendations.push({
        category: 'Contratos Financieros',
        action: 'ACCEPT',
        message:
          'ACEPTA puntos en el backend (backend points): Tu película está configurada para premios, no para taquilla masiva. Pagarás mucho menos en salarios y ahorrarás millones en gastos iniciales.',
      });
    } else if (TECHNICAL_GENRES.includes(genre) && budget > 50000000) {
      recommendations.push({
        category: 'Contratos Financieros',
        action: 'DENY',
        message:
          'DENIEGA puntos en el backend: Superproducción palomitera con potencial de recaudar cientos de millones. El % de backend cedido superaría vastamente el salario garantizado.',
      });
    }

    // ── Streaming recommendation
    if (studioCash < budget * 3 && dto.distributionMode === 'cinema') {
      recommendations.push({
        category: 'Distribución',
        action: 'OPTIMIZE',
        message:
          'Considera lanzamiento en Streaming: Tu estudio tiene reservas de capital ajustadas. Streaming elimina el riesgo de decay en el segundo fin de semana y estabiliza el flujo de caja.',
      });
    }

    // ── Family merchandising opportunity
    const isFamilyContent = [
      'Family',
      'Animation',
      'Comedy',
      'Musical',
    ].includes(genre);
    if (isFamilyContent && !hasNudity) {
      recommendations.push({
        category: 'Revenue Streams',
        action: 'ACCEPT',
        message:
          'ACTIVA Merchandising: Género familiar sin contenido adulto = potencial masivo de ingresos colaterales por productos promocionales. Firma contratos con manufactureras.',
      });
    }

    // ── Demographic risk warning
    castData.forEach((actor) => {
      if (actor.age >= 38 && actor.age <= 42) {
        alerts.push({
          level: 'info',
          code: 'DEMOGRAPHIC_RISK',
          message: `📅 RIESGO DEMOGRÁFICO: ${actor.name || 'Actor'} está cerca de los 40 años. Su Sex Appeal puede sufrir recálculo en el próximo hito de edad, afectando secuelas.`,
        });
      }
    });

    return { alerts, recommendations };
  }
}
