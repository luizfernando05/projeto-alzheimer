import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Patient from './Patient';
import { Prediction } from './Prediction';

@Entity('medicaldatas')
export class MedicalData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer', nullable: false })
  bmi: number;

  @Column({ name: 'sleep_quality', type: 'integer', nullable: false })
  sleepQuality: number;

  @Column({ name: 'cholesterol_ldl', type: 'float', nullable: false })
  cholesterolLdl: number;

  @Column({ name: 'cholesterol_hdl', type: 'float', nullable: false })
  cholesterolHdl: number;

  @Column({ name: 'cholesterol_triglycerides', type: 'float', nullable: false })
  cholesterolTriglycerides: number;

  @Column({ type: 'integer', nullable: false })
  mmse: number;

  @Column({ name: 'functional_assessment', type: 'integer', nullable: false })
  functionalAssessment: number;

  @Column({ name: 'memory_complaints', type: 'boolean', nullable: false })
  memoryComplaints: boolean;

  @Column({ name: 'behavioral_problems', type: 'boolean', nullable: false })
  behavioralProblems: boolean;

  @Column({ type: 'integer', nullable: false })
  adl: number;

  @Column({ name: 'date_exam', type: 'date', nullable: false })
  dateExam: Date;

  @Column({ type: 'boolean', nullable: true })
  smoking: boolean;

  @Column({ name: 'alcohol_consumption', type: 'integer', nullable: true })
  alcoholConsumption: number;

  @Column({ name: 'physical_activity', type: 'integer', nullable: true })
  physicalActivity: number;

  @Column({ name: 'diet_quality', type: 'integer', nullable: true })
  dietQuality: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ name: 'family_history', type: 'boolean', nullable: true })
  familyHistory: boolean;

  @Column({ name: 'cardiovascular_disease', type: 'boolean', nullable: true })
  cardiovascularDisease: boolean;

  @Column({ type: 'boolean', nullable: true })
  diabetes: boolean;

  @Column({ type: 'boolean', nullable: true })
  depression: boolean;

  @Column({ name: 'head_trauma', type: 'boolean', nullable: true })
  headTrauma: boolean;

  @Column({ type: 'boolean', nullable: true })
  hypertension: boolean;

  @Column({ type: 'boolean', nullable: true })
  confusion: boolean;

  @Column({ type: 'boolean', nullable: true })
  disorientation: boolean;

  @Column({ name: 'personality_changes', type: 'boolean', nullable: true })
  personalityChanges: boolean;

  @Column({
    name: 'difficulty_completing_tasks',
    type: 'boolean',
    nullable: true,
  })
  difficultyCompletingTasks: boolean;

  @Column({ type: 'boolean', nullable: true })
  forgetfulness: boolean;

  @Column({ type: 'float', nullable: true })
  systolicBP: number;

  @Column({ name: 'DiastolicBP', type: 'float', nullable: true })
  diastolicBP: number;

  @Column({ name: 'cholesterol_total', type: 'float', nullable: true })
  cholesterolTotal: number;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patientId: Patient;

  @OneToMany(() => Prediction, (prediction) => prediction.medicalData)
  predictions: Prediction[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default MedicalData;
