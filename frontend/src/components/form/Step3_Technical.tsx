import React from 'react';
import { MovieFormData } from '../../types/calculator.types';
import { Slider } from './FormComponents';

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const TECHNICAL_GENRES = ['Science Fiction', 'Superhero', 'Action', 'Adventure', 'Fantasy', 'Horror', 'Thriller', 'Blockbuster'];

export const Step3Technical: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const totalTechPct = data.vfxBudgetPct + data.creatureFxPct + data.stuntsPct + data.setDesignPct;
  const isTechnicalGenre = TECHNICAL_GENRES.includes(data.genre);

  return (
    <div className="card" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">🎬</div>
        <div>
          <h2>Matriz Técnica de Ejecución</h2>
          <p>Asigna porcentaje del presupuesto de producción a cada rubro técnico</p>
        </div>
      </div>

      {isTechnicalGenre && (
        <div style={{
          padding: '12px 16px', marginBottom: 24,
          background: 'var(--gold-dim)', border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--gold)',
        }}>
          ⚡ <strong>Género técnico detectado ({data.genre}):</strong> Este género requiere inversión significativa en VFX/Stunts. Con insuficiente inversión técnica, la calidad final se penalizará catastróficamente.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <Slider id="vfxBudgetPct" label="Efectos Visuales (VFX) %"
            hint={` = $${(data.budget * data.vfxBudgetPct / 100 / 1e6).toFixed(1)}M`}
            value={data.vfxBudgetPct} min={0} onChange={(v) => onChange({ vfxBudgetPct: v })} />
        </div>
        <Slider id="creatureFxPct" label="Efectos de Criaturas (Creature FX) %"
          hint={` = $${(data.budget * data.creatureFxPct / 100 / 1e6).toFixed(1)}M`}
          value={data.creatureFxPct} min={0} onChange={(v) => onChange({ creatureFxPct: v })} />
        <Slider id="stuntsPct" label="Acrobacias (Stunts) %"
          hint={` = $${(data.budget * data.stuntsPct / 100 / 1e6).toFixed(1)}M`}
          value={data.stuntsPct} min={0} onChange={(v) => onChange({ stuntsPct: v })} />
        <Slider id="setDesignPct" label="Diseño de Producción (Set Design) %"
          hint={` = $${(data.budget * data.setDesignPct / 100 / 1e6).toFixed(1)}M`}
          value={data.setDesignPct} min={0} onChange={(v) => onChange({ setDesignPct: v })} />
      </div>

      <div style={{
        marginTop: 24, padding: '16px 20px',
        background: totalTechPct > 100 ? 'var(--red-dim)' : 'var(--bg-card)',
        border: `1px solid ${totalTechPct > 100 ? 'rgba(255,61,87,0.3)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total asignado a técnicos</span>
        <span style={{
          fontSize: '1.4rem', fontWeight: 700,
          color: totalTechPct > 100 ? 'var(--red-danger)' : totalTechPct > 70 ? 'var(--orange-warn)' : 'var(--green-success)',
        }}>
          {totalTechPct}%
        </span>
      </div>

      {data.storyScope > 60 && data.setDesignPct < 10 && (
        <div style={{
          marginTop: 12, padding: '10px 14px',
          background: 'var(--orange-dim)', border: '1px solid rgba(255,140,66,0.3)',
          borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--orange-warn)',
        }}>
          ⚠️ Story Scope alto ({data.storyScope}) con Set Design bajo ({data.setDesignPct}%) — desajuste de producción detectado.
        </div>
      )}

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Narrativo</button>
        <button className="btn btn-primary" onClick={onNext}>
          Siguiente: Talento →
        </button>
      </div>
    </div>
  );
};
