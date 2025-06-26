import Patient from '../../../domain/entities/Patient';

export interface IPatientRepository {
  create(patient: Patient): Promise<Patient>;
  findByEmail(email: string): Promise<Patient | null>;
  findById(id: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
  findByCelphone(phoneNumber: string): Promise<Patient | null>;
  update(patient: Patient): Promise<Patient>;
  findByDoctorId(doctorId: string): Promise<Patient[]>;
}
