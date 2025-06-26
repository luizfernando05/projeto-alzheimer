import { IPatientRepository } from '../interfaces/IPatientRepository';

export class GetPatientsByLast7DaysUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(doctorId: string): Promise<{ date: string; count: number }[]> {
    return this.patientRepository.getCountByDateLast7Days(doctorId);
  }
}
