import React from 'react';
import { MovieFormData } from '../../types/calculator.types';
import { Slider } from './FormComponents';

const GENRES = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy',
  'Drama', 'Family', 'Fantasy', 'Historical', 'Horror',
  'Independent', 'Musical', 'Romance', 'Science Fiction',
  'Superhero', 'Thriller', 'War Drama', 'Blockbuster',
];

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Narrative: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  return (
    <div className="card" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">🎭</div>
        <div>
          <h2>Genoma Narrativo</h2>
          <p>Define la estructura dramática y complejidad del guion</p>
        </div>
      </div>

      <div className="form-grid" style={{ marginBottom: 28 }}>
        <div className="form-group">
          <label htmlFor="genre">Género Principal</label>
          <select
            id="genre"
            value={data.genre}
            onChange={(e) => onChange({ genre: e.target.value })}
          >
            <option value="">— Selecciona género —</option>
            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="subgenre">Subgénero <span className="label-hint">(opcional)</span></label>
          <input
            id="subgenre"
            type="text"
            value={data.subgenre}
            onChange={(e) => onChange({ subgenre: e.target.value })}
            placeholder="ej. Cyberpunk, Noir, Coming-of-age..."
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Slider id="pace" label="Ritmo (Pace)" hint=" — velocidad narrativa"
          value={data.pace} onChange={(v) => onChange({ pace: v })} />
        <Slider id="plotTwists" label="Giros de Trama (Plot Twists)" hint=" — densidad de sorpresas"
          value={data.plotTwists} onChange={(v) => onChange({ plotTwists: v })} />
        <Slider id="subplots" label="Subtramas (Sub-plots)" hint=" — complejidad narrativa"
          value={data.subplots} onChange={(v) => onChange({ subplots: v })} />
        <Slider id="storyScope" label="Alcance de la Historia (Story Scope)" hint=" — ambición escalar"
          value={data.storyScope} onChange={(v) => onChange({ storyScope: v })} />
        <Slider id="charDevelopment" label="Desarrollo de Personajes" hint=" — profundidad actoral"
          value={data.charDevelopment} onChange={(v) => onChange({ charDevelopment: v })} />
      </div>

      {/* Insight box */}
      {data.pace < 40 && data.plotTwists > 60 && (
        <div style={{
          marginTop: 20, padding: '12px 16px',
          background: 'var(--blue-dim)', border: '1px solid rgba(77,157,224,0.3)',
          borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: '#80c0f0',
        }}>
          💡 <strong>Combinación de premios:</strong> Ritmo lento con giros complejos — configuración ideal para temporadas de galardones. El director deberá tener Perfeccionismo alto.
        </div>
      )}

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Finanzas</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!data.genre}>
          Siguiente: Técnico →
        </button>
      </div>
    </div>
  );
};
