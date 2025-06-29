import Doctor from '../../../domain/entities/Doctor';
import { AppError } from '../../shared/errors/AppError';
import { IDoctorRepository } from '../interfaces/IDoctorRepository';

export class GetDoctorUseCase {
  constructor(private doctorRepository: IDoctorRepository) {}

  async execute(id: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.findById(id);

    if (!doctor) {
      throw new AppError('Médico não encontrado', 404);
    }

    return doctor;
  }
}

export default GetDoctorUseCase;
