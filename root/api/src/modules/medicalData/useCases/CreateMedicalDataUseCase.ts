import MedicalData from '../../../domain/entities/MedicalData';
import { AppError } from '../../shared/errors/AppError';
import { IMedicalDataRepository } from '../interfaces/IMedicalDataRepository';
import { CreateMedicalDataDTO } from '../dto/CreateMedicalDataDTO';
import { IPatientRepository } from '../../patient/interfaces/IPatientRepository';

export class CreateMedicalDataUseCase {
  constructor(
    private medicalDataRepository: IMedicalDataRepository,
    private patientRepository: IPatientRepository
  ) {}

  async execute(data: CreateMedicalDataDTO): Promise<MedicalData> {
    const { patientId } = data;

    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new AppError('Paciente não encontrado', 400);
    }

    const existingData =
      await this.medicalDataRepository.findByPatientId(patientId);

    if (existingData) {
      throw new AppError('Dados médicos para este paciente já existem', 400);
    }

    const medicalData = new MedicalData();
    Object.assign(medicalData, data);

    return this.medicalDataRepository.create(medicalData);
  }
}

export default CreateMedicalDataUseCase;
