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
import { calculateLiveMetrics } from './utils/calculatorEngine';

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

const getFbpColor = (fbp: number) => {
  if (fbp >= 60) return 'var(--green-success)';
  if (fbp >= 40) return 'var(--orange-warn)';
  return 'var(--red-danger)';
};

const getIabColor = (iab: number) => {
  if (iab >= 60) return 'var(--blue-info)';
  if (iab >= 40) return 'var(--purple-accent)';
  return 'var(--red-danger)';
};

function LivePreview({ form }: { form: MovieFormData }) {
  const metrics = calculateLiveMetrics(form);

  return (
    <div className="preview-card" style={{ animation: 'fadeInUp 0.5s ease' }}>
      <h3>🔮 Predictores en Vivo</h3>
      <div className="preview-subtitle">Indicadores en tiempo real</div>

      <div className="preview-metrics-list">
        {/* FBP */}
        <div className="preview-metric-item fbp">
          <div className="preview-metric-header">
            <span className="preview-metric-title">FBP (Viabilidad Financiera)</span>
            <span className="preview-metric-value">{metrics.fbp}%</span>
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{
                width: `${metrics.fbp}%`,
                background: getFbpColor(metrics.fbp),
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* IAB */}
        <div className="preview-metric-item iab">
          <div className="preview-metric-header">
            <span className="preview-metric-title">IAB (Aclamación Crítica)</span>
            <span className="preview-metric-value">{metrics.iab}%</span>
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{
                width: `${metrics.iab}%`,
                background: getIabColor(metrics.iab),
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Risk / VRC */}
        <div className="preview-metric-item">
          <div className="preview-metric-header" style={{ marginBottom: 4 }}>
            <span className="preview-metric-title">Riesgo (VRC)</span>
            <span className={`risk-badge ${metrics.riskLabel}`}>{metrics.riskLabel}</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Volatilidad estimada: <strong>{metrics.vrc}%</strong>
          </div>
        </div>

        {/* Projected Box Office */}
        <div className="preview-metric-item" style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
          <div className="preview-metric-header">
            <span className="preview-metric-title">Taquilla Proyectada</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--gold)' }}>
              ${(metrics.projectedBoxOffice / 1e6).toFixed(1)}M
            </span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Punto de eficiencia publicitaria: <strong>${(metrics.marketingEfficiencyPoint / 1e6).toFixed(1)}M</strong>
          </div>
        </div>
      </div>

      {/* Real-time warnings */}
      <div className="preview-warnings">
        <div className="preview-warnings-title">Alertas Predictivas ({metrics.warnings.length})</div>
        {metrics.warnings.length > 0 ? (
          <div className="preview-warnings-list">
            {metrics.warnings.map((warn, i) => (
              <div className="preview-warning-item" key={i}>
                {warn}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '0.74rem', color: 'var(--green-success)' }}>
            ✅ Configuración equilibrada. Sin alertas de riesgo.
          </div>
        )}
      </div>
    </div>
  );
}

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
          <div className={step < 6 ? "calculator-layout" : ""}>
            <div className={step < 6 ? "calculator-form-side" : ""}>
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
            </div>

            {step < 6 && (
              <div className="calculator-preview-side">
                <LivePreview form={form} />
              </div>
            )}

            {step === 6 && result && (
              <ResultsDashboard result={result} onRecalculate={handleRecalculate} />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
