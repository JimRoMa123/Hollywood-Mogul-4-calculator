import React from 'react';
import type { MovieFormData, RoleData, StarRating } from '../../types/calculator.types';
import { PERSONA_OPTIONS } from '../../types/calculator.types';
import { StarRatingInput, Select, NumberInput, Toggle } from './FormComponents';

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DEFAULT_ROLE: RoleData = {
  roleType: 'Supporting',
  roleDifficulty: 3,
  species: 'Human',
  gender: 'Male',
  characterDies: false,
  descriptor: '',
  characterAge: 30,
  characterName: '',
  performanceType: 'Live Action',
  performanceFocus: '',
  persona: 'Average',
  stunts: 1,
  makeUpEffects: 1,
  loveScenes: 1,
  characterDescription: '',
};

const ROLE_TYPES = ['Main Character', 'Supporting', 'Antagonist', 'Cameo'] as const;
const SPECIES = ['Human', 'Alien', 'Robot', 'Animal', 'Other'] as const;
const GENDERS = ['Male', 'Female', 'Non-Binary'] as const;
const PERF_TYPES = ['Live Action', 'Animation', 'Motion Capture'] as const;

export const Step5Roles: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const updateRole = (index: number, updates: Partial<RoleData>) => {
    const newRoles = [...data.roles];
    newRoles[index] = { ...newRoles[index], ...updates };
    onChange({ roles: newRoles });
  };

  const addRole = () => {
    onChange({ roles: [...data.roles, { ...DEFAULT_ROLE }] });
  };

  const removeRole = (index: number) => {
    if (index === 0) return; // Can't delete main character
    onChange({ roles: data.roles.filter((_, i) => i !== index) });
  };

  return (
    <div className="card" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">👥</div>
        <div>
          <h2>Roles y Personajes</h2>
          <p>Configura cada rol, sus atributos y requerimientos de performance</p>
        </div>
      </div>

      <div className="roles-list">
        {data.roles.map((role, index) => (
          <div className="role-card" key={index}>
            <div className="role-card-header">
              <div className="role-badge">
                <span className="role-number">Role {index + 1}</span>
                <span className="role-type-label">
                  {role.roleType}
                  {index === 0 && <span className="role-main-tag"> (Principal)</span>}
                </span>
              </div>
              {index > 0 && (
                <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  onClick={() => removeRole(index)}>
                  Eliminar
                </button>
              )}
            </div>
            {index === 0 && (
              <div style={{
                padding: '6px 10px', marginBottom: 12,
                background: 'var(--gold-dim)', border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--gold)',
              }}>
                🌟 Este rol no puede ser eliminado — Main Character obligatorio
              </div>
            )}

            {/* Role type & difficulty */}
            <div className="form-grid" style={{ marginBottom: 16 }}>
              <Select id={`roleType-${index}`} label="Role Type" value={role.roleType}
                options={[...ROLE_TYPES]}
                onChange={(v) => updateRole(index, { roleType: v as RoleData['roleType'] })} />
              <StarRatingInput id={`roleDiff-${index}`} label="Role Difficulty"
                value={role.roleDifficulty}
                onChange={(v: StarRating) => updateRole(index, { roleDifficulty: v })}
                tooltip="Dificultad del rol. Requiere talento con skills adecuados." />
            </div>

            {/* Character Attributes */}
            <div className="section-block-inner">
              <h4 className="subsection-title">Character Attributes</h4>
              <div className="form-grid">
                <Select id={`species-${index}`} label="Species" value={role.species}
                  options={[...SPECIES]}
                  onChange={(v) => updateRole(index, { species: v as RoleData['species'] })} />
                <Select id={`gender-${index}`} label="Gender" value={role.gender}
                  options={[...GENDERS]}
                  onChange={(v) => updateRole(index, { gender: v as RoleData['gender'] })} />
                <NumberInput id={`charAge-${index}`} label="Character Age"
                  value={role.characterAge} min={1} max={120}
                  onChange={(v) => updateRole(index, { characterAge: v })} />
                <div className="form-group">
                  <label htmlFor={`charName-${index}`}>Character Name</label>
                  <input id={`charName-${index}`} type="text" value={role.characterName}
                    onChange={(e) => updateRole(index, { characterName: e.target.value })}
                    placeholder="ej. Wilson, Dr. Smith..." />
                </div>
              </div>
              <div className="toggle-group" style={{ marginTop: 12 }}>
                <Toggle label="💀 Character Dies"
                  description="El personaje muere durante la historia"
                  checked={role.characterDies}
                  onChange={(v) => updateRole(index, { characterDies: v })} />
              </div>
            </div>

            {/* Performance Attributes */}
            <div className="section-block-inner">
              <h4 className="subsection-title">Performance Attributes</h4>
              <div className="form-grid" style={{ marginBottom: 12 }}>
                <Select id={`perfType-${index}`} label="Performance Type" value={role.performanceType}
                  options={[...PERF_TYPES]}
                  onChange={(v) => updateRole(index, { performanceType: v as RoleData['performanceType'] })} />
                <Select id={`perfFocus-${index}`} label="Performance Focus" value={role.performanceFocus}
                  options={['Action', 'Comedy', 'Drama', 'Romance', 'Horror', 'Musical']}
                  onChange={(v) => updateRole(index, { performanceFocus: v })} />
                <Select id={`persona-${index}`} label="Persona" value={role.persona}
                  options={PERSONA_OPTIONS}
                  onChange={(v) => updateRole(index, { persona: v })} />
              </div>
              <div className="star-grid">
                <StarRatingInput id={`stunts-${index}`} label="Stunts" hint=" — acrobacias del rol"
                  value={role.stunts}
                  onChange={(v: StarRating) => updateRole(index, { stunts: v })} />
                <StarRatingInput id={`makeUp-${index}`} label="Make-Up Effects" hint=" — maquillaje especial"
                  value={role.makeUpEffects}
                  onChange={(v: StarRating) => updateRole(index, { makeUpEffects: v })} />
                <StarRatingInput id={`loveScenes-${index}`} label="Love Scenes" hint=" — escenas románticas"
                  value={role.loveScenes}
                  onChange={(v: StarRating) => updateRole(index, { loveScenes: v })} />
              </div>
            </div>

            {/* Description */}
            <div className="form-group" style={{ marginTop: 12 }}>
              <label htmlFor={`charDesc-${index}`}>Character Description <span className="label-hint">(opcional)</span></label>
              <textarea id={`charDesc-${index}`} value={role.characterDescription}
                onChange={(e) => updateRole(index, { characterDescription: e.target.value })}
                placeholder="Breve descripción del personaje..."
                rows={2} style={{ resize: 'vertical' }} />
            </div>
          </div>
        ))}

        {data.roles.length < 10 && (
          <button className="add-cast-btn" onClick={addRole}>
            + Añadir Rol / Personaje
          </button>
        )}
      </div>

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Rating</button>
        <button className="btn btn-primary" onClick={onNext}>
          Siguiente: Writer →
        </button>
      </div>
    </div>
  );
};
