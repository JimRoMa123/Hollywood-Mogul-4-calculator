import React from 'react';
import { MovieFormData } from '../../types/calculator.types';
import { Toggle, Slider } from './FormComponents';

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
}

export const Step5Distribution: React.FC<Props> = ({ data, onChange, onSubmit, onBack, loading }) => {
  return (
    <div className="card" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">🌐</div>
        <div>
          <h2>Distribución, Exógenos y Explotación</h2>
          <p>Ruta de lanzamiento y factores de riesgo externos</p>
        </div>
      </div>

      {/* Distribution Mode */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase',
          letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
          Ruta de Distribución
        </h3>
        <div className="distribution-grid">
          {[
            { mode: 'cinema', icon: '🎞️', title: 'Estreno en Cines', desc: 'Máximo potencial, máximo riesgo' },
            { mode: 'streaming', icon: '📱', title: 'Streaming Directo', desc: 'Estabilidad sin riesgo de decay' },
            { mode: 'presale', icon: '🌍', title: 'Preventa 19 Mercados', desc: 'Amortización instantánea' },
          ].map(({ mode, icon, title, desc }) => (
            <div
              key={mode}
              className={`dist-option ${data.distributionMode === mode ? 'active' : ''}`}
              onClick={() => onChange({ distributionMode: mode })}
            >
              <div className="dist-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Flags */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase',
          letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
          Flags de Contenido
        </h3>
        <div className="toggle-group">
          <Toggle
            label="🔞 Desnudez (Nudity)"
            description="Eleva a clasificación R/+18, restringe elenco, añade prima salarial del 20-40%"
            checked={data.hasNudity}
            onChange={(v) => onChange({ hasNudity: v })}
          />
          <Toggle
            label="🌩️ Villanos Adicionales (Additional Villains)"
            description="Activa eventos de desastres climáticos, incendios y plagas en el set"
            checked={data.hasAdditionalVillains}
            onChange={(v) => onChange({ hasAdditionalVillains: v })}
          />
        </div>
      </div>

      {/* Franchise Mode */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase',
          letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
          Modo Franquicia / Universo
        </h3>
        <div className="toggle-group" style={{ marginBottom: 16 }}>
          <Toggle
            label="🏛️ Película dentro de Franquicia / Universo"
            description="Activa el Momento de Inercia Estructural (Hype Momentum)"
            checked={data.franchiseMode}
            onChange={(v) => onChange({ franchiseMode: v })}
          />
        </div>
        {data.franchiseMode && (
          <Slider
            id="franchiseMomentum"
            label="Momentum de la Franquicia"
            hint=" (0 = nuevo, 100 = MCU-level)"
            value={data.franchiseMomentum}
            min={0}
            onChange={(v) => onChange({ franchiseMomentum: v })}
          />
        )}
      </div>

      {/* Bankruptcy warning */}
      {data.hasAdditionalVillains && data.studioCash > 0 && data.budget > 0 && (
        (() => {
          const contingency = data.studioCash - data.budget - data.marketingBudget;
          const ratio = contingency / data.budget;
          if (ratio < 0.15) return (
            <div style={{
              padding: '14px 16px', marginBottom: 20,
              background: 'var(--red-dim)', border: '1px solid rgba(255,61,87,0.4)',
              borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: '#ff8095',
            }}>
              ⚠️ <strong>ALERTA CRÍTICA:</strong> Con Villanos Adicionales y solo{' '}
              {Math.round(ratio * 100)}% de fondo de contingencia, probabilidad de quiebra {'>'} 85%.
            </div>
          );
          return null;
        })()
      )}

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Talento</button>
        <button
          className="btn btn-primary btn-large"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span style={{ display: 'inline-block', width: 16, height: 16,
                border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000',
                borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
              Calculando...
            </>
          ) : '🎬 Calcular Viabilidad'}
        </button>
      </div>
    </div>
  );
};
