import React from 'react';
import type { MovieFormData, DirectorData, CastMember, StarRating } from '../../types/calculator.types';
import { PERSONA_OPTIONS, GENRES } from '../../types/calculator.types';
import { StarRatingInput, MoneyInput, NumberInput, Select, Toggle } from './FormComponents';

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DEFAULT_CAST_MEMBER: CastMember = {
  name: '', salary: 500000, age: 30,
  actionSkill: 3, comedySkill: 3, dramaSkill: 3, singSkill: 1, danceSkill: 1,
  screenPresence: 3, sexAppeal: 3, humility: 3, perfectionist: 3, scriptAsWritten: 3,
  persona: 'Average', payOrPlay: false, points: 0,
  bestKnownAs: 'Actor', wantsToTry: '',
};

export const Step7DirectorAndTalent: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const dir = data.director;

  const updateDirector = (updates: Partial<DirectorData>) => {
    onChange({ director: { ...dir, ...updates } });
  };

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

  // Tension calculation
  const avgHumility = data.castData.length > 0
    ? Math.round(data.castData.reduce((a, c) => a + c.humility, 0) / data.castData.length)
    : 3;
  const tension = Math.abs(dir.perfectionist - avgHumility);

  return (
    <div className="card" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">🎥</div>
        <div>
          <h2>Director y Talento</h2>
          <p>El director y elenco determinan el techo creativo y los costos reales</p>
        </div>
      </div>

      {/* ===== DIRECTOR SECTION ===== */}
      <div style={{
        background: 'rgba(212,175,55,0.04)', border: '1px solid var(--border-gold)',
        borderRadius: 'var(--radius-md)', padding: 24, marginBottom: 28,
      }}>
        <h3 style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>🎬</span> Director
        </h3>

        {/* Director Info */}
        <div className="form-grid" style={{ marginBottom: 20 }}>
          <div className="form-group">
            <label htmlFor="dirName">Nombre</label>
            <input id="dirName" type="text" value={dir.name}
              onChange={(e) => updateDirector({ name: e.target.value })}
              placeholder="Nombre del director..." />
          </div>
          <NumberInput id="dirAge" label="Edad" value={dir.age}
            min={18} max={90} onChange={(v) => updateDirector({ age: v })} />
          <MoneyInput id="dirSalary" label="Salario" value={dir.salary}
            onChange={(v) => updateDirector({ salary: v })} />
        </div>

        {/* Director Genre Skills */}
        <div className="section-block-inner">
          <h4 className="subsection-title">Genre Skills</h4>
          <div className="star-grid">
            <StarRatingInput id="dirAction" label="Action" value={dir.actionSkill}
              onChange={(v: StarRating) => updateDirector({ actionSkill: v })} />
            <StarRatingInput id="dirComedy" label="Comedy" value={dir.comedySkill}
              onChange={(v: StarRating) => updateDirector({ comedySkill: v })} />
            <StarRatingInput id="dirDrama" label="Drama" value={dir.dramaSkill}
              onChange={(v: StarRating) => updateDirector({ dramaSkill: v })} />
          </div>
        </div>

        {/* Director Attributes */}
        <div className="section-block-inner">
          <h4 className="subsection-title">Director Attributes</h4>
          <div className="star-grid">
            <StarRatingInput id="dirAuthority" label="Authority" hint=" — liderazgo"
              value={dir.authority}
              onChange={(v: StarRating) => updateDirector({ authority: v })}
              tooltip="Capacidad de liderazgo sobre el equipo." />
            <StarRatingInput id="dirStorySense" label="Story Sense" hint=" — sentido narrativo"
              value={dir.storySense}
              onChange={(v: StarRating) => updateDirector({ storySense: v })} />
            <StarRatingInput id="dirEpicStory" label="Epic Story Sense" hint=" — escala épica"
              value={dir.epicStorySense}
              onChange={(v: StarRating) => updateDirector({ epicStorySense: v })} />
            <StarRatingInput id="dirOnBudget" label="On Budget" hint=" — control de costos"
              value={dir.onBudget}
              onChange={(v: StarRating) => updateDirector({ onBudget: v })}
              tooltip="Habilidad para controlar gastos. Amortigua pérdidas ante eventos aleatorios." />
            <StarRatingInput id="dirEffects" label="Effects" hint=" — manejo de VFX"
              value={dir.effects}
              onChange={(v: StarRating) => updateDirector({ effects: v })}
              tooltip="Competencia en efectos especiales. Obligatorio si el budget de VFX es alto." />
            <StarRatingInput id="dirPerfectionist" label="Perfectionist" hint=" — techo de calidad"
              value={dir.perfectionist}
              onChange={(v: StarRating) => updateDirector({ perfectionist: v })}
              tooltip="Define el techo de calidad artística. Genera roces con actores de baja Humildad." />
            <StarRatingInput id="dirScriptWritten" label="Script As Written" hint=" — fidelidad al guion"
              value={dir.scriptAsWritten}
              onChange={(v: StarRating) => updateDirector({ scriptAsWritten: v })}
              tooltip="Si el guion es bueno, un valor alto asegura trasladar esa calidad." />
          </div>
        </div>

        {/* Director Specialty */}
        <div className="section-block-inner">
          <h4 className="subsection-title">Especialización</h4>
          <div className="form-grid">
            <Select id="dirGenreSpec" label="Genre Specialty" value={dir.genreSpecialty}
              options={['None', ...GENRES]}
              onChange={(v) => updateDirector({ genreSpecialty: v })} />
            <StarRatingInput id="dirGenreProf" label="Genre Proficiency"
              value={dir.genreProficiency}
              onChange={(v: StarRating) => updateDirector({ genreProficiency: v })} />
            <MoneyInput id="dirMinBudget" label="Min Production Budget Req."
              value={dir.minBudgetRequirement}
              onChange={(v) => updateDirector({ minBudgetRequirement: v })}
              tooltip="Presupuesto mínimo que exige el director para trabajar." />
          </div>
          <div className="toggle-group" style={{ marginTop: 12 }}>
            <Toggle label="🎬 Final Cut"
              description="El director tiene aprobación final del montaje"
              checked={dir.finalCut}
              onChange={(v) => updateDirector({ finalCut: v })} />
          </div>
        </div>
      </div>

      {/* Tension indicator */}
      {data.castData.length > 0 && (
        <div style={{
          padding: '12px 16px', marginBottom: 20,
          background: tension >= 4 ? 'var(--orange-dim)' : tension >= 3 ? 'var(--red-dim)' : 'var(--green-dim)',
          border: `1px solid ${tension >= 4 ? 'rgba(255,140,66,0.3)' : tension >= 3 ? 'rgba(255,61,87,0.3)' : 'rgba(0,201,127,0.3)'}`,
          borderRadius: 'var(--radius-sm)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.82rem' }}>
            {tension >= 4 ? '⚡ Tensión extrema — "Rayo en la botella" posible' :
             tension >= 3 ? '⚠️ Conflicto director-elenco moderado' :
             '✅ Buena alineación director-elenco'}
          </span>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>Tensión: {tension} ★</span>
        </div>
      )}

      {/* ===== CAST SECTION ===== */}
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

            {/* Basic info */}
            <div className="form-grid" style={{ marginBottom: 12 }}>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" value={member.name}
                  onChange={(e) => updateCast(index, { name: e.target.value })}
                  placeholder="Nombre del actor..." />
              </div>
              <NumberInput id={`age-${index}`} label="Edad" value={member.age}
                min={18} max={90} onChange={(v) => updateCast(index, { age: v })} />
              <MoneyInput id={`salary-${index}`} label="Salario" value={member.salary}
                onChange={(v) => updateCast(index, { salary: v })} />
            </div>

            {/* Talent Attributes (genre skills) */}
            <div className="section-block-inner">
              <h4 className="subsection-title">Talent Attributes</h4>
              <div className="star-grid-compact">
                <StarRatingInput id={`actAction-${index}`} label="Action" value={member.actionSkill}
                  onChange={(v: StarRating) => updateCast(index, { actionSkill: v })} />
                <StarRatingInput id={`actComedy-${index}`} label="Comedy" value={member.comedySkill}
                  onChange={(v: StarRating) => updateCast(index, { comedySkill: v })} />
                <StarRatingInput id={`actDrama-${index}`} label="Drama" value={member.dramaSkill}
                  onChange={(v: StarRating) => updateCast(index, { dramaSkill: v })} />
                <StarRatingInput id={`actSing-${index}`} label="Sing" value={member.singSkill}
                  onChange={(v: StarRating) => updateCast(index, { singSkill: v })} />
                <StarRatingInput id={`actDance-${index}`} label="Dance" value={member.danceSkill}
                  onChange={(v: StarRating) => updateCast(index, { danceSkill: v })} />
              </div>
            </div>

            {/* Core attributes */}
            <div className="section-block-inner">
              <h4 className="subsection-title">Core Attributes</h4>
              <div className="star-grid-compact">
                <StarRatingInput id={`screenPres-${index}`} label="Screen Presence"
                  value={member.screenPresence}
                  onChange={(v: StarRating) => updateCast(index, { screenPresence: v })} />
                <StarRatingInput id={`sexAppeal-${index}`} label="Sex Appeal"
                  value={member.sexAppeal}
                  onChange={(v: StarRating) => updateCast(index, { sexAppeal: v })} />
                <StarRatingInput id={`humility-${index}`} label="Humility"
                  value={member.humility}
                  onChange={(v: StarRating) => updateCast(index, { humility: v })} />
                <StarRatingInput id={`actPerf-${index}`} label="Perfectionist"
                  value={member.perfectionist}
                  onChange={(v: StarRating) => updateCast(index, { perfectionist: v })} />
                <StarRatingInput id={`actScript-${index}`} label="Script As Written"
                  value={member.scriptAsWritten}
                  onChange={(v: StarRating) => updateCast(index, { scriptAsWritten: v })} />
              </div>
            </div>

            {/* Meta */}
            <div className="form-grid" style={{ marginTop: 12 }}>
              <Select id={`persona-${index}`} label="Persona" value={member.persona}
                options={PERSONA_OPTIONS}
                onChange={(v) => updateCast(index, { persona: v })} />
              <Select id={`bestKnown-${index}`} label="Best Known As" value={member.bestKnownAs}
                options={['Actor', 'Director', 'Writer']}
                onChange={(v) => updateCast(index, { bestKnownAs: v as CastMember['bestKnownAs'] })} />
              <NumberInput id={`points-${index}`} label="Points %" hint=" (backend)"
                value={member.points} min={0} max={100}
                onChange={(v) => updateCast(index, { points: v })} />
            </div>
            <div className="toggle-group" style={{ marginTop: 8 }}>
              <Toggle label="💰 Pay Or Play"
                description="Contrato garantizado independiente de que se filme"
                checked={member.payOrPlay}
                onChange={(v) => updateCast(index, { payOrPlay: v })} />
            </div>

            {/* Unicorn detector */}
            {member.salary < 100000 && member.screenPresence >= 5 && (
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

        {data.castData.length < 8 && (
          <button className="add-cast-btn" onClick={addCast}>
            + Añadir Actor / Actriz
          </button>
        )}
      </div>

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Writer</button>
        <button className="btn btn-primary" onClick={onNext}>
          Siguiente: Producción →
        </button>
      </div>
    </div>
  );
};
