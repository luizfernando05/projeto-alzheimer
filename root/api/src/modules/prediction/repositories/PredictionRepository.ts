import { Repository } from 'typeorm';
import { IPredictionRepository } from '../interfaces/IPredictionRepository';
import { Prediction } from '../../../domain/entities/Prediction';
import { AppDataSource } from '../../../config/data-source';

export class PredictionRepository implements IPredictionRepository {
  private repository: Repository<Prediction>;

  constructor() {
    this.repository = AppDataSource.getRepository(Prediction);
  }

  async create(predictionData: Partial<Prediction>): Promise<Prediction> {
    const prediction = this.repository.create(predictionData);
    return await this.repository.save(prediction);
  }

  async findById(id: string): Promise<Prediction | null> {
    return await this.repository.findOne({
      where: { id: id },
      relations: ['medicalData'],
    });
  }

  async findByMedicalDataId(medicalDataId: string): Promise<Prediction[]> {
    return await this.repository.find({
      where: { medicalData: { id: medicalDataId.toString() } },
      relations: ['medicalData'],
    });
  }

  async list(): Promise<Prediction[]> {
    return await this.repository.find({
      relations: ['medicalData'],
      order: { created_at: 'DESC' },
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
