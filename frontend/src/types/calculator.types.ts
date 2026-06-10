// ===== Star rating type (1-5 like in game) =====
export type StarRating = 1 | 2 | 3 | 4 | 5;

// ===== Role / Character =====
export type RoleData = {
  roleType: 'Main Character' | 'Supporting' | 'Antagonist' | 'Cameo';
  roleDifficulty: StarRating;
  species: 'Human' | 'Alien' | 'Robot' | 'Animal' | 'Other';
  gender: 'Male' | 'Female' | 'Non-Binary';
  characterDies: boolean;
  descriptor: string;
  characterAge: number;
  characterName: string;
  performanceType: 'Live Action' | 'Animation' | 'Motion Capture';
  performanceFocus: string;
  persona: string;
  stunts: StarRating;
  makeUpEffects: StarRating;
  loveScenes: StarRating;
  characterDescription: string;
};

// ===== Writer =====
export type WriterData = {
  name: string;
  salary: number;
  age: number;
  storyScopeDepth: StarRating;
  characterDevelopment: StarRating;
  intelligence: StarRating;
  dialogue: StarRating;
  pace: StarRating;
  timeToCompleteMonths: number;
};

// ===== Director (expanded) =====
export type DirectorData = {
  name: string;
  salary: number;
  age: number;
  // Genre skills
  actionSkill: StarRating;
  comedySkill: StarRating;
  dramaSkill: StarRating;
  // Director-specific attributes
  authority: StarRating;
  storySense: StarRating;
  epicStorySense: StarRating;
  onBudget: StarRating;
  genreSpecialty: string;
  genreProficiency: StarRating;
  effects: StarRating;
  perfectionist: StarRating;
  scriptAsWritten: StarRating;
  // Meta
  minBudgetRequirement: number;
  finalCut: boolean;
};

// ===== Cast Member (expanded) =====
export type CastMember = {
  name: string;
  salary: number;
  age: number;
  // Genre acting skills
  actionSkill: StarRating;
  comedySkill: StarRating;
  dramaSkill: StarRating;
  singSkill: StarRating;
  danceSkill: StarRating;
  // Core attributes
  screenPresence: StarRating;
  sexAppeal: StarRating;
  humility: StarRating;
  perfectionist: StarRating;
  scriptAsWritten: StarRating;
  // Meta
  persona: string;
  payOrPlay: boolean;
  points: number; // backend points %
  bestKnownAs: 'Actor' | 'Director' | 'Writer';
  wantsToTry: string;
};

// ===== Pre-Production =====
export type PreProductionData = {
  costumeDesignTeamRating: StarRating;
  costumeDesignTeamCost: number;
  costumeDesign: StarRating;
  costumeDesignMonths: number;
  setDesignTeamRating: StarRating;
  setDesignTeamCost: number;
  setDesign: StarRating;
  setDesignMonths: number;
};

// ===== Production Crew =====
export type ProductionCrewData = {
  filmType: 'Color' | 'Black & White';
  crewRating: StarRating;
  crewCost: number;
  crewMonths: number;
  stuntTeamRating: StarRating;
  stuntTeamCost: number;
  stunts: StarRating;
  stuntMonths: number;
  makeUpDesignTeamRating: StarRating;
  makeUpDesignTeamCost: number;
  makeUpEffects: StarRating;
  makeUpMonths: number;
  practicalEffectsCompanyRating: StarRating;
  practicalEffectsCost: number;
  practicalEffects: StarRating;
  practicalEffectsMonths: number;
  creatureEffectsCompanyRating: StarRating;
  creatureEffectsCost: number;
  creatureEffects: StarRating;
  creatureEffectsMonths: number;
};

// ===== Post-Production =====
export type PostProductionData = {
  postProductionTeamRating: StarRating;
  postProductionTeamCost: number;
  editingMonths: number;
  vfxCompanyRating: StarRating;
  vfxCompanyCost: number;
  visualEffects: StarRating;
  vfxMonths: number;
};

// ===== Sound Track =====
export type SoundTrackData = {
  hasSoundtrack: boolean;
  recordingArtistStature: StarRating;
  tracks: string[]; // up to 12 tracks
  musicClearanceRights: number;
  recordCompanyPercent: number;
};

// ===== Marketing Campaign =====
export type MarketData = {
  marketName: string;
  focus: string;
  televisionAds: number;
  deviceVideoAds: number;
  deviceBannerAds: number;
  events: number;
  crossPromotions: number;
};

export type MarketingCampaign = {
  globalFocus: string;
  markets: MarketData[];
};

// ===== Movie Rating =====
export type MovieRatingData = {
  parentalGuidanceAge: 0 | 5 | 7 | 10 | 13 | 17;
  language: StarRating;
  violence: StarRating;
  sensuality: StarRating;
  fear: 1 | 2 | 3;
  jumpScares: 1 | 2 | 3;
  gore: 1 | 2 | 3;
  controversy: 1 | 2 | 3;
};

// ===== Main Form Data =====
export type MovieFormData = {
  // Step 1: Project Setup
  projectType: 'Movie' | 'Series';
  releaseType: 'Theatrical Release' | 'Streaming' | 'Direct-to-Video';
  productionType: 'Live Action' | 'Animation' | 'Stop Motion';
  franchiseQualified: boolean;
  franchise: boolean;
  universe: string;

  // Step 2: Macro Finances
  movieTitle: string;
  budget: number;
  marketingBudget: number;
  studioCash: number;

  // Step 3: Storytelling Attributes (expanded)
  productionGenre: string;
  genre: string;
  subgenre: string;
  isMusical: boolean;
  hasCreatures: boolean;
  storyScope: StarRating;
  charDevelopment: StarRating;
  intelligence: StarRating;
  dialogue: StarRating;
  pace: StarRating;
  plotTwists: StarRating;
  subplots: StarRating;
  era: string;
  additionalVillain: string;
  storyEnding: string;
  basedOnTrueStory: boolean;
  primaryAudience: string;
  secondaryAudience: string;

  // Step 4: Movie Rating
  movieRating: MovieRatingData;

  // Step 5: Roles
  roles: RoleData[];

  // Step 6: Writer
  writer: WriterData;

  // Step 7: Director + Talent
  director: DirectorData;
  castData: CastMember[];

  // Step 8: Production
  preProduction: PreProductionData;
  productionCrew: ProductionCrewData;
  postProduction: PostProductionData;

  // Step 9: Soundtrack & Runtime
  soundtrack: SoundTrackData;
  runningTimeMinutes: number;

  // Step 10: Marketing & Distribution
  distributionMode: string;
  franchiseMode: boolean;
  franchiseMomentum: number;
  hasNudity: boolean;
  hasAdditionalVillains: boolean;
  marketingCampaign: MarketingCampaign;
};

// ===== Results =====
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

export type ProductionCostBreakdown = {
  preProductionCost: number;
  productionCost: number;
  postProductionCost: number;
  talentCost: number;
  marketingCost: number;
  totalCost: number;
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
  costBreakdown?: ProductionCostBreakdown;
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

// ===== Constants =====
export const GENRES = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy',
  'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy',
  'Film Noir', 'Historical', 'Horror', 'Independent', 'Musical',
  'Mystery', 'Romance', 'Science Fiction', 'Sports', 'Superhero',
  'Thriller', 'War Drama', 'Western', 'Blockbuster',
];

export const ERAS = [
  'Present Day', '1920s', '1930s', '1940s', '1950s', '1960s',
  '1970s', '1980s', '1990s', '2000s', '2010s', '2020s',
  'Medieval', 'Ancient', 'Victorian', 'Future', 'Alternate Timeline',
];

export const AUDIENCE_SEGMENTS = [
  'Males, Age 12 to 17', 'Males, Age 18 to 24', 'Males, Age 25 to 34',
  'Males, Age 35 to 49', 'Males, Age 50+',
  'Females, Age 12 to 17', 'Females, Age 18 to 24', 'Females, Age 25 to 34',
  'Females, Age 35 to 49', 'Females, Age 50+',
  'All Ages', 'Family',
];

export const MARKETING_FOCUS_OPTIONS = [
  'None', 'Anticipation/Buzz', 'Broad Marketing', 'The Cast',
  'A Cinematic Event', 'A Date Movie', 'The Director', 'Family Event',
  'Franchise Building', 'The Movie Stars', 'The Plot',
  'Universe Building', 'The Visual Effects',
];

export const PERSONA_OPTIONS = [
  'Annoying', 'Average', 'Charismatic', 'Difficult', 'Easy Going',
  'Egotistical', 'Humble', 'Inspiring', 'Intense', 'Pleasant',
  'Professional', 'Temperamental', 'Unpredictable',
];

export const ADDITIONAL_VILLAIN_OPTIONS = [
  'None', 'Weather', 'Fire', 'Insect Infestations',
  'Equipment Failure', 'Location Problems',
];
