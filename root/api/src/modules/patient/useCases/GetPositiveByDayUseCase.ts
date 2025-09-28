import { PositiveByDayDTO } from '../dto/PositiveByDayDTO';
import PatientRepository from '../repositories/PatientRepository';

export class GetPositiveByDayUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(doctorId: string): Promise<PositiveByDayDTO[]> {
    return this.patientRepository.getPositiveByDay(doctorId);
  }
}
