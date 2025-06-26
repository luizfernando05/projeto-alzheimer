import { Repository } from 'typeorm';
import { AppDataSource } from '../../../config/data-source';
import Patient from '../../../domain/entities/Patient';
import { IPatientRepository } from '../interfaces/IPatientRepository';

export class PatientRepository implements IPatientRepository {
  private ormRepository: Repository<Patient>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Patient);
  }

  async countByDoctorId(doctorId: string): Promise<number> {
    return this.ormRepository.count({
      where: { createdByDoctor: { id: doctorId } },
    });
  }

  async findByDoctorId(doctorId: string): Promise<Patient[]> {
    return this.ormRepository.find({
      where: { createdByDoctor: { id: doctorId } },
      relations: ['createdByDoctor'],
    });
  }

  async create(patient: Patient): Promise<Patient> {
    const createPatient = this.ormRepository.create(patient);
    return this.ormRepository.save(createPatient);
  }

  async findByEmail(email: string): Promise<Patient | null> {
    return this.ormRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<Patient | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Patient[]> {
    return this.ormRepository.find();
  }

  async findByCelphone(phoneNumber: string): Promise<Patient | null> {
    return this.ormRepository.findOne({ where: { phoneNumber } });
  }

  async update(patient: Patient): Promise<Patient> {
    return this.ormRepository.save(patient);
  }
}
