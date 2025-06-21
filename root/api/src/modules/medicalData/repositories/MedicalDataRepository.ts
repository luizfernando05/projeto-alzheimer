import { Repository } from 'typeorm';
import { AppDataSource } from '../../../config/data-source';
import MedicalData from '../../../domain/entities/MedicalData';
import { IMedicalDataRepository } from '../interfaces/IMedicalDataRepository';

export class MedicalDataRepository implements IMedicalDataRepository {
  private ormRepository: Repository<MedicalData>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(MedicalData);
  }

  async findByPatientId(patientId: string): Promise<MedicalData | null> {
    return this.ormRepository.findOne({
      where: {
        patientId: { id: patientId },
      },
      relations: ['patientId'],
    });
  }

  async create(medicalData: MedicalData): Promise<MedicalData> {
    const createMedicalData = this.ormRepository.create(medicalData);
    return this.ormRepository.save(createMedicalData);
  }

  async findById(id: string): Promise<MedicalData | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<MedicalData[]> {
    return this.ormRepository.find();
  }

  async update(medicalData: MedicalData): Promise<MedicalData> {
    return this.ormRepository.save(medicalData);
  }
}
