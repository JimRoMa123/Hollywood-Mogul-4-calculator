import React from 'react';
import { MovieFormData } from '../../types/calculator.types';
import { MoneyInput } from './FormComponents';

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onNext: () => void;
}

export const Step1Finances: React.FC<Props> = ({ data, onChange, onNext }) => {
  const totalSpend = data.budget + data.marketingBudget;
  const remainingCash = data.studioCash - totalSpend;
  const isHealthy = remainingCash > data.budget * 0.25;

  return (
    <div className="card card-gold" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">💰</div>
        <div>
          <h2>Macro Finanzas del Estudio</h2>
          <p>Define el capital disponible y los límites de inversión</p>
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: 20 }}>
        <label htmlFor="movieTitle">Título del Proyecto</label>
        <input
          id="movieTitle"
          type="text"
          value={data.movieTitle}
          onChange={(e) => onChange({ movieTitle: e.target.value })}
          placeholder="ej. Operación Galaxia II"
        />
      </div>

      <div className="form-grid">
        <MoneyInput
          id="studioCash"
          label="Capital Total del Estudio"
          hint=" (liquidez disponible)"
          value={data.studioCash}
          onChange={(v) => onChange({ studioCash: v })}
        />
        <MoneyInput
          id="budget"
          label="Presupuesto de Producción"
          hint=" (budget de la película)"
          value={data.budget}
          onChange={(v) => onChange({ budget: v })}
        />
        <MoneyInput
          id="marketingBudget"
          label="Presupuesto de Marketing"
          hint=" (campaña publicitaria)"
          value={data.marketingBudget}
          onChange={(v) => onChange({ marketingBudget: v })}
        />
      </div>

      {totalSpend > 0 && data.studioCash > 0 && (
        <div style={{
          marginTop: 24,
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)',
          background: isHealthy ? 'var(--green-dim)' : 'var(--red-dim)',
          border: `1px solid ${isHealthy ? 'rgba(0,201,127,0.3)' : 'rgba(255,61,87,0.3)'}`,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Reserva de contingencia
            </div>
            <div style={{
              fontSize: '1.2rem', fontWeight: 700,
              color: isHealthy ? 'var(--green-success)' : 'var(--red-danger)',
            }}>
              ${(remainingCash / 1e6).toFixed(1)}M
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Gasto total
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              ${(totalSpend / 1e6).toFixed(1)}M
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Marketing óptimo estimado
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)' }}>
              ${(data.budget * 0.2 / 1e6).toFixed(1)}M
            </div>
          </div>
        </div>
      )}

      <div className="step-nav">
        <div />
        <button className="btn btn-primary" onClick={onNext}>
          Siguiente: Narrativo →
        </button>
      </div>
    </div>
  );
};
