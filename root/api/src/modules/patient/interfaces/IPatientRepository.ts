import MedicalData from '../../../domain/entities/MedicalData';
import Patient from '../../../domain/entities/Patient';
import { GenderStatsDTO } from '../dto/GenderStatsDTO';
import { PredictionSummaryResponseDTO } from '../dto/GetDoctorPredictionsSummaryDTO';

export interface IPatientRepository {
  create(patient: Patient): Promise<Patient>;
  findByEmail(email: string): Promise<Patient | null>;
  findById(id: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
  findByCelphone(phoneNumber: string): Promise<Patient | null>;
  update(patient: Patient): Promise<Patient>;
  findByDoctorId(doctorId: string): Promise<Patient[]>;
  countByDoctorId(doctorId: string): Promise<number>;
  getPositiveByGender(doctorId: string): Promise<GenderStatsDTO>;
  getSummaryByDoctorId(
    doctorId: string
  ): Promise<PredictionSummaryResponseDTO[]>;

  findByDoctorWithFilters(
    doctorId: string,
    filters: {
      page?: number;
      limit?: number;
      gender?: string;
      name?: string;
      minAge?: number;
      maxAge?: number;
      startDate?: string;
      endDate?: string;
      sortBy?: 'createdAt';
      sortOrder?: 'ASC' | 'DESC';
    }
  ): Promise<{ data: Patient[]; total: number }>;
  countCreatedBetweenDates(
    doctorId: string,
    start: Date,
    end: Date
  ): Promise<number>;
  getCountByDateLast7Days(
    doctorId: string
  ): Promise<{ date: string; count: number }[]>;

  findByIdAndDoctor(
    patientId: string,
    doctorId: string
  ): Promise<Patient | null>;
}
