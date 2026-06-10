import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MovieRatingDto {
  @IsNumber()
  @IsIn([0, 5, 7, 10, 13, 17])
  parentalGuidanceAge: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  language: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  violence: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  sensuality: number;

  @IsNumber()
  @Min(1)
  @Max(3)
  fear: number;

  @IsNumber()
  @Min(1)
  @Max(3)
  jumpScares: number;

  @IsNumber()
  @Min(1)
  @Max(3)
  gore: number;

  @IsNumber()
  @Min(1)
  @Max(3)
  controversy: number;
}

export class RoleDto {
  @IsString()
  @IsIn(['Main Character', 'Supporting', 'Antagonist', 'Cameo'])
  roleType: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  roleDifficulty: number;

  @IsString()
  @IsIn(['Human', 'Alien', 'Robot', 'Animal', 'Other'])
  species: string;

  @IsString()
  gender: string;

  @IsBoolean()
  characterDies: boolean;

  @IsString()
  @IsOptional()
  descriptor: string;

  @IsNumber()
  @Min(0)
  @Max(2000)
  characterAge: number;

  @IsString()
  characterName: string;

  @IsString()
  @IsIn(['Live Action', 'Animation', 'Motion Capture'])
  performanceType: string;

  @IsString()
  performanceFocus: string;

  @IsString()
  persona: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  stunts: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  makeUpEffects: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  loveScenes: number;

  @IsString()
  @IsOptional()
  characterDescription: string;
}

export class WriterDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsNumber()
  @Min(1)
  @Max(120)
  age: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  storyScopeDepth: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  characterDevelopment: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  intelligence: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  dialogue: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  pace: number;

  @IsNumber()
  @Min(0)
  timeToCompleteMonths: number;
}

export class DirectorDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsNumber()
  @Min(1)
  @Max(120)
  age: number;

  // Genre skills
  @IsNumber()
  @Min(1)
  @Max(5)
  actionSkill: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  comedySkill: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  dramaSkill: number;

  // Director-specific attributes
  @IsNumber()
  @Min(1)
  @Max(5)
  authority: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  storySense: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  epicStorySense: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  onBudget: number;

  @IsString()
  genreSpecialty: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  genreProficiency: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  effects: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  perfectionist: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  scriptAsWritten: number;

  // Meta
  @IsNumber()
  @Min(0)
  minBudgetRequirement: number;

  @IsBoolean()
  finalCut: boolean;
}

export class CastMemberDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsNumber()
  @Min(1)
  @Max(120)
  age: number;

  // Genre acting skills
  @IsNumber()
  @Min(1)
  @Max(5)
  actionSkill: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  comedySkill: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  dramaSkill: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  singSkill: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  danceSkill: number;

  // Core attributes
  @IsNumber()
  @Min(1)
  @Max(5)
  screenPresence: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  sexAppeal: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  humility: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  perfectionist: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  scriptAsWritten: number;

  // Meta
  @IsString()
  persona: string;

  @IsBoolean()
  payOrPlay: boolean;

  @IsNumber()
  @Min(0)
  @Max(100)
  points: number;

  @IsString()
  @IsIn(['Actor', 'Director', 'Writer'])
  bestKnownAs: string;

  @IsString()
  wantsToTry: string;
}

export class PreProductionDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  costumeDesignTeamRating: number;

  @IsNumber()
  @Min(0)
  costumeDesignTeamCost: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  costumeDesign: number;

  @IsNumber()
  @Min(0)
  costumeDesignMonths: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  setDesignTeamRating: number;

  @IsNumber()
  @Min(0)
  setDesignTeamCost: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  setDesign: number;

  @IsNumber()
  @Min(0)
  setDesignMonths: number;
}

export class ProductionCrewDto {
  @IsString()
  @IsIn(['Color', 'Black & White'])
  filmType: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  crewRating: number;

  @IsNumber()
  @Min(0)
  crewCost: number;

  @IsNumber()
  @Min(0)
  crewMonths: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  stuntTeamRating: number;

  @IsNumber()
  @Min(0)
  stuntTeamCost: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  stunts: number;

  @IsNumber()
  @Min(0)
  stuntMonths: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  makeUpDesignTeamRating: number;

  @IsNumber()
  @Min(0)
  makeUpDesignTeamCost: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  makeUpEffects: number;

  @IsNumber()
  @Min(0)
  makeUpMonths: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  practicalEffectsCompanyRating: number;

  @IsNumber()
  @Min(0)
  practicalEffectsCost: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  practicalEffects: number;

  @IsNumber()
  @Min(0)
  practicalEffectsMonths: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  creatureEffectsCompanyRating: number;

  @IsNumber()
  @Min(0)
  creatureEffectsCost: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  creatureEffects: number;

  @IsNumber()
  @Min(0)
  creatureEffectsMonths: number;
}

export class PostProductionDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  postProductionTeamRating: number;

  @IsNumber()
  @Min(0)
  postProductionTeamCost: number;

  @IsNumber()
  @Min(0)
  editingMonths: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  vfxCompanyRating: number;

  @IsNumber()
  @Min(0)
  vfxCompanyCost: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  visualEffects: number;

  @IsNumber()
  @Min(0)
  vfxMonths: number;
}

export class SoundTrackDto {
  @IsBoolean()
  hasSoundtrack: boolean;

  @IsNumber()
  @Min(1)
  @Max(5)
  recordingArtistStature: number;

  @IsArray()
  @IsString({ each: true })
  tracks: string[];

  @IsNumber()
  @Min(0)
  musicClearanceRights: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  recordCompanyPercent: number;
}

export class MarketDataDto {
  @IsString()
  marketName: string;

  @IsString()
  focus: string;

  @IsNumber()
  @Min(0)
  televisionAds: number;

  @IsNumber()
  @Min(0)
  deviceVideoAds: number;

  @IsNumber()
  @Min(0)
  deviceBannerAds: number;

  @IsNumber()
  @Min(0)
  events: number;

  @IsNumber()
  @Min(0)
  crossPromotions: number;
}

export class MarketingCampaignDto {
  @IsString()
  globalFocus: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MarketDataDto)
  markets: MarketDataDto[];
}

export class CalculateMovieDto {
  // Step 1: Project Setup
  @IsString()
  @IsIn(['Movie', 'Series'])
  projectType: 'Movie' | 'Series';

  @IsString()
  @IsIn(['Theatrical Release', 'Streaming', 'Direct-to-Video'])
  releaseType: 'Theatrical Release' | 'Streaming' | 'Direct-to-Video';

  @IsString()
  @IsIn(['Live Action', 'Animation', 'Stop Motion'])
  productionType: 'Live Action' | 'Animation' | 'Stop Motion';

  @IsBoolean()
  franchiseQualified: boolean;

  @IsBoolean()
  franchise: boolean;

  @IsString()
  universe: string;

  @IsString()
  @IsOptional()
  movieTitle?: string;

  // Step 2: Macro Finances
  @IsNumber()
  @Min(0)
  budget: number;

  @IsNumber()
  @Min(0)
  marketingBudget: number;

  @IsNumber()
  @Min(0)
  studioCash: number;

  // Step 3: Storytelling Attributes
  @IsString()
  productionGenre: string;

  @IsString()
  genre: string;

  @IsString()
  @IsOptional()
  subgenre?: string;

  @IsBoolean()
  isMusical: boolean;

  @IsBoolean()
  hasCreatures: boolean;

  @IsNumber()
  @Min(1)
  @Max(5)
  storyScope: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  charDevelopment: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  intelligence: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  dialogue: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  pace: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  plotTwists: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  subplots: number;

  @IsString()
  era: string;

  @IsString()
  additionalVillain: string;

  @IsString()
  storyEnding: string;

  @IsBoolean()
  basedOnTrueStory: boolean;

  @IsString()
  primaryAudience: string;

  @IsString()
  secondaryAudience: string;

  // Step 4: Movie Rating
  @ValidateNested()
  @Type(() => MovieRatingDto)
  movieRating: MovieRatingDto;

  // Step 5: Roles
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles: RoleDto[];

  // Step 6: Writer
  @ValidateNested()
  @Type(() => WriterDto)
  writer: WriterDto;

  // Step 7: Director + Talent
  @ValidateNested()
  @Type(() => DirectorDto)
  director: DirectorDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CastMemberDto)
  castData: CastMemberDto[];

  // Step 8: Production
  @ValidateNested()
  @Type(() => PreProductionDto)
  preProduction: PreProductionDto;

  @ValidateNested()
  @Type(() => ProductionCrewDto)
  productionCrew: ProductionCrewDto;

  @ValidateNested()
  @Type(() => PostProductionDto)
  postProduction: PostProductionDto;

  // Step 9: Soundtrack & Runtime
  @ValidateNested()
  @Type(() => SoundTrackDto)
  soundtrack: SoundTrackDto;

  @IsNumber()
  @Min(0)
  runningTimeMinutes: number;

  // Step 10: Marketing & Distribution
  @IsString()
  distributionMode: string;

  @IsBoolean()
  @IsOptional()
  franchiseMode?: boolean;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  franchiseMomentum?: number;

  @IsBoolean()
  hasNudity: boolean;

  @IsBoolean()
  hasAdditionalVillains: boolean;

  @ValidateNested()
  @Type(() => MarketingCampaignDto)
  marketingCampaign: MarketingCampaignDto;
}
