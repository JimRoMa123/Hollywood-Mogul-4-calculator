import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export interface CastMember {
  name: string;
  salary: number;
  sexAppeal: number;
  screenPresence: number;
  humility: number;
  age: number;
}

export interface AlertItem {
  level: 'critical' | 'warning' | 'info';
  message: string;
  code: string;
}

export interface Recommendation {
  category: string;
  action: 'ACCEPT' | 'DENY' | 'WARNING' | 'OPTIMIZE';
  message: string;
}

@Entity('calculations')
export class Calculation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  movieTitle: string;

  // Macro Finanzas
  @Column({ type: 'bigint' })
  budget: number;

  @Column({ type: 'bigint' })
  marketingBudget: number;

  @Column({ type: 'bigint' })
  studioCash: number;

  // Genoma Narrativo
  @Column()
  genre: string;

  @Column({ nullable: true })
  subgenre: string;

  @Column({ type: 'smallint' })
  pace: number;

  @Column({ type: 'smallint' })
  plotTwists: number;

  @Column({ type: 'smallint' })
  subplots: number;

  @Column({ type: 'smallint' })
  storyScope: number;

  @Column({ type: 'smallint' })
  charDevelopment: number;

  // Atributos Técnicos (% del budget)
  @Column({ type: 'smallint', default: 0 })
  vfxBudgetPct: number;

  @Column({ type: 'smallint', default: 0 })
  creatureFxPct: number;

  @Column({ type: 'smallint', default: 0 })
  stuntsPct: number;

  @Column({ type: 'smallint', default: 0 })
  setDesignPct: number;

  // Director
  @Column({ type: 'smallint' })
  dirPerfectionism: number;

  @Column({ type: 'smallint' })
  dirScriptFidelity: number;

  @Column({ type: 'smallint' })
  dirOnBudget: number;

  @Column({ type: 'smallint' })
  dirEffects: number;

  // Cast
  @Column({ type: 'jsonb', default: [] })
  castData: CastMember[];

  // Flags
  @Column({ default: false })
  hasNudity: boolean;

  @Column({ default: false })
  hasAdditionalVillains: boolean;

  @Column({ default: 'cinema' })
  distributionMode: string; // 'cinema' | 'streaming' | 'presale'

  @Column({ default: false })
  franchiseMode: boolean;

  @Column({ type: 'smallint', default: 0 })
  franchiseMomentum: number;

  // Outputs
  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  fbp: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  iab: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  vrc: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  vrcMin: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  vrcMax: number;

  @Column({ type: 'varchar', default: 'MEDIO' })
  riskLabel: string;

  @Column({ type: 'jsonb', default: [] })
  alerts: AlertItem[];

  @Column({ type: 'jsonb', default: [] })
  recommendations: Recommendation[];

  @Column({ type: 'numeric', precision: 15, scale: 2, default: 0 })
  projectedBoxOffice: number;

  @Column({ type: 'numeric', precision: 15, scale: 2, default: 0 })
  projectedCostOverrun: number;
}
