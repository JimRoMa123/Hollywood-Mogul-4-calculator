import React from 'react';
import type { MovieFormData, PreProductionData, ProductionCrewData, PostProductionData, StarRating } from '../../types/calculator.types';
import { StarRatingInput, MoneyInput, NumberInput, Select } from './FormComponents';

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

type PhaseCardProps = {
  title: string;
  icon: string;
  rating: StarRating;
  cost: number;
  level: StarRating;
  months: number;
  ratingId: string;
  ratingLabel: string;
  levelId: string;
  levelLabel: string;
  onRatingChange: (v: StarRating) => void;
  onCostChange: (v: number) => void;
  onLevelChange: (v: StarRating) => void;
  onMonthsChange: (v: number) => void;
};

const PhaseCard: React.FC<PhaseCardProps> = ({
  title, icon, rating, cost, level, months,
  ratingId, ratingLabel, levelId, levelLabel,
  onRatingChange, onCostChange, onLevelChange, onMonthsChange,
}) => (
  <div className="production-phase-card">
    <h4 className="phase-title">{icon} {title}</h4>
    <div className="form-grid">
      <StarRatingInput id={ratingId} label={ratingLabel} value={rating} onChange={onRatingChange} />
      <MoneyInput id={`${ratingId}-cost`} label="Costo Mensual" value={cost} onChange={onCostChange} />
    </div>
    <div className="form-grid" style={{ marginTop: 8 }}>
      <StarRatingInput id={levelId} label={levelLabel} value={level} onChange={onLevelChange} />
      <NumberInput id={`${levelId}-months`} label="Meses" value={months} min={0} max={24} onChange={onMonthsChange} />
    </div>
    <div className="phase-total">
      Total: <span className="phase-total-amount">${((cost * months) / 1e6).toFixed(2)}M</span>
    </div>
  </div>
);

export const Step8Production: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const pre = data.preProduction;
  const prod = data.productionCrew;
  const post = data.postProduction;

  const updatePre = (u: Partial<PreProductionData>) => onChange({ preProduction: { ...pre, ...u } });
  const updateProd = (u: Partial<ProductionCrewData>) => onChange({ productionCrew: { ...prod, ...u } });
  const updatePost = (u: Partial<PostProductionData>) => onChange({ postProduction: { ...post, ...u } });

  // Cost calculations
  const preCost = (pre.costumeDesignTeamCost * pre.costumeDesignMonths) +
                  (pre.setDesignTeamCost * pre.setDesignMonths);
  const prodCost = (prod.crewCost * prod.crewMonths) +
                   (prod.stuntTeamCost * prod.stuntMonths) +
                   (prod.makeUpDesignTeamCost * prod.makeUpMonths) +
                   (prod.practicalEffectsCost * prod.practicalEffectsMonths) +
                   (prod.creatureEffectsCost * prod.creatureEffectsMonths);
  const postCost = (post.postProductionTeamCost * post.editingMonths) +
                   (post.vfxCompanyCost * post.vfxMonths);
  const totalPhaseCost = preCost + prodCost + postCost;

  return (
    <div className="card" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">🔧</div>
        <div>
          <h2>Fases de Producción</h2>
          <p>Pre-producción, rodaje y post-producción con costos detallados</p>
        </div>
      </div>

      {/* ===== PRE-PRODUCTION ===== */}
      <div className="section-block">
        <h3 className="section-title">🎨 Pre-Production</h3>
        <PhaseCard title="Costume Design" icon="👗"
          rating={pre.costumeDesignTeamRating} cost={pre.costumeDesignTeamCost}
          level={pre.costumeDesign} months={pre.costumeDesignMonths}
          ratingId="costTeamRating" ratingLabel="Team Rating"
          levelId="costDesign" levelLabel="Costume Design"
          onRatingChange={(v) => updatePre({ costumeDesignTeamRating: v })}
          onCostChange={(v) => updatePre({ costumeDesignTeamCost: v })}
          onLevelChange={(v) => updatePre({ costumeDesign: v })}
          onMonthsChange={(v) => updatePre({ costumeDesignMonths: v })} />
        <PhaseCard title="Set Design" icon="🏗️"
          rating={pre.setDesignTeamRating} cost={pre.setDesignTeamCost}
          level={pre.setDesign} months={pre.setDesignMonths}
          ratingId="setTeamRating" ratingLabel="Team Rating"
          levelId="setDesign" levelLabel="Set Design"
          onRatingChange={(v) => updatePre({ setDesignTeamRating: v })}
          onCostChange={(v) => updatePre({ setDesignTeamCost: v })}
          onLevelChange={(v) => updatePre({ setDesign: v })}
          onMonthsChange={(v) => updatePre({ setDesignMonths: v })} />
        <div className="phase-subtotal">
          Pre-Production: <span>${(preCost / 1e6).toFixed(2)}M</span>
        </div>
      </div>

      {/* ===== PRODUCTION ===== */}
      <div className="section-block">
        <h3 className="section-title">🎬 Production Crew</h3>
        <div className="form-grid" style={{ marginBottom: 16 }}>
          <Select id="filmType" label="Film Type" value={prod.filmType}
            options={['Color', 'Black & White']}
            onChange={(v) => updateProd({ filmType: v as ProductionCrewData['filmType'] })} />
        </div>
        <PhaseCard title="Production Crew" icon="🎥"
          rating={prod.crewRating} cost={prod.crewCost}
          level={prod.crewRating} months={prod.crewMonths}
          ratingId="crewRating" ratingLabel="Crew Rating"
          levelId="crewLevel" levelLabel="← Story Scope"
          onRatingChange={(v) => updateProd({ crewRating: v })}
          onCostChange={(v) => updateProd({ crewCost: v })}
          onLevelChange={() => {}} onMonthsChange={(v) => updateProd({ crewMonths: v })} />
        <PhaseCard title="Stunts" icon="🤸"
          rating={prod.stuntTeamRating} cost={prod.stuntTeamCost}
          level={prod.stunts} months={prod.stuntMonths}
          ratingId="stuntTeamRating" ratingLabel="Stunt Team Rating"
          levelId="stuntLevel" levelLabel="← Stunts"
          onRatingChange={(v) => updateProd({ stuntTeamRating: v })}
          onCostChange={(v) => updateProd({ stuntTeamCost: v })}
          onLevelChange={(v) => updateProd({ stunts: v })}
          onMonthsChange={(v) => updateProd({ stuntMonths: v })} />
        <PhaseCard title="Make-Up Effects" icon="💄"
          rating={prod.makeUpDesignTeamRating} cost={prod.makeUpDesignTeamCost}
          level={prod.makeUpEffects} months={prod.makeUpMonths}
          ratingId="makeUpTeamRating" ratingLabel="Make-Up Design Team Rating"
          levelId="makeUpLevel" levelLabel="← Make-Up Effects"
          onRatingChange={(v) => updateProd({ makeUpDesignTeamRating: v })}
          onCostChange={(v) => updateProd({ makeUpDesignTeamCost: v })}
          onLevelChange={(v) => updateProd({ makeUpEffects: v })}
          onMonthsChange={(v) => updateProd({ makeUpMonths: v })} />
        <PhaseCard title="Practical Effects" icon="💥"
          rating={prod.practicalEffectsCompanyRating} cost={prod.practicalEffectsCost}
          level={prod.practicalEffects} months={prod.practicalEffectsMonths}
          ratingId="practicalRating" ratingLabel="Practical Effects Company Rating"
          levelId="practicalLevel" levelLabel="Practical Effects"
          onRatingChange={(v) => updateProd({ practicalEffectsCompanyRating: v })}
          onCostChange={(v) => updateProd({ practicalEffectsCost: v })}
          onLevelChange={(v) => updateProd({ practicalEffects: v })}
          onMonthsChange={(v) => updateProd({ practicalEffectsMonths: v })} />
        <PhaseCard title="Creature Effects" icon="🦖"
          rating={prod.creatureEffectsCompanyRating} cost={prod.creatureEffectsCost}
          level={prod.creatureEffects} months={prod.creatureEffectsMonths}
          ratingId="creatureRating" ratingLabel="Creature Effects Company Rating"
          levelId="creatureLevel" levelLabel="Creature Effects"
          onRatingChange={(v) => updateProd({ creatureEffectsCompanyRating: v })}
          onCostChange={(v) => updateProd({ creatureEffectsCost: v })}
          onLevelChange={(v) => updateProd({ creatureEffects: v })}
          onMonthsChange={(v) => updateProd({ creatureEffectsMonths: v })} />
        <div className="phase-subtotal">
          Production: <span>${(prodCost / 1e6).toFixed(2)}M</span>
        </div>
      </div>

      {/* ===== POST-PRODUCTION ===== */}
      <div className="section-block">
        <h3 className="section-title">🎞️ Post-Production</h3>
        <PhaseCard title="Editing / Sound Design / Mixing" icon="🎛️"
          rating={post.postProductionTeamRating} cost={post.postProductionTeamCost}
          level={post.postProductionTeamRating} months={post.editingMonths}
          ratingId="postTeamRating" ratingLabel="Post-Production Team Rating"
          levelId="postLevel" levelLabel="← Story Scope"
          onRatingChange={(v) => updatePost({ postProductionTeamRating: v })}
          onCostChange={(v) => updatePost({ postProductionTeamCost: v })}
          onLevelChange={() => {}} onMonthsChange={(v) => updatePost({ editingMonths: v })} />
        <PhaseCard title="Visual Effects" icon="✨"
          rating={post.vfxCompanyRating} cost={post.vfxCompanyCost}
          level={post.visualEffects} months={post.vfxMonths}
          ratingId="vfxCompanyRating" ratingLabel="VFX Company Rating"
          levelId="vfxLevel" levelLabel="Visual Effects"
          onRatingChange={(v) => updatePost({ vfxCompanyRating: v })}
          onCostChange={(v) => updatePost({ vfxCompanyCost: v })}
          onLevelChange={(v) => updatePost({ visualEffects: v })}
          onMonthsChange={(v) => updatePost({ vfxMonths: v })} />
        <div className="phase-subtotal">
          Post-Production: <span>${(postCost / 1e6).toFixed(2)}M</span>
        </div>
      </div>

      {/* Grand Total */}
      <div style={{
        marginTop: 24, padding: '20px 24px',
        background: totalPhaseCost > data.budget ? 'var(--red-dim)' : 'var(--green-dim)',
        border: `1px solid ${totalPhaseCost > data.budget ? 'rgba(255,61,87,0.3)' : 'rgba(0,201,127,0.3)'}`,
        borderRadius: 'var(--radius-md)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Costo Total de Producción
          </div>
          <div style={{
            fontSize: '1.4rem', fontWeight: 700,
            color: totalPhaseCost > data.budget ? 'var(--red-danger)' : 'var(--green-success)',
          }}>
            ${(totalPhaseCost / 1e6).toFixed(2)}M
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Budget disponible
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)' }}>
            ${(data.budget / 1e6).toFixed(1)}M
          </div>
        </div>
      </div>

      {totalPhaseCost > data.budget && (
        <div style={{
          marginTop: 12, padding: '10px 14px',
          background: 'var(--red-dim)', border: '1px solid rgba(255,61,87,0.3)',
          borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: '#ff8095',
        }}>
          🚨 <strong>Sobrecosto detectado:</strong> Los costos de producción (${(totalPhaseCost / 1e6).toFixed(1)}M) superan el presupuesto (${(data.budget / 1e6).toFixed(1)}M) por ${((totalPhaseCost - data.budget) / 1e6).toFixed(1)}M.
        </div>
      )}

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Director y Talento</button>
        <button className="btn btn-primary" onClick={onNext}>
          Siguiente: Soundtrack →
        </button>
      </div>
    </div>
  );
};
