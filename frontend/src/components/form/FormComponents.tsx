import React from 'react';

interface SliderProps {
  label: string;
  hint?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  id: string;
}

export const Slider: React.FC<SliderProps> = ({
  label, hint, value, min = 1, max = 100, onChange, id,
}) => (
  <div className="slider-group">
    <div className="slider-label-row">
      <label htmlFor={id} style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
        {label}
        {hint && <span className="label-hint">{hint}</span>}
      </label>
      <span className="slider-value">{value}</span>
    </div>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </div>
);

interface MoneyInputProps {
  label: string;
  hint?: string;
  value: number;
  onChange: (val: number) => void;
  id: string;
}

export const MoneyInput: React.FC<MoneyInputProps> = ({ label, hint, value, onChange, id }) => (
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
    {value > 0 && (
      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        = ${(value / 1e6).toFixed(1)}M USD
      </span>
    )}
  </div>
);

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
