import React from 'react';

const STEPS = [
  { num: 1, label: 'Setup', icon: '🎬' },
  { num: 2, label: 'Finanzas', icon: '💰' },
  { num: 3, label: 'Story', icon: '🎭' },
  { num: 4, label: 'Rating', icon: '⚖️' },
  { num: 5, label: 'Roles', icon: '👥' },
  { num: 6, label: 'Writer', icon: '✍️' },
  { num: 7, label: 'Talento', icon: '🎥' },
  { num: 8, label: 'Producción', icon: '🔧' },
  { num: 9, label: 'Soundtrack', icon: '🎵' },
  { num: 10, label: 'Marketing', icon: '🌐' },
];

interface Props {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const StepProgress: React.FC<Props> = ({ currentStep, onStepClick }) => (
  <div className="step-progress-wrapper">
    <div className="step-progress">
      {STEPS.map(({ num, label, icon }) => (
        <div
          key={num}
          className={`step-item ${num === currentStep ? 'current' : ''} ${num < currentStep ? 'completed' : ''}`}
          onClick={() => onStepClick(num)}
          role="button"
          tabIndex={0}
        >
          <div className="step-circle">
            {num < currentStep ? '✓' : icon}
          </div>
          <span className="step-label">{label}</span>
        </div>
      ))}
    </div>
  </div>
);
