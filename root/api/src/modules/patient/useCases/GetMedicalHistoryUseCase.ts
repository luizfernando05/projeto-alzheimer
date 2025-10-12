import { AppError } from '../../shared/errors/AppError';
import {
  IMedicalHistoryRepository,
  MedicalHistoryData,
} from '../interfaces/IMedicalHistoryRepository';
import { IPatientRepository } from '../interfaces/IPatientRepository';

export class GetMedicalHistoryUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(patientId: string): Promise<MedicalHistoryData[]> {
    // Verificar se o paciente existe
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new AppError('Paciente não encontrado', 404);
    }

    const medicalHistory =
      await this.patientRepository.getMedicalHistory(patientId);

    // Garantir que o dateExam está sendo retornado corretamente
    return (medicalHistory as MedicalHistoryData[]).map((record) => ({
      ...record,
      dateExam: record.dateExam, // Certificar que dateExam está sendo retornado
    }));
  }
}

export default GetMedicalHistoryUseCase;
