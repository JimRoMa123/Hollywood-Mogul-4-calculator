import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CastMemberDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  sexAppeal: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  screenPresence: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  humility: number;

  @IsNumber()
  @Min(18)
  @Max(90)
  age: number;
}

export class CalculateMovieDto {
  @IsString()
  @IsOptional()
  movieTitle?: string;

  // Macro Finanzas
  @IsNumber()
  @Min(0)
  budget: number;

  @IsNumber()
  @Min(0)
  marketingBudget: number;

  @IsNumber()
  @Min(0)
  studioCash: number;

  // Genoma Narrativo
  @IsString()
  genre: string;

  @IsString()
  @IsOptional()
  subgenre?: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  pace: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  plotTwists: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  subplots: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  storyScope: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  charDevelopment: number;

  // Atributos Técnicos
  @IsNumber()
  @Min(0)
  @Max(100)
  vfxBudgetPct: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  creatureFxPct: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  stuntsPct: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  setDesignPct: number;

  // Director
  @IsNumber()
  @Min(1)
  @Max(100)
  dirPerfectionism: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  dirScriptFidelity: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  dirOnBudget: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  dirEffects: number;

  // Cast
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CastMemberDto)
  castData: CastMemberDto[];

  // Flags
  @IsBoolean()
  hasNudity: boolean;

  @IsBoolean()
  hasAdditionalVillains: boolean;

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
}
