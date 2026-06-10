import React from 'react';
import type { MovieFormData } from '../../types/calculator.types';
import { Toggle, Select } from './FormComponents';

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onNext: () => void;
}

export const Step1ProjectSetup: React.FC<Props> = ({ data, onChange, onNext }) => {
  return (
    <div className="card card-gold" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">🎬</div>
        <div>
          <h2>Project Setup</h2>
          <p>Define el tipo de proyecto, formato de lanzamiento y estructura de franquicia</p>
        </div>
      </div>

      {/* Project Type */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase',
          letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
          Tipo de Proyecto
        </h3>
        <div className="distribution-grid">
          {([
            { type: 'Movie' as const, icon: '🎞️', title: 'Película', desc: 'Largometraje individual' },
            { type: 'Series' as const, icon: '📺', title: 'Serie / TV', desc: 'Serie limitada o televisión' },
          ]).map(({ type, icon, title, desc }) => (
            <div
              key={type}
              className={`dist-option ${data.projectType === type ? 'active' : ''}`}
              onClick={() => onChange({ projectType: type })}
            >
              <div className="dist-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Release Type */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase',
          letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
          Tipo de Lanzamiento (Release Type)
        </h3>
        <div className="distribution-grid">
          {([
            { type: 'Theatrical Release' as const, icon: '🎬', title: 'Estreno en Cines', desc: 'Lanzamiento en salas de cine' },
            { type: 'Streaming' as const, icon: '📱', title: 'Streaming', desc: 'Directamente a plataformas digitales' },
            { type: 'Direct-to-Video' as const, icon: '📀', title: 'Direct-to-Video', desc: 'Lanzamiento directo en formato físico/digital' },
          ]).map(({ type, icon, title, desc }) => (
            <div
              key={type}
              className={`dist-option ${data.releaseType === type ? 'active' : ''}`}
              onClick={() => onChange({ releaseType: type })}
            >
              <div className="dist-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Production Type */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase',
          letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
          Tipo de Producción (Production Type)
        </h3>
        <div className="distribution-grid">
          {([
            { type: 'Live Action' as const, icon: '🎭', title: 'Live Action', desc: 'Filmación con actores reales' },
            { type: 'Animation' as const, icon: '🖍️', title: 'Animación', desc: 'Producción completamente animada' },
            { type: 'Stop Motion' as const, icon: '🧸', title: 'Stop Motion', desc: 'Animación cuadro a cuadro' },
          ]).map(({ type, icon, title, desc }) => (
            <div
              key={type}
              className={`dist-option ${data.productionType === type ? 'active' : ''}`}
              onClick={() => onChange({ productionType: type })}
            >
              <div className="dist-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Franchise & Universe */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase',
          letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
          Franquicia y Universo
        </h3>
        <div className="toggle-group" style={{ marginBottom: 16 }}>
          <Toggle
            label="🏛️ Franchise Qualified"
            description="El proyecto califica para ser parte de una franquicia"
            checked={data.franchiseQualified}
            onChange={(v) => onChange({ franchiseQualified: v })}
          />
          <Toggle
            label="🔗 Franchise"
            description="Es parte activa de una franquicia existente"
            checked={data.franchise}
            onChange={(v) => onChange({ franchise: v })}
          />
        </div>

        <div className="form-grid">
          <Select
            id="universe"
            label="Universo"
            hint=" (cinematográfico)"
            value={data.universe}
            options={['None', 'Custom Universe']}
            onChange={(v) => onChange({ universe: v })}
            placeholder="— Seleccionar Universo —"
          />
          <div className="form-group">
            <label htmlFor="universeName">Nombre del Universo <span className="label-hint">(si es nuevo)</span></label>
            <input
              id="universeName"
              type="text"
              value={data.universe === 'Custom Universe' ? '' : ''}
              onChange={() => {}}
              placeholder="ej. Marvel, Star Wars..."
              disabled={data.universe !== 'Custom Universe'}
            />
          </div>
        </div>
      </div>

      <div className="step-nav">
        <div />
        <button className="btn btn-primary" onClick={onNext}>
          Siguiente: Finanzas →
        </button>
      </div>
    </div>
  );
};
