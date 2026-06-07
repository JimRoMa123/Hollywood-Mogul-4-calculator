import React from 'react';
import { CalculationResult } from '../../types/calculator.types';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Tooltip,
} from 'recharts';

interface Props {
  result: CalculationResult;
  onRecalculate: () => void;
}

const formatMoney = (n: number) => {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
};

export const ResultsDashboard: React.FC<Props> = ({ result, onRecalculate }) => {
  const radarData = Object.entries(result.criticalBreakdown).map(([key, val]) => ({
    subject: key
      .replace('scriptQuality', 'Guion')
      .replace('characterDepth', 'Personajes')
      .replace('directorVision', 'Dirección')
      .replace('genreAffinity', 'Género')
      .replace('castSubstance', 'Elenco'),
    value: Math.max(0, Math.round(val)),
    fullMark: 30,
  }));

  return (
    <div className="results-container">
      {/* Header */}
      <div className="results-header">
        <div className="movie-title">
          {result.movieTitle || 'Análisis Cinematográfico'}
        </div>
        <div className="results-subtitle">Resultado del Motor Predictivo HM4</div>
      </div>

      {/* Lightning in a bottle */}
      {result.lightningInBottle && (
        <div className="lightning-banner">
          <span style={{ fontSize: '1.8rem' }}>⚡</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--gold)' }}>
              ¡RAYO EN LA BOTELLA DETECTADO!
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Tensión extrema director-elenco. Ventana probabilística abierta para crear una obra maestra histórica.
            </div>
          </div>
        </div>
      )}

      {/* Bankruptcy Warning */}
      {result.bankruptcyRisk && (
        <div style={{
          padding: '16px 20px', marginBottom: 20,
          background: 'var(--red-dim)', border: '2px solid var(--red-danger)',
          borderRadius: 'var(--radius-md)',
          display: 'flex', alignItems: 'center', gap: 12,
          animation: 'pulse 1.5s infinite',
        }}>
          <span style={{ fontSize: '2rem' }}>💀</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--red-danger)', fontSize: '1rem' }}>
              RIESGO DE QUIEBRA CORPORATIVA
            </div>
            <div style={{ fontSize: '0.82rem', color: '#ff8095', marginTop: 2 }}>
              Probabilidad de bancarrota {'>'} 85%. Villanos adicionales activos sin fondo de contingencia.
            </div>
          </div>
        </div>
      )}

      {/* Main Metrics */}
      <div className="results-grid">
        {/* FBP */}
        <div className="metric-card fbp">
          <div className="metric-label">FBP</div>
          <div className="metric-name">Prob. Punto de Quiebre Financiero</div>
          <div className="metric-value">{result.fbp.toFixed(0)}%</div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{
              width: `${result.fbp}%`,
              background: result.fbp > 60
                ? 'linear-gradient(90deg, var(--green-success), #00ff9f)'
                : result.fbp > 35
                ? 'linear-gradient(90deg, var(--orange-warn), var(--gold))'
                : 'linear-gradient(90deg, var(--red-danger), #ff6b7a)',
            }} />
          </div>
          <div className="metric-sub" style={{ marginTop: 8 }}>
            {result.fbp > 60 ? '✅ Probabilidad de break-even saludable' :
             result.fbp > 35 ? '⚠️ Break-even en zona de riesgo' :
             '🚨 Alto riesgo de pérdidas'}
          </div>
        </div>

        {/* IAB */}
        <div className="metric-card iab">
          <div className="metric-label">IAB</div>
          <div className="metric-name">Aclamación Institucional y Crítica</div>
          <div className="metric-value">{result.iab.toFixed(0)}%</div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{
              width: `${result.iab}%`,
              background: 'linear-gradient(90deg, var(--blue-info), var(--purple-accent))',
            }} />
          </div>
          <div className="metric-sub" style={{ marginTop: 8 }}>
            {result.iab > 65 ? '🏆 Candidata a premios' :
             result.iab > 40 ? '👍 Recepción crítica positiva' :
             '👎 Los críticos serán duros'}
          </div>
        </div>

        {/* VRC */}
        <div className="metric-card vrc">
          <div className="metric-label">VRC</div>
          <div className="metric-name">Coeficiente de Volatilidad y Riesgo</div>
          <div className="metric-value">{result.vrc.toFixed(0)}%</div>
          <div className="vrc-band">
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {result.vrcMin.toFixed(0)}%
            </span>
            <div className="vrc-range-track">
              <div className="vrc-range-fill" style={{
                left: `${result.vrcMin}%`,
                width: `${result.vrcMax - result.vrcMin}%`,
              }} />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {result.vrcMax.toFixed(0)}%
            </span>
          </div>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
            <span className={`risk-badge ${result.riskLabel}`}>{result.riskLabel}</span>
          </div>
        </div>
      </div>

      {/* Financial Projections */}
      <div className="financials-row">
        <div className="fin-stat">
          <div className="fin-stat-label">Box Office Proyectado</div>
          <div className={`fin-stat-value ${result.projectedBoxOffice > 0 ? 'positive' : 'negative'}`}>
            {formatMoney(result.projectedBoxOffice)}
          </div>
        </div>
        <div className="fin-stat">
          <div className="fin-stat-label">Sobrecosto Estimado</div>
          <div className="fin-stat-value warn">
            +{formatMoney(result.projectedCostOverrun)}
          </div>
        </div>
        <div className="fin-stat">
          <div className="fin-stat-label">Marketing Óptimo</div>
          <div className="fin-stat-value">
            {formatMoney(result.marketingEfficiencyPoint)}
          </div>
        </div>
      </div>

      {/* Balance Financiero Completo */}
      <div className="card" style={{ marginBottom: 24, padding: '24px' }}>
        <div className="section-header">
          <div className="section-title">
            <span>💸</span>
            <h3>Balance Financiero del Proyecto</h3>
          </div>
        </div>
        
        <div className="financial-breakdown-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
              Costos y Gastos de Producción
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>🎬 Producción Inicial:</span>
                <span style={{ fontWeight: 600 }}>{formatMoney(result.budget || 0)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>📢 Publicidad (Marketing):</span>
                <span style={{ fontWeight: 600 }}>{formatMoney(result.marketingBudget || 0)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>⚠️ Sobrecostos Estimados:</span>
                <span style={{ color: 'var(--orange-warn)', fontWeight: 600 }}>+{formatMoney(result.projectedCostOverrun)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', fontSize: '1.1rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>💵 Inversión Total:</span>
                <span style={{ fontWeight: 700, color: 'var(--red-danger)' }}>
                  {formatMoney((result.budget || 0) + (result.marketingBudget || 0) + result.projectedCostOverrun)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
              Proyección de Retorno
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>🎟️ Taquilla Bruta Proyectada:</span>
                <span style={{ fontWeight: 600, color: 'var(--green-success)' }}>{formatMoney(result.projectedBoxOffice)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>📊 ROI Estimado:</span>
                <span style={{ fontWeight: 600 }}>
                  {(result.budget || 0) + (result.marketingBudget || 0) + result.projectedCostOverrun > 0
                    ? `${(((result.projectedBoxOffice) / ((result.budget || 0) + (result.marketingBudget || 0) + result.projectedCostOverrun)) * 100).toFixed(0)}%`
                    : '0%'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>🎯 Punto Eficiente Publicidad:</span>
                <span style={{ fontWeight: 600, color: 'var(--gold)' }}>{formatMoney(result.marketingEfficiencyPoint)}</span>
              </div>
              
              {/* Rendimiento Neto */}
              {(() => {
                const totalCost = (result.budget || 0) + (result.marketingBudget || 0) + result.projectedCostOverrun;
                const netProfit = result.projectedBoxOffice - totalCost;
                const isProfit = netProfit > 0;
                return (
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', fontSize: '1.1rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>📈 Rendimiento Neto:</span>
                    <span style={{ fontWeight: 700, color: isProfit ? 'var(--green-success)' : 'var(--red-danger)' }}>
                      {isProfit ? '+' : ''}{formatMoney(netProfit)}
                    </span>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Breakdown Radar + Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Critical Breakdown */}
        <div className="card">
          <div className="section-header">
            <div className="section-title">
              <span>📊</span>
              <h3>Desglose de Aclamación Crítica</h3>
            </div>
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: 'rgba(240,240,245,0.6)', fontSize: 11 }}
                />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="var(--blue-info)"
                  fill="var(--blue-info)"
                  fillOpacity={0.25}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    color: 'var(--text-primary)',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="breakdown-grid" style={{ marginTop: 12 }}>
            {Object.entries(result.criticalBreakdown).map(([key, val]) => (
              <div className="breakdown-item" key={key}>
                <span className="breakdown-label">
                  {key === 'scriptQuality' ? 'Calidad del Guion' :
                   key === 'characterDepth' ? 'Profundidad de Personajes' :
                   key === 'directorVision' ? 'Visión del Director' :
                   key === 'genreAffinity' ? 'Afinidad de Género' :
                   'Sustancia del Elenco'}
                </span>
                <div className="breakdown-track">
                  <div className="breakdown-fill" style={{ width: `${Math.min(100, (val / 25) * 100)}%` }} />
                </div>
                <span className="breakdown-score">{Math.round(val)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="card">
          <div className="section-header">
            <div className="section-title">
              <span>🚨</span>
              <h3>Alertas del Sistema ({result.alerts.length})</h3>
            </div>
          </div>
          {result.alerts.length === 0 ? (
            <div className="empty-state" style={{ padding: '30px 0' }}>
              <div className="empty-icon">✅</div>
              <p>Sin alertas críticas. Configuración sólida.</p>
            </div>
          ) : (
            <div className="alerts-list">
              {result.alerts.map((alert, i) => (
                <div className={`alert-item ${alert.level}`} key={i}>
                  <span className="alert-icon">
                    {alert.level === 'critical' ? '🚨' :
                     alert.level === 'warning' ? '⚠️' : 'ℹ️'}
                  </span>
                  <span>{alert.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="section-header">
            <div className="section-title">
              <span>💡</span>
              <h3>Recomendaciones del Motor ({result.recommendations.length})</h3>
            </div>
          </div>
          <div className="rec-grid">
            {result.recommendations.map((rec, i) => (
              <div className={`rec-card ${rec.action}`} key={i}>
                <div className="rec-category">{rec.category}</div>
                <div className="rec-action">
                  {rec.action === 'ACCEPT' ? '✅ ACEPTA' :
                   rec.action === 'DENY' ? '❌ DENIEGA' :
                   rec.action === 'WARNING' ? '⚠️ ADVERTENCIA' :
                   '🔧 OPTIMIZA'}
                </div>
                <div className="rec-message">{rec.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="recalculate-section">
        <div className="results-actions">
          <button className="btn btn-primary btn-large" onClick={onRecalculate}>
            🔄 Nueva Calculación
          </button>
        </div>
      </div>
    </div>
  );
};
