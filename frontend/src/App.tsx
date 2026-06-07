import { useState } from 'react';
import { MovieFormData, CalculationResult } from './types/calculator.types';
import { StepProgress } from './components/layout/StepProgress';
import { Step1Finances } from './components/form/Step1_Finances';
import { Step2Narrative } from './components/form/Step2_Narrative';
import { Step3Technical } from './components/form/Step3_Technical';
import { Step4Talent } from './components/form/Step4_Talent';
import { Step5Distribution } from './components/form/Step5_Distribution';
import { ResultsDashboard } from './components/results/ResultsDashboard';
import { HistoryList } from './components/history/HistoryList';
import { calculateMovie } from './api/calculatorApi';

const DEFAULT_FORM: MovieFormData = {
  movieTitle: '',
  budget: 20000000,
  marketingBudget: 4000000,
  studioCash: 60000000,
  genre: '',
  subgenre: '',
  pace: 50,
  plotTwists: 50,
  subplots: 40,
  storyScope: 50,
  charDevelopment: 50,
  vfxBudgetPct: 15,
  creatureFxPct: 5,
  stuntsPct: 5,
  setDesignPct: 10,
  dirPerfectionism: 60,
  dirScriptFidelity: 60,
  dirOnBudget: 60,
  dirEffects: 50,
  castData: [],
  hasNudity: false,
  hasAdditionalVillains: false,
  distributionMode: 'cinema',
  franchiseMode: false,
  franchiseMomentum: 0,
};

type View = 'calculator' | 'history';

function App() {
  const [view, setView] = useState<View>('calculator');
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<MovieFormData>(DEFAULT_FORM);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateForm = (updates: Partial<MovieFormData>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await calculateMovie(form);
      setResult(res);
      setStep(6); // results view
    } catch (e) {
      setError('Error al conectar con el servidor. ¿Está corriendo el backend en puerto 3001?');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRecalculate = () => {
    setResult(null);
    setStep(1);
    setForm(DEFAULT_FORM);
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="header-logo">
            <div className="logo-icon">🎬</div>
            <div>
              <h1>HM4 Calculator</h1>
              <div className="header-subtitle">Hollywood Mogul 4 — Viability Engine</div>
            </div>
          </div>
          <nav className="header-nav">
            <button
              className={`nav-btn ${view === 'calculator' ? 'active' : ''}`}
              onClick={() => { setView('calculator'); }}
            >
              🎬 Calculadora
            </button>
            <button
              className={`nav-btn ${view === 'history' ? 'active' : ''}`}
              onClick={() => setView('history')}
            >
              📜 Historial
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="app-container">
        {view === 'history' ? (
          <div style={{ paddingTop: 32 }}>
            <HistoryList />
          </div>
        ) : (
          <>
            {step < 6 && (
              <StepProgress
                currentStep={step}
                onStepClick={(s) => s < step && setStep(s)}
              />
            )}

            {error && (
              <div style={{
                padding: '14px 18px', marginBottom: 20,
                background: 'var(--red-dim)',
                border: '1px solid rgba(255,61,87,0.4)',
                borderRadius: 'var(--radius-md)',
                color: '#ff8095', fontSize: '0.9rem',
              }}>
                🚨 {error}
              </div>
            )}

            {step === 1 && (
              <Step1Finances data={form} onChange={updateForm} onNext={() => setStep(2)} />
            )}
            {step === 2 && (
              <Step2Narrative data={form} onChange={updateForm}
                onNext={() => setStep(3)} onBack={() => setStep(1)} />
            )}
            {step === 3 && (
              <Step3Technical data={form} onChange={updateForm}
                onNext={() => setStep(4)} onBack={() => setStep(2)} />
            )}
            {step === 4 && (
              <Step4Talent data={form} onChange={updateForm}
                onNext={() => setStep(5)} onBack={() => setStep(3)} />
            )}
            {step === 5 && (
              <Step5Distribution data={form} onChange={updateForm}
                onSubmit={handleSubmit} onBack={() => setStep(4)} loading={loading} />
            )}
            {step === 6 && result && (
              <ResultsDashboard result={result} onRecalculate={handleRecalculate} />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
