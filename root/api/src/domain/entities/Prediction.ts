import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { MedicalData } from './MedicalData';
import { PredictionResult } from '../../modules/prediction/types/PredictionTypes';

@Entity('predictions')
export class Prediction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'prediction_result', type: 'varchar' })
  prediction_result: PredictionResult;

  @Column({ name: 'confidence_score', type: 'float' })
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
