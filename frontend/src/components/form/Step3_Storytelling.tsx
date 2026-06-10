import React from 'react';
import type { MovieFormData, StarRating } from '../../types/calculator.types';
import { GENRES, ERAS, AUDIENCE_SEGMENTS, ADDITIONAL_VILLAIN_OPTIONS } from '../../types/calculator.types';
import { StarRatingInput, Toggle, Select } from './FormComponents';

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const STORY_ENDINGS = ['Happy', 'Sad', 'Ambiguous', 'Open', 'Tragic', 'Bittersweet'];

export const Step3Storytelling: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  return (
    <div className="card" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">🎭</div>
        <div>
          <h2>Storytelling Attributes</h2>
          <p>Define la estructura narrativa, géneros, audiencia y detalles del guion</p>
        </div>
      </div>

      {/* Genre Section */}
      <div className="section-block">
        <h3 className="section-title">📚 Género y Tipo</h3>
        <div className="form-grid">
          <Select id="productionGenre" label="Production Genre" value={data.productionGenre}
            options={GENRES} onChange={(v) => onChange({ productionGenre: v })} />
          <Select id="genre" label="Genre" value={data.genre}
            options={GENRES} onChange={(v) => onChange({ genre: v })} />
          <div className="form-group">
            <label htmlFor="subgenre">Sub-Genre <span className="label-hint">(opcional)</span></label>
            <input id="subgenre" type="text" value={data.subgenre}
              onChange={(e) => onChange({ subgenre: e.target.value })}
              placeholder="ej. Cyberpunk, Noir, Coming-of-age..." />
          </div>
        </div>
        <div className="toggle-group" style={{ marginTop: 16 }}>
          <Toggle label="🎵 Musical" description="La producción incluye números musicales"
            checked={data.isMusical} onChange={(v) => onChange({ isMusical: v })} />
          <Toggle label="🦎 Creatures" description="La producción incluye criaturas (requiere Creature FX)"
            checked={data.hasCreatures} onChange={(v) => onChange({ hasCreatures: v })} />
        </div>
      </div>

      {/* Narrative Attributes */}
      <div className="section-block">
        <h3 className="section-title">📝 Atributos Narrativos</h3>
        <div className="star-grid">
          <StarRatingInput id="storyScope" label="Story Scope" hint=" — ambición escalar"
            value={data.storyScope} onChange={(v: StarRating) => onChange({ storyScope: v })}
            tooltip="Escala de la producción. Requiere alto Set Design para evitar castigo." />
          <StarRatingInput id="charDevelopment" label="Character Development" hint=" — profundidad de personajes"
            value={data.charDevelopment} onChange={(v: StarRating) => onChange({ charDevelopment: v })}
            tooltip="Profundidad dramática. Se multiplica por Screen Presence del cast." />
          <StarRatingInput id="intelligence" label="Intelligence" hint=" — complejidad intelectual"
            value={data.intelligence} onChange={(v: StarRating) => onChange({ intelligence: v })}
            tooltip="Nivel intelectual del guion. Afecta recepción crítica." />
          <StarRatingInput id="dialogue" label="Dialogue" hint=" — calidad del diálogo"
            value={data.dialogue} onChange={(v: StarRating) => onChange({ dialogue: v })}
            tooltip="Calidad de los diálogos. Requiere buen Writer para maximizar." />
          <StarRatingInput id="pace" label="Pace" hint=" — ritmo narrativo"
            value={data.pace} onChange={(v: StarRating) => onChange({ pace: v })}
            tooltip="Velocidad de la historia. Ritmo lento + giros = premios." />
          <StarRatingInput id="plotTwists" label="Plot Twists" hint=" — giros de trama"
            value={data.plotTwists} onChange={(v: StarRating) => onChange({ plotTwists: v })}
            tooltip="Densidad de sorpresas. Exige alto Perfeccionismo del director." />
          <StarRatingInput id="subplots" label="Sub-Plots" hint=" — complejidad narrativa"
            value={data.subplots} onChange={(v: StarRating) => onChange({ subplots: v })}
            tooltip="Capas dramáticas adicionales. Aumenta la exigencia del director." />
        </div>
      </div>

      {/* Story Context */}
      <div className="section-block">
        <h3 className="section-title">🌍 Contexto de la Historia</h3>
        <div className="form-grid">
          <Select id="era" label="Era" value={data.era}
            options={ERAS} onChange={(v) => onChange({ era: v })}
            placeholder="— Seleccionar época —" />
          <Select id="additionalVillain" label="Additional Villain" value={data.additionalVillain}
            options={ADDITIONAL_VILLAIN_OPTIONS} onChange={(v) => onChange({ additionalVillain: v })} />
          <Select id="storyEnding" label="Story Ending" value={data.storyEnding}
            options={STORY_ENDINGS} onChange={(v) => onChange({ storyEnding: v })} />
        </div>
        <div className="toggle-group" style={{ marginTop: 16 }}>
          <Toggle label="📖 Based On A True Story"
            description="Puede afectar el interés de la audiencia y la recepción crítica"
            checked={data.basedOnTrueStory} onChange={(v) => onChange({ basedOnTrueStory: v })} />
        </div>
      </div>

      {/* Marketing / Audience Attributes */}
      <div className="section-block">
        <h3 className="section-title">🎯 Marketing Attributes</h3>
        <div className="form-grid">
          <Select id="primaryAudience" label="Primary Audience" value={data.primaryAudience}
            options={AUDIENCE_SEGMENTS} onChange={(v) => onChange({ primaryAudience: v })}
            placeholder="— Audiencia primaria —" />
          <Select id="secondaryAudience" label="Secondary Audience" value={data.secondaryAudience}
            options={AUDIENCE_SEGMENTS} onChange={(v) => onChange({ secondaryAudience: v })}
            placeholder="— Audiencia secundaria —" />
        </div>
      </div>

      {/* Insight box */}
      {data.pace <= 2 && data.plotTwists >= 4 && (
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
          Siguiente: Rating →
        </button>
      </div>
    </div>
  );
};
