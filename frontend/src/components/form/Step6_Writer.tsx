import React from 'react';
import type { MovieFormData, WriterData, StarRating } from '../../types/calculator.types';
import { StarRatingInput, MoneyInput, NumberInput } from './FormComponents';

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step6Writer: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const writer = data.writer;

  const updateWriter = (updates: Partial<WriterData>) => {
    onChange({ writer: { ...writer, ...updates } });
  };

  const avgWriterSkill = (writer.storyScopeDepth + writer.characterDevelopment +
    writer.intelligence + writer.dialogue + writer.pace) / 5;

  return (
    <div className="card" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">✍️</div>
        <div>
          <h2>Writer Attributes</h2>
          <p>El escritor define el techo de calidad del guion — sin buen guion, nada funciona</p>
        </div>
      </div>

      {/* Writer Info */}
      <div className="section-block">
        <h3 className="section-title">📋 Información del Escritor</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="writerName">Nombre</label>
            <input id="writerName" type="text" value={writer.name}
              onChange={(e) => updateWriter({ name: e.target.value })}
              placeholder="Nombre del escritor..." />
          </div>
          <NumberInput id="writerAge" label="Edad" value={writer.age}
            min={18} max={90} onChange={(v) => updateWriter({ age: v })} />
          <MoneyInput id="writerSalary" label="Salario" value={writer.salary}
            onChange={(v) => updateWriter({ salary: v })}
            tooltip="Salario del escritor. Afecta directamente al presupuesto." />
          <NumberInput id="writerTime" label="Time To Complete"
            hint=" (meses)" value={writer.timeToCompleteMonths}
            min={1} max={36} onChange={(v) => updateWriter({ timeToCompleteMonths: v })}
            tooltip="Tiempo estimado para completar el guion. Más meses = más costos." />
        </div>
      </div>

      {/* Writer Skills */}
      <div className="section-block">
        <h3 className="section-title">⭐ Writer Attributes</h3>
        <div className="star-grid">
          <StarRatingInput id="writerScope" label="Story Scope Depth" hint=" — profundidad de ambición"
            value={writer.storyScopeDepth}
            onChange={(v: StarRating) => updateWriter({ storyScopeDepth: v })}
            tooltip="Habilidad para manejar narrativas de gran escala." />
          <StarRatingInput id="writerCharDev" label="Character Development" hint=" — desarrollo de personajes"
            value={writer.characterDevelopment}
            onChange={(v: StarRating) => updateWriter({ characterDevelopment: v })}
            tooltip="Profundidad de los arcos de personaje en el guion." />
          <StarRatingInput id="writerIntelligence" label="Intelligence" hint=" — complejidad intelectual"
            value={writer.intelligence}
            onChange={(v: StarRating) => updateWriter({ intelligence: v })}
            tooltip="Nivel intelectual y sofisticación del guion." />
          <StarRatingInput id="writerDialogue" label="Dialogue" hint=" — calidad de diálogos"
            value={writer.dialogue}
            onChange={(v: StarRating) => updateWriter({ dialogue: v })}
            tooltip="Calidad de los diálogos escritos." />
          <StarRatingInput id="writerPace" label="Pace" hint=" — control del ritmo"
            value={writer.pace}
            onChange={(v: StarRating) => updateWriter({ pace: v })}
            tooltip="Habilidad para controlar el ritmo narrativo." />
        </div>
      </div>

      {/* Writer quality indicator */}
      <div style={{
        marginTop: 16, padding: '16px 20px',
        background: avgWriterSkill >= 4 ? 'var(--green-dim)' : avgWriterSkill >= 3 ? 'var(--gold-dim)' : 'var(--red-dim)',
        border: `1px solid ${avgWriterSkill >= 4 ? 'rgba(0,201,127,0.3)' : avgWriterSkill >= 3 ? 'var(--border-gold)' : 'rgba(255,61,87,0.3)'}`,
        borderRadius: 'var(--radius-md)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: '0.82rem' }}>
          {avgWriterSkill >= 4 ? '✨ Escritor excepcional — guion de alta calidad asegurado' :
           avgWriterSkill >= 3 ? '📝 Escritor competente — guion sólido' :
           '⚠️ Escritor débil — el guion limitará toda la producción'}
        </span>
        <span style={{
          fontWeight: 700, fontSize: '1rem',
          color: avgWriterSkill >= 4 ? 'var(--green-success)' : avgWriterSkill >= 3 ? 'var(--gold)' : 'var(--red-danger)',
        }}>
          {avgWriterSkill.toFixed(1)} ★ avg
        </span>
      </div>

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Roles</button>
        <button className="btn btn-primary" onClick={onNext}>
          Siguiente: Director y Talento →
        </button>
      </div>
    </div>
  );
};
