import MedicalData from '../../../domain/entities/MedicalData';
import { IMMSEData } from './IMMSEData';

export interface IMedicalDataRepository {
  create(medicalData: MedicalData): Promise<MedicalData>;
  findById(id: string): Promise<MedicalData | null>;
  findByPatientId(patientId: string): Promise<MedicalData | null>;
  findAll(): Promise<MedicalData[]>;
  update(medicalData: MedicalData): Promise<MedicalData>;
  getMMSEDataByPatientId(patientId: string): Promise<IMMSEData[]>;
}
