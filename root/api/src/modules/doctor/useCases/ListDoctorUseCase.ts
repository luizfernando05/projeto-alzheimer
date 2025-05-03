import Doctor from '../../../domain/entities/Doctor';
import { IDoctorRepository } from '../interfaces/IDoctorRepository';

export class ListDoctorUseCase {
  constructor(private doctorRepository: IDoctorRepository) {}

  async execute(): Promise<Doctor[]> {
    return this.doctorRepository.findAll();
  }
}

export default ListDoctorUseCase;
