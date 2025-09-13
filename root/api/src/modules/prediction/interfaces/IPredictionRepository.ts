import { Prediction } from '../../../domain/entities/Prediction';

export interface IPredictionRepository {
  create(predictionData: Partial<Prediction>): Promise<Prediction>;
  findById(id: string): Promise<Prediction | null>;
  findByMedicalDataId(medicalDataId: string): Promise<Prediction[]>;
  list(): Promise<Prediction[]>;
  delete(id: string): Promise<void>;
}
