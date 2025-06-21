import MedicalData from '../../../domain/entities/MedicalData';

export interface IMedicalDataRepository {
  create(medicalData: MedicalData): Promise<MedicalData>;
  findById(id: string): Promise<MedicalData | null>;
  findAll(): Promise<MedicalData[]>;
  update(medicalData: MedicalData): Promise<MedicalData>;
}
