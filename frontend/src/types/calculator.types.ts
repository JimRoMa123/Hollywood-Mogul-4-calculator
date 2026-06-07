export type CastMember = {
  name: string;
  salary: number;
  sexAppeal: number;
  screenPresence: number;
  humility: number;
  age: number;
};

export type MovieFormData = {
  movieTitle: string;
  budget: number;
  marketingBudget: number;
  studioCash: number;
  genre: string;
  subgenre: string;
  pace: number;
  plotTwists: number;
  subplots: number;
  storyScope: number;
  charDevelopment: number;
  vfxBudgetPct: number;
  creatureFxPct: number;
  stuntsPct: number;
  setDesignPct: number;
  dirPerfectionism: number;
  dirScriptFidelity: number;
  dirOnBudget: number;
  dirEffects: number;
  castData: CastMember[];
  hasNudity: boolean;
  hasAdditionalVillains: boolean;
  distributionMode: string;
  franchiseMode: boolean;
  franchiseMomentum: number;
};

export type AlertItem = {
  level: 'critical' | 'warning' | 'info';
  message: string;
  code: string;
};

export type Recommendation = {
  category: string;
  action: 'ACCEPT' | 'DENY' | 'WARNING' | 'OPTIMIZE';
  message: string;
};

export type CalculationResult = {
  id: string;
  movieTitle?: string;
  fbp: number;
  iab: number;
  vrc: number;
  vrcMin: number;
  vrcMax: number;
  riskLabel: string;
  budget: number;
  marketingBudget: number;
  criticalBreakdown: Record<string, number>;
  projectedBoxOffice: number;
  projectedCostOverrun: number;
  marketingEfficiencyPoint: number;
  lightningInBottle: boolean;
  bankruptcyRisk: boolean;
  alerts: AlertItem[];
  recommendations: Recommendation[];
};

export type HistoryItem = {
  id: string;
  createdAt: string;
  movieTitle: string;
  genre: string;
  budget: number;
  marketingBudget: number;
  fbp: number;
  iab: number;
  vrc: number;
  riskLabel: string;
};
