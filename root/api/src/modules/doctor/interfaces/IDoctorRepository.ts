import Doctor from '../../../domain/entities/Doctor';

export interface IDoctorRepository {
  create(doctor: Doctor): Promise<Doctor>;
  findByEmail(email: string): Promise<Doctor | null>;
  findById(id: string): Promise<Doctor | null>;
  findByCrm(crm: string): Promise<Doctor | null>;
  update(doctor: Doctor): Promise<Doctor>;
}
