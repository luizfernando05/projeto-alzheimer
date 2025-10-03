import { Repository } from 'typeorm';
import { AppDataSource } from '../../../config/data-source';
import MedicalData from '../../../domain/entities/MedicalData';
import { IMedicalDataRepository } from '../interfaces/IMedicalDataRepository';
import { IMMSEData } from '../interfaces/IMMSEData';

export class MedicalDataRepository implements IMedicalDataRepository {
  private ormRepository: Repository<MedicalData>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(MedicalData);
  }

  async getMMSEDataByPatientId(patientId: string): Promise<IMMSEData[]> {
    const medicalData = await this.ormRepository
      .createQueryBuilder('medicalData')
      .where('medicalData.patientId = :patientId', { patientId })
      .orderBy('medicalData.createdAt', 'ASC')
      .getMany();

    return medicalData.map((data) => {
      const date = new Date(data.createdAt);
      return {
        date: date.toISOString().split('T')[0],
        mmse: data.mmse || 0,
        label: date
          .toLocaleDateString('pt-BR', {
            month: 'short',
          })
          .replace('.', '')
          .toUpperCase(),
      };
    });
  }

  async findByPatientId(patientId: string): Promise<MedicalData | null> {
    return this.ormRepository.findOne({
      where: {
        patientId: { id: patientId },
      },
      order: { createdAt: 'ASC' },
      relations: ['patientId'],
    });
  }

  async create(medicalData: MedicalData): Promise<MedicalData> {
    const createMedicalData = this.ormRepository.create(medicalData);
    return this.ormRepository.save(createMedicalData);
  }

  async findById(id: string): Promise<MedicalData | null> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['patientId'],
    });
  }

  async findAll(): Promise<MedicalData[]> {
    return this.ormRepository.find();
  }

  async update(medicalData: MedicalData): Promise<MedicalData> {
    return this.ormRepository.save(medicalData);
  }
}
