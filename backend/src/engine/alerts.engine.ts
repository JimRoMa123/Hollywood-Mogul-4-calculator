import { Injectable } from '@nestjs/common';
import { CalculateMovieDto } from '../calculator/dto/calculate-movie.dto';
import {
  AlertItem,
  Recommendation,
} from '../history/entities/calculation.entity';
import { TECHNICAL_GENRES } from './financial.engine';

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

    const avgHumility =
      dto.castData.length > 0
        ? dto.castData.reduce((acc, c) => acc + c.humility, 0) /
          dto.castData.length
        : 50;
    const totalVfxPct = dto.vfxBudgetPct + dto.creatureFxPct;

    // ── Critical: Bankruptcy risk (§6.1)
    if (extras.bankruptcyRisk) {
      alerts.push({
        level: 'critical',
        code: 'BANKRUPTCY_RISK',
        message:
          '⚠️ QUIEBRA INMINENTE: Tienes "Villanos Adicionales" activados sin fondo de contingencia suficiente (mín. 15% del budget). Probabilidad de quiebra > 85%.',
      });
    }

    // ── Critical: VFX waste (§3.2, §4.2)
    if (totalVfxPct > 25 && dto.dirEffects < 50) {
      alerts.push({
        level: 'critical',
        code: 'VFX_WASTE',
        message: `🎬 DESPERDICIO TÉCNICO: ${totalVfxPct}% del budget en efectos visuales con un director con solo ${dto.dirEffects}/100 en "Manejo de Efectos". Esta inversión será drenada como desperdicio de producción.`,
      });
      recommendations.push({
        category: 'Director',
        action: 'WARNING',
        message:
          'Reemplaza al director con alguien que tenga Manejo de Efectos > 70, o reduce el VFX budget a menos del 15%.',
      });
    }

    // ── Critical: Marketing over-saturation (§5.3)
    if (dto.marketingBudget > extras.marketingEfficiencyPoint * 2) {
      alerts.push({
        level: 'critical',
        code: 'MARKETING_OVERKILL',
        message: `📢 SATURACIÓN DE MARKETING: Tu presupuesto publicitario ($${(dto.marketingBudget / 1e6).toFixed(1)}M) supera el doble del punto óptimo ($${(extras.marketingEfficiencyPoint / 1e6).toFixed(1)}M). Estás quemando capital en rendimientos negativos.`,
      });
    }

    // ── Warning: Director-Cast conflict (§4.3)
    const tension = Math.abs(dto.dirPerfectionism - avgHumility);
    if (tension > 40 && tension <= 60) {
      alerts.push({
        level: 'warning',
        code: 'DIRECTOR_CAST_CONFLICT',
        message: `😤 CONFLICTO DIRECTOR-ELENCO: Tensión creativa de ${tension.toFixed(0)} puntos. Espera sobrecostes del ${Math.round(15 + (tension / 100) * 30)}% del presupuesto base por retrasos y conflictos en el set.`,
      });
    }

    // ── Warning: Lightning in a bottle (§4.3)
    if (extras.lightningInBottle) {
      alerts.push({
        level: 'warning',
        code: 'LIGHTNING_IN_BOTTLE',
        message: `⚡ RAYO EN LA BOTELLA: Tensión extrema (${tension.toFixed(0)} pts). Hay una ventana probabilística para crear una obra maestra histórica, pero los sobrecostes y el caos en set son inevitables. Alto riesgo, alto premio.`,
      });
    }

    // ── Warning: Story Scope vs Set Design (§3.1, §3.2)
    if (dto.storyScope > 70 && dto.setDesignPct < 15) {
      alerts.push({
        level: 'warning',
        code: 'SCOPE_SET_MISMATCH',
        message: `🎭 ALCANCE SIN PRODUCCIÓN: Story Scope de ${dto.storyScope}/100 requiere Set Design robusto. Con solo ${dto.setDesignPct}% asignado, el espectador percibirá la película como visualmente inferior al guion.`,
      });
    }

    // ── Warning: Nudity cascade (§6.3)
    if (dto.hasNudity) {
      alerts.push({
        level: 'warning',
        code: 'NUDITY_CASCADE',
        message:
          '🔞 FLAG DESNUDEZ ACTIVADO: La clasificación R eliminará franjas demográficas masivas. Los actores que acepten demandarán primas del 20-40% sobre su salario estándar. Descuenta este porcentaje de tu presupuesto de talento.',
      });
    }

    // ── Info: Talent inflation warning (§5.2)
    const hasLowSalaryHighPerformers = dto.castData.some(
      (c) => c.salary < 100000 && c.screenPresence > 80,
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

    // ── Backend points recommendation (§5.1)
    const isAwardsPursuer =
      dto.dirPerfectionism > 70 && dto.pace < 50 && dto.subplots > 60;
    if (isAwardsPursuer) {
      recommendations.push({
        category: 'Contratos Financieros',
        action: 'ACCEPT',
        message:
          'ACEPTA puntos en el backend (backend points): Tu película está configurada para premios, no para taquilla masiva. Pagarás mucho menos en salarios y ahorrarás millones en gastos iniciales.',
      });
    } else if (TECHNICAL_GENRES.includes(dto.genre) && dto.budget > 50000000) {
      recommendations.push({
        category: 'Contratos Financieros',
        action: 'DENY',
        message:
          'DENIEGA puntos en el backend: Superproducción palomitera con potencial de recaudar cientos de millones. El % de backend cedido superaría vastamente el salario garantizado.',
      });
    }

    // ── Streaming recommendation (§7.2)
    if (dto.studioCash < dto.budget * 3 && dto.distributionMode === 'cinema') {
      recommendations.push({
        category: 'Distribución',
        action: 'OPTIMIZE',
        message:
          'Considera lanzamiento en Streaming: Tu estudio tiene reservas de capital ajustadas. Streaming elimina el riesgo de decay en el segundo fin de semana y estabiliza el flujo de caja.',
      });
    }

    // ── Family merchandising opportunity (§8.3)
    const isFamilyContent = [
      'Family',
      'Animation',
      'Comedy',
      'Musical',
    ].includes(dto.genre);
    if (isFamilyContent && !dto.hasNudity) {
      recommendations.push({
        category: 'Revenue Streams',
        action: 'ACCEPT',
        message:
          'ACTIVA Merchandising: Género familiar sin contenido adulto = potencial masivo de ingresos colaterales por productos promocionales. Firma contratos con manufactureras.',
      });
    }

    // ── Demographic risk warning (§4.1)
    dto.castData.forEach((actor) => {
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
