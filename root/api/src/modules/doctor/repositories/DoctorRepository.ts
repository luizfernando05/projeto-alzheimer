import { Repository } from 'typeorm';
import Doctor from '../../../domain/entities/Doctor';
import { IDoctorRepository } from '../interfaces/IDoctorRepository';
import { AppDataSource } from '../../../config/data-source';

export class DoctorRepository implements IDoctorRepository {
  private ormRepository: Repository<Doctor>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Doctor);
  }

  async create(doctor: Doctor): Promise<Doctor> {
    const createDoctor = this.ormRepository.create(doctor);
    return this.ormRepository.save(createDoctor);
  }

  async findByEmail(email: string): Promise<Doctor | null> {
    return this.ormRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<Doctor | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  async findByCrm(crm: string): Promise<Doctor | null> {
    return this.ormRepository.findOne({ where: { crm } });
  }

  async update(doctor: Doctor): Promise<Doctor> {
    return this.ormRepository.save(doctor);
  }
}

export default DoctorRepository;
