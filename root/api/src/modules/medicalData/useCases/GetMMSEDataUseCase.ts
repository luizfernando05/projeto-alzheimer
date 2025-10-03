import { IPatientRepository } from '../../patient/interfaces/IPatientRepository';
import { AppError } from '../../shared/errors/AppError';
import { IMedicalDataRepository } from '../interfaces/IMedicalDataRepository';
import { IMMSEData } from '../interfaces/IMMSEData';

export class GetMMSEDataUseCase {
  constructor(
    private medicalDataRepository: IMedicalDataRepository,
    private patientRepository: IPatientRepository
  ) {}

  async execute(patientId: string): Promise<IMMSEData[]> {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new AppError('Paciente não encontrado', 404);
    }

    const mmseData =
      await this.medicalDataRepository.getMMSEDataByPatientId(patientId);

    return mmseData;
  }
}

export default GetMMSEDataUseCase;
