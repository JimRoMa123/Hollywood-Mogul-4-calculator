import React from 'react';
import type { MovieFormData, MovieRatingData, StarRating } from '../../types/calculator.types';
import { StarRatingInput } from './FormComponents';

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PG_AGES = [0, 5, 7, 10, 13, 17] as const;

export const Step4MovieRating: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const rating = data.movieRating;

  const updateRating = (updates: Partial<MovieRatingData>) => {
    onChange({ movieRating: { ...rating, ...updates } });
  };

  const getAgeLabel = (age: number) => {
    if (age === 0) return 'All Ages (G)';
    if (age === 5) return 'PG-5';
    if (age === 7) return 'PG-7';
    if (age === 10) return 'PG-10';
    if (age === 13) return 'PG-13';
    if (age === 17) return 'R (17+)';
    return `${age}+`;
  };

  const isRestrictive = rating.parentalGuidanceAge >= 13;

  return (
    <div className="card" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">⚖️</div>
        <div>
          <h2>Movie Rating</h2>
          <p>Clasificación de contenido que afecta la demografía alcanzable y costos</p>
        </div>
      </div>

      {/* Parental Guidance Age */}
      <div className="section-block">
        <h3 className="section-title">🛡️ Parental Guidance Age</h3>
        <div className="pg-age-selector">
          {PG_AGES.map((age) => (
            <button
              key={age}
              type="button"
              className={`pg-age-btn ${rating.parentalGuidanceAge === age ? 'active' : ''} ${age >= 13 ? 'restrictive' : ''}`}
              onClick={() => updateRating({ parentalGuidanceAge: age as MovieRatingData['parentalGuidanceAge'] })}
            >
              <span className="pg-age-number">{age}</span>
              <span className="pg-age-label">{getAgeLabel(age)}</span>
            </button>
          ))}
        </div>
        {isRestrictive && (
          <div style={{
            marginTop: 12, padding: '10px 14px',
            background: 'var(--orange-dim)', border: '1px solid rgba(255,140,66,0.3)',
            borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--orange-warn)',
          }}>
            ⚠️ Clasificación restrictiva ({getAgeLabel(rating.parentalGuidanceAge)}): Reduce la base demográfica alcanzable. El pool de talento disponible puede verse reducido.
          </div>
        )}
      </div>

      {/* Content Ratings - 5 stars */}
      <div className="section-block">
        <h3 className="section-title">🎭 Contenido Principal (★1-5)</h3>
        <div className="star-grid">
          <StarRatingInput id="language" label="Language" hint=" — lenguaje fuerte"
            value={rating.language} onChange={(v: StarRating) => updateRating({ language: v })}
            tooltip="Nivel de lenguaje adulto. Afecta la clasificación parental." />
          <StarRatingInput id="violence" label="Violence" hint=" — violencia"
            value={rating.violence} onChange={(v: StarRating) => updateRating({ violence: v })}
            tooltip="Grado de violencia en pantalla." />
          <StarRatingInput id="sensuality" label="Sensuality" hint=" — contenido sensual"
            value={rating.sensuality} onChange={(v: StarRating) => updateRating({ sensuality: v })}
            tooltip="Nivel de sensualidad. Directamente vinculado a la flag de Nudity." />
        </div>
      </div>

      {/* Content Ratings - 3 stars */}
      <div className="section-block">
        <h3 className="section-title">😱 Contenido de Impacto (★1-3)</h3>
        <div className="star-grid">
          <StarRatingInput id="fear" label="Fear" hint=" — miedo"
            value={rating.fear as StarRating} max={3}
            onChange={(v: StarRating) => updateRating({ fear: v as 1 | 2 | 3 })}
            tooltip="Intensidad del miedo. Para géneros de Horror/Thriller." />
          <StarRatingInput id="jumpScares" label="Jump Scares" hint=" — sustos repentinos"
            value={rating.jumpScares as StarRating} max={3}
            onChange={(v: StarRating) => updateRating({ jumpScares: v as 1 | 2 | 3 })}
            tooltip="Cantidad de jump scares." />
          <StarRatingInput id="gore" label="Gore" hint=" — contenido gráfico"
            value={rating.gore as StarRating} max={3}
            onChange={(v: StarRating) => updateRating({ gore: v as 1 | 2 | 3 })}
            tooltip="Nivel de gore visual." />
          <StarRatingInput id="controversy" label="Controversy" hint=" — controversia"
            value={rating.controversy as StarRating} max={3}
            onChange={(v: StarRating) => updateRating({ controversy: v as 1 | 2 | 3 })}
            tooltip="Nivel de temas controversiales." />
        </div>
      </div>

      {/* Summary insight */}
      {(rating.violence >= 4 || rating.gore >= 3) && (
        <div style={{
          marginTop: 12, padding: '10px 14px',
          background: 'var(--red-dim)', border: '1px solid rgba(255,61,87,0.3)',
          borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: '#ff8095',
        }}>
          🔴 Contenido extremo detectado — el merchandising será inviable. Audiencia restringida.
        </div>
      )}

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Storytelling</button>
        <button className="btn btn-primary" onClick={onNext}>
          Siguiente: Roles →
        </button>
      </div>
    </div>
  );
};
