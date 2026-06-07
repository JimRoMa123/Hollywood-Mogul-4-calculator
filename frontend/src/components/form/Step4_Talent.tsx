import React from 'react';
import { MovieFormData, CastMember } from '../../types/calculator.types';
import { Slider, MoneyInput } from './FormComponents';

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DEFAULT_CAST_MEMBER: CastMember = {
  name: '', salary: 500000, sexAppeal: 50,
  screenPresence: 50, humility: 50, age: 30,
};

export const Step4Talent: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const avgHumility = data.castData.length > 0
    ? Math.round(data.castData.reduce((a, c) => a + c.humility, 0) / data.castData.length)
    : 0;

  const tension = Math.abs(data.dirPerfectionism - avgHumility);

  const updateCast = (index: number, updates: Partial<CastMember>) => {
    const newCast = [...data.castData];
    newCast[index] = { ...newCast[index], ...updates };
    onChange({ castData: newCast });
  };

  const addCast = () => {
    onChange({ castData: [...data.castData, { ...DEFAULT_CAST_MEMBER }] });
  };

  const removeCast = (index: number) => {
    onChange({ castData: data.castData.filter((_, i) => i !== index) });
  };

  return (
    <div className="card" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">🎥</div>
        <div>
          <h2>Factor Humano y Liderazgo</h2>
          <p>Director y elenco determinan el techo creativo y los costos reales</p>
        </div>
      </div>

      {/* Director Section */}
      <div style={{
        background: 'rgba(212,175,55,0.04)', border: '1px solid var(--border-gold)',
        borderRadius: 'var(--radius-md)', padding: 24, marginBottom: 28,
      }}>
        <h3 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>🎬</span> Director
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Slider id="dirPerfectionism" label="Perfeccionismo"
            hint=" — define el techo de calidad artística"
            value={data.dirPerfectionism} onChange={(v) => onChange({ dirPerfectionism: v })}
            tooltip="Establece el límite superior de calidad crítica. Genera roces con actores de baja Humildad." />
          <Slider id="dirScriptFidelity" label="Fidelidad al Guion (Script As Written)"
            hint=" — adherencia literal al libreto"
            value={data.dirScriptFidelity} onChange={(v) => onChange({ dirScriptFidelity: v })}
            tooltip="Adherencia al texto. Si el guion es bueno, un valor alto asegura trasladar esa calidad." />
          <Slider id="dirOnBudget" label="Gestión de Presupuesto (On-Budget)"
            hint=" — austeridad y control de costos"
            value={data.dirOnBudget} onChange={(v) => onChange({ dirOnBudget: v })}
            tooltip="Habilidad para controlar gastos. Amortigua pérdidas ante eventos aleatorios." />
          <Slider id="dirEffects" label="Manejo de Efectos (Effects)"
            hint=" — competencia en VFX y animación"
            value={data.dirEffects} onChange={(v) => onChange({ dirEffects: v })}
            tooltip="Manejo de efectos especiales. Obligatorio si el budget de VFX es alto." />
        </div>
      </div>

      {/* Tension indicator */}
      {data.castData.length > 0 && (
        <div style={{
          padding: '12px 16px', marginBottom: 20,
          background: tension > 60 ? 'var(--orange-dim)' : tension > 40 ? 'var(--red-dim)' : 'var(--green-dim)',
          border: `1px solid ${tension > 60 ? 'rgba(255,140,66,0.3)' : tension > 40 ? 'rgba(255,61,87,0.3)' : 'rgba(0,201,127,0.3)'}`,
          borderRadius: 'var(--radius-sm)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.82rem' }}>
            {tension > 60 ? '⚡ Tensión extrema — "Rayo en la botella" posible' :
             tension > 40 ? '⚠️ Conflicto director-elenco moderado' :
             '✅ Buena alineación director-elenco'}
          </span>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>Tensión: {tension}</span>
        </div>
      )}

      {/* Cast Section */}
      <h3 style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>🌟</span> Elenco ({data.castData.length} actores)
      </h3>

      <div className="cast-grid">
        {data.castData.map((member, index) => (
          <div className="cast-member-card" key={index}>
            <div className="cast-header">
              <span className="cast-member-number">Actor #{index + 1}</span>
              <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={() => removeCast(index)}>
                Remover
              </button>
            </div>
            <div className="cast-member-attrs">
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" value={member.name}
                  onChange={(e) => updateCast(index, { name: e.target.value })}
                  placeholder="Nombre del actor..." />
              </div>
              <div className="form-group">
                <label>Edad</label>
                <input type="number" min={18} max={90} value={member.age}
                  onChange={(e) => updateCast(index, { age: Number(e.target.value) })} />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <MoneyInput id={`salary-${index}`} label="Salario" value={member.salary}
                onChange={(v) => updateCast(index, { salary: v })}
                tooltip="Salario base exigido. Afecta directamente al presupuesto." />
            </div>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Slider id={`sexAppeal-${index}`} label="Sex Appeal" hint=" — impacto taquillero"
                value={member.sexAppeal} onChange={(v) => updateCast(index, { sexAppeal: v })}
                tooltip="Eleva el hype publicitario e ingresos de taquilla, pero los críticos pueden rechazar repartos sin humildad." />
              <Slider id={`screenPresence-${index}`} label="Presencia en Pantalla"
                hint=" — gravitas crítica"
                value={member.screenPresence} onChange={(v) => updateCast(index, { screenPresence: v })}
                tooltip="Mide el carisma crítico. Multiplicador de calidad que compensa fallos del libreto." />
              <Slider id={`humility-${index}`} label="Humildad"
                hint=" — colaboración y gestión de ego"
                value={member.humility} onChange={(v) => updateCast(index, { humility: v })}
                tooltip="Ego del actor. Valores bajos causan retrasos y sobrecostos por tensión con el director." />
            </div>
            {member.salary < 100000 && member.screenPresence > 75 && (
              <div style={{
                marginTop: 12, padding: '8px 12px',
                background: 'var(--gold-dim)', border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--gold)',
              }}>
                🦄 ¡Unicornio estadístico! Alto rendimiento, bajo costo.
              </div>
            )}
          </div>
        ))}

        {data.castData.length < 6 && (
          <button className="add-cast-btn" onClick={addCast}>
            + Añadir Actor / Actriz
          </button>
        )}
      </div>

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Técnico</button>
        <button className="btn btn-primary" onClick={onNext}>
          Siguiente: Distribución →
        </button>
      </div>
    </div>
  );
};
