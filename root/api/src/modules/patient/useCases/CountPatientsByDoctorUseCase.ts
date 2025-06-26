import { AppError } from '../../shared/errors/AppError';
import { IPatientRepository } from '../interfaces/IPatientRepository';

export class CountPatientsByDoctorUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(doctorId: string): Promise<number> {
    const patients = await this.patientRepository.findByDoctorId(doctorId);

    if (!patients) {
      throw new AppError('Pacientes não encontrados', 404);
    }

    return await this.patientRepository.countByDoctorId(doctorId);
  }
}
