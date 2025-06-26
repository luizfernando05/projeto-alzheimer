import Patient from '../../../domain/entities/Patient';
import { AppError } from '../../shared/errors/AppError';
import { IPatientRepository } from '../interfaces/IPatientRepository';

export class ListPatientsByDoctorUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(doctorId: string): Promise<Patient[]> {
    const patients = await this.patientRepository.findByDoctorId(doctorId);

    if (!patients) {
      throw new AppError('Pacientes não encontrados', 404);
    }

    return patients;
  }
}
