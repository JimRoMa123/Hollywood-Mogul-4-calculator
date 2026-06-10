import React from 'react';
import type { StarRating } from '../../types/calculator.types';

// ===== Star Rating (clickable, 1-5) =====
interface StarRatingInputProps {
  label: string;
  hint?: string;
  value: StarRating;
  max?: 3 | 5;
  onChange: (val: StarRating) => void;
  id: string;
  tooltip?: string;
}

export const StarRatingInput: React.FC<StarRatingInputProps> = ({
  label, hint, value, max = 5, onChange, id, tooltip,
}) => {
  return (
    <div className="star-rating-group">
      <div className="star-rating-label-row">
        <label htmlFor={id} style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
          {label}
          {hint && <span className="label-hint">{hint}</span>}
        </label>
      </div>
      <div className="star-rating-stars" id={id}>
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            type="button"
            className={`star-btn ${star <= value ? 'filled' : 'empty'}`}
            onClick={() => onChange(star as StarRating)}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
          >
            ★
          </button>
        ))}
        <span className="star-rating-text">{value}/{max}</span>
      </div>
      {tooltip && <div className="input-tooltip-text" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '1.4' }}>{tooltip}</div>}
    </div>
  );
};

// ===== Slider (keep for percentage/money sliders) =====
interface SliderProps {
  label: string;
  hint?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  id: string;
  tooltip?: string;
  isStars?: boolean;
}

const renderStarsText = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const starsStr = '★'.repeat(fullStars) + (hasHalf ? '½' : '');
  return `${starsStr} (${rating.toFixed(1)} / 5)`;
};

export const Slider: React.FC<SliderProps> = ({
  label, hint, value, min, max, onChange, id, tooltip, isStars = false,
}) => {
  const displayValue = isStars ? value / 20 : value;
  const rangeMin = isStars ? 0.5 : (min !== undefined ? min : 1);
  const rangeMax = isStars ? 5.0 : (max !== undefined ? max : 100);
  const rangeStep = isStars ? 0.5 : 1;

  return (
    <div className="slider-group">
      <div className="slider-label-row">
        <label htmlFor={id} style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
          {label}
          {hint && <span className="label-hint">{hint}</span>}
        </label>
        <span className="slider-value" style={{ color: isStars ? 'var(--gold)' : 'var(--text-primary)' }}>
          {isStars ? renderStarsText(displayValue) : `${displayValue}%`}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={rangeMin}
        max={rangeMax}
        step={rangeStep}
        value={displayValue}
        onChange={(e) => {
          const rawVal = Number(e.target.value);
          onChange(isStars ? Math.round(rawVal * 20) : rawVal);
        }}
      />
      {tooltip && <div className="input-tooltip-text" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '1.4' }}>{tooltip}</div>}
    </div>
  );
};

// ===== Money Input =====
interface MoneyInputProps {
  label: string;
  hint?: string;
  value: number;
  onChange: (val: number) => void;
  id: string;
  tooltip?: string;
}

export const MoneyInput: React.FC<MoneyInputProps> = ({ label, hint, value, onChange, id, tooltip }) => (
  <div className="form-group">
    <label htmlFor={id}>
      {label}
      {hint && <span className="label-hint">{hint}</span>}
    </label>
    <div style={{ position: 'relative' }}>
      <span style={{
        position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
        color: 'var(--gold)', fontSize: '0.9rem', pointerEvents: 'none',
      }}>$</span>
      <input
        id={id}
        type="number"
        min={0}
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ paddingLeft: '24px' }}
        placeholder="0"
      />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
      {value > 0 && (
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          = ${(value / 1e6).toFixed(1)}M USD
        </span>
      )}
      {tooltip && <span className="input-tooltip-text" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: '1.4', textAlign: 'right', marginLeft: 'auto' }}>{tooltip}</span>}
    </div>
  </div>
);

// ===== Toggle =====
interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, description, checked, onChange }) => (
  <div className={`toggle-item ${checked ? 'active' : ''}`} onClick={() => onChange(!checked)}>
    <div className="toggle-item-text">
      <h4>{label}</h4>
      {description && <p>{description}</p>}
    </div>
    <div className={`toggle-switch ${checked ? 'on' : ''}`}>
      <div className="toggle-knob" />
    </div>
  </div>
);

// ===== Select Dropdown =====
interface SelectProps {
  label: string;
  hint?: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  id: string;
  placeholder?: string;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({ label, hint, value, options, onChange, id, placeholder, required = false }) => (
  <div className="form-group">
    <label htmlFor={id}>
      {label}
      {hint && <span className="label-hint">{hint}</span>}
    </label>
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
      {!required && <option value="">{placeholder || '— Selecciona —'}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

// ===== Number Input =====
interface NumberInputProps {
  label: string;
  hint?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  id: string;
  tooltip?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, hint, value, min, max, onChange, id, tooltip }) => (
  <div className="form-group">
    <label htmlFor={id}>
      {label}
      {hint && <span className="label-hint">{hint}</span>}
    </label>
    <input
      id={id}
      type="number"
      min={min}
      max={max}
      value={value || ''}
      onChange={(e) => onChange(Number(e.target.value))}
    />
    {tooltip && <div className="input-tooltip-text" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '1.4' }}>{tooltip}</div>}
  </div>
);
