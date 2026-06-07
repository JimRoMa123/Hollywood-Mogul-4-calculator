import React from 'react';

interface Props {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const STEPS = [
  { label: '💰 Finanzas', short: '1' },
  { label: '🎭 Narrativo', short: '2' },
  { label: '🎬 Técnico', short: '3' },
  { label: '🎥 Talento', short: '4' },
  { label: '🌐 Distribución', short: '5' },
];

export const StepProgress: React.FC<Props> = ({ currentStep, onStepClick }) => {
  return (
    <div className="step-progress">
      {STEPS.map((step, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <React.Fragment key={stepNum}>
            <div className="step-item">
              <div className="step-dot">
                <div
                  className={`step-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => onStepClick(stepNum)}
                  role="button"
                  title={step.label}
                >
                  {isCompleted ? '✓' : stepNum}
                </div>
                <span className={`step-label ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                  {step.label}
                </span>
              </div>
            </div>
            {index < STEPS.length - 1 && (
              <div className={`step-connector ${isCompleted ? 'completed' : isActive ? 'active' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
