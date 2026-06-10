import { useState } from 'react';
import type { MovieFormData, CalculationResult } from './types/calculator.types';
import { StepProgress } from './components/layout/StepProgress';
import { Step1ProjectSetup } from './components/form/Step1_ProjectSetup';
import { Step2Finances } from './components/form/Step2_Finances';
import { Step3Storytelling } from './components/form/Step3_Storytelling';
import { Step4MovieRating } from './components/form/Step4_MovieRating';
import { Step5Roles } from './components/form/Step5_Roles';
import { Step6Writer } from './components/form/Step6_Writer';
import { Step7DirectorAndTalent } from './components/form/Step7_DirectorAndTalent';
import { Step8Production } from './components/form/Step8_Production';
import { Step9SoundtrackAndRuntime } from './components/form/Step9_SoundtrackAndRuntime';
import { Step10MarketingAndDistribution } from './components/form/Step10_MarketingAndDistribution';
import { ResultsDashboard } from './components/results/ResultsDashboard';
import { HistoryList } from './components/history/HistoryList';
import { calculateMovie } from './api/calculatorApi';
import { calculateLiveMetrics } from './utils/calculatorEngine';

const TOTAL_STEPS = 10;

const DEFAULT_FORM: MovieFormData = {
  // Step 1: Project Setup
  projectType: 'Movie',
  releaseType: 'Theatrical Release',
  productionType: 'Live Action',
  franchiseQualified: false,
  franchise: false,
  universe: '',

  // Step 2: Finances
  movieTitle: '',
  budget: 20000000,
  marketingBudget: 4000000,
  studioCash: 60000000,

  // Step 3: Storytelling
  productionGenre: '',
  genre: '',
  subgenre: '',
  isMusical: false,
  hasCreatures: false,
  storyScope: 3,
  charDevelopment: 3,
  intelligence: 3,
  dialogue: 3,
  pace: 3,
  plotTwists: 3,
  subplots: 3,
  era: 'Present Day',
  additionalVillain: 'None',
  storyEnding: 'Happy',
  basedOnTrueStory: false,
  primaryAudience: '',
  secondaryAudience: '',

  // Step 4: Movie Rating
  movieRating: {
    parentalGuidanceAge: 0,
    language: 1,
    violence: 1,
    sensuality: 1,
    fear: 1,
    jumpScares: 1,
    gore: 1,
    controversy: 1,
  },

  // Step 5: Roles
  roles: [{
    roleType: 'Main Character',
    roleDifficulty: 3,
    species: 'Human',
    gender: 'Male',
    characterDies: false,
    descriptor: '',
    characterAge: 30,
    characterName: '',
    performanceType: 'Live Action',
    performanceFocus: 'Action',
    persona: 'Average',
    stunts: 1,
    makeUpEffects: 1,
    loveScenes: 1,
    characterDescription: '',
  }],

  // Step 6: Writer
  writer: {
    name: '',
    salary: 500000,
    age: 35,
    storyScopeDepth: 3,
    characterDevelopment: 3,
    intelligence: 3,
    dialogue: 3,
    pace: 3,
    timeToCompleteMonths: 4,
  },

  // Step 7: Director + Talent
  director: {
    name: '',
    salary: 2000000,
    age: 40,
    actionSkill: 3,
    comedySkill: 3,
    dramaSkill: 3,
    authority: 3,
    storySense: 3,
    epicStorySense: 3,
    onBudget: 3,
    genreSpecialty: 'None',
    genreProficiency: 3,
    effects: 3,
    perfectionist: 3,
    scriptAsWritten: 3,
    minBudgetRequirement: 0,
    finalCut: false,
  },
  castData: [],

  // Step 8: Production
  preProduction: {
    costumeDesignTeamRating: 3,
    costumeDesignTeamCost: 1200000,
    costumeDesign: 3,
    costumeDesignMonths: 1,
    setDesignTeamRating: 3,
    setDesignTeamCost: 1200000,
    setDesign: 3,
    setDesignMonths: 1,
  },
  productionCrew: {
    filmType: 'Color',
    crewRating: 3,
    crewCost: 6000000,
    crewMonths: 1,
    stuntTeamRating: 3,
    stuntTeamCost: 1800000,
    stunts: 1,
    stuntMonths: 0,
    makeUpDesignTeamRating: 3,
    makeUpDesignTeamCost: 0,
    makeUpEffects: 1,
    makeUpMonths: 0,
    practicalEffectsCompanyRating: 3,
    practicalEffectsCost: 0,
    practicalEffects: 1,
    practicalEffectsMonths: 0,
    creatureEffectsCompanyRating: 3,
    creatureEffectsCost: 0,
    creatureEffects: 1,
    creatureEffectsMonths: 0,
  },
  postProduction: {
    postProductionTeamRating: 3,
    postProductionTeamCost: 3000000,
    editingMonths: 1,
    vfxCompanyRating: 3,
    vfxCompanyCost: 0,
    visualEffects: 1,
    vfxMonths: 0,
  },

  // Step 9: Soundtrack & Runtime
  soundtrack: {
    hasSoundtrack: false,
    recordingArtistStature: 3,
    tracks: Array(12).fill(''),
    musicClearanceRights: 0,
    recordCompanyPercent: 0,
  },
  runningTimeMinutes: 120,

  // Step 10: Marketing & Distribution
  distributionMode: 'cinema',
  franchiseMode: false,
  franchiseMomentum: 0,
  hasNudity: false,
  hasAdditionalVillains: false,
  marketingCampaign: {
    globalFocus: 'None',
    markets: [
      { marketName: 'Domestic (USA)', focus: 'None', televisionAds: 0, deviceVideoAds: 0, deviceBannerAds: 0, events: 0, crossPromotions: 0 },
      { marketName: 'UK & Ireland', focus: 'None', televisionAds: 0, deviceVideoAds: 0, deviceBannerAds: 0, events: 0, crossPromotions: 0 },
      { marketName: 'Europe', focus: 'None', televisionAds: 0, deviceVideoAds: 0, deviceBannerAds: 0, events: 0, crossPromotions: 0 },
      { marketName: 'Asia Pacific', focus: 'None', televisionAds: 0, deviceVideoAds: 0, deviceBannerAds: 0, events: 0, crossPromotions: 0 },
      { marketName: 'Latin America', focus: 'None', televisionAds: 0, deviceVideoAds: 0, deviceBannerAds: 0, events: 0, crossPromotions: 0 },
    ],
  },
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
            {metrics.warnings.map((warn: string, i: number) => (
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
      setStep(TOTAL_STEPS + 1); // results view
    } catch (e: any) {
      if (e.response && e.response.status === 400 && e.response.data && Array.isArray(e.response.data.message)) {
        setError('Errores de validación:\n' + e.response.data.message.join('\n'));
      } else {
        setError('Error al conectar con el servidor. ¿Está corriendo el backend en puerto 3001?');
      }
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

  const isResultsView = step > TOTAL_STEPS;

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
          <div className={!isResultsView ? "calculator-layout" : ""}>
            <div className={!isResultsView ? "calculator-form-side" : ""}>
              {!isResultsView && (
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
                  <strong>🚨 Error:</strong>
                  {error.includes('\n') ? (
                    <ul style={{ marginTop: 8, paddingLeft: 20, lineHeight: 1.6, textAlign: 'left' }}>
                      {error.split('\n').slice(1).map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  ) : (
                    <span> {error}</span>
                  )}
                </div>
              )}

              {step === 1 && (
                <Step1ProjectSetup data={form} onChange={updateForm} onNext={() => setStep(2)} />
              )}
              {step === 2 && (
                <Step2Finances data={form} onChange={updateForm}
                  onNext={() => setStep(3)} onBack={() => setStep(1)} />
              )}
              {step === 3 && (
                <Step3Storytelling data={form} onChange={updateForm}
                  onNext={() => setStep(4)} onBack={() => setStep(2)} />
              )}
              {step === 4 && (
                <Step4MovieRating data={form} onChange={updateForm}
                  onNext={() => setStep(5)} onBack={() => setStep(3)} />
              )}
              {step === 5 && (
                <Step5Roles data={form} onChange={updateForm}
                  onNext={() => setStep(6)} onBack={() => setStep(4)} />
              )}
              {step === 6 && (
                <Step6Writer data={form} onChange={updateForm}
                  onNext={() => setStep(7)} onBack={() => setStep(5)} />
              )}
              {step === 7 && (
                <Step7DirectorAndTalent data={form} onChange={updateForm}
                  onNext={() => setStep(8)} onBack={() => setStep(6)} />
              )}
              {step === 8 && (
                <Step8Production data={form} onChange={updateForm}
                  onNext={() => setStep(9)} onBack={() => setStep(7)} />
              )}
              {step === 9 && (
                <Step9SoundtrackAndRuntime data={form} onChange={updateForm}
                  onNext={() => setStep(10)} onBack={() => setStep(8)} />
              )}
              {step === 10 && (
                <Step10MarketingAndDistribution data={form} onChange={updateForm}
                  onSubmit={handleSubmit} onBack={() => setStep(9)} loading={loading} />
              )}
            </div>

            {!isResultsView && (
              <div className="calculator-preview-side">
                <LivePreview form={form} />
              </div>
            )}

            {isResultsView && result && (
              <ResultsDashboard result={result} onRecalculate={handleRecalculate} />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
