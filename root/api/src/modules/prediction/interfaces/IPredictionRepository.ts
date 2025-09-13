import { Prediction } from '../../../domain/entities/Prediction';

export interface IPredictionRepository {
  create(predictionData: Partial<Prediction>): Promise<Prediction>;
  findById(id: number): Promise<Prediction | null>;
  findByMedicalDataId(medicalDataId: number): Promise<Prediction[]>;
  list(): Promise<Prediction[]>;
  delete(id: number): Promise<void>;
}
