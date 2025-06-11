import Patient from '../../../domain/entities/Patient';

export interface IPatientRepository {
  create(doctor: Patient): Promise<Patient>;
  findByEmail(email: string): Promise<Patient | null>;
  findById(id: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
  findByUsername(username: string): Promise<Patient | null>;
  findByCelphone(celphone: string): Promise<Patient | null>;
  update(patient: Patient): Promise<Patient>;
}
