import Patient from '../../../domain/entities/Patient';
import { AppError } from '../../shared/errors/AppError';
import PatientRepository from '../repositories/PatientRepository';

export class GetPatientDetailsUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(patientId: string, doctorId: string): Promise<Patient> {
    const patient = await this.patientRepository.findByIdAndDoctor(
      patientId,
      doctorId
    );

    if (!patient) {
      throw new AppError(
        'Paciente não encontrado ou acesso não autorizado',
        404
      );
    }

    return patient;
  }
}
