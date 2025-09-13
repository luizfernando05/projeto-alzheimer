import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { MedicalData } from './MedicalData';

@Entity('predictions')
export class Prediction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  prediction_result: string;

  @Column({ type: 'float' })
  confidence_score: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ManyToOne(() => MedicalData, (medicalData) => medicalData.predictions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'medical_data_id' })
  medicalData: MedicalData;
}
