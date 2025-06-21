import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Patient from './Patient';

@Entity('medicalDatas')
export class MedicalData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'number', nullable: false })
  bmi: number;

  @Column({ type: 'boolean', nullable: false })
  sleep_quality: boolean;

  @Column({ type: 'number', nullable: false })
  cholesterol_ldl: number;

  @Column({ type: 'number', nullable: false })
  cholesterol_hdl: number;

  @Column({ type: 'number', nullable: false })
  cholesterol_triglycerides: number;

  @Column({ type: 'number', nullable: false })
  mmse: number;

  @Column({ type: 'number', nullable: false })
  functional_assessment: number;

  @Column({ type: 'boolean', nullable: false })
  memory_complaints: boolean;

  @Column({ type: 'boolean', nullable: false })
  behavioral_problems: boolean;

  @Column({ type: 'number', nullable: false })
  adl: number;

  @Column({ type: 'date', nullable: false })
  date_exam: Date;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patientId: Patient;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default MedicalData;
