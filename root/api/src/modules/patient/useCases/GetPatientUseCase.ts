import Patient from '../../../domain/entities/Patient';
import { AppError } from '../../shared/errors/AppError';
import { IPatientRepository } from '../interfaces/IPatientRepository';

export class GetPatientUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new AppError('Médico não encontrado', 404);
    }

    return patient;
  }
}

export default GetPatientUseCase;
