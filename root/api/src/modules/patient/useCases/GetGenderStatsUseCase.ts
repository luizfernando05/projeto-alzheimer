import { GenderStatsDTO } from '../dto/GenderStatsDTO';
import PatientRepository from '../repositories/PatientRepository';

export class GetGenderStatsUseCase {
  constructor(private pastientRepository: PatientRepository) {}

  async execute(doctorId: string): Promise<GenderStatsDTO> {
    return this.pastientRepository.getPositiveByGender(doctorId);
  }
}
