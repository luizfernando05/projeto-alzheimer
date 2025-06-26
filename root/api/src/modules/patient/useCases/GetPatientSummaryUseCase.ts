import { IPatientRepository } from '../interfaces/IPatientRepository';

export class GetPatientSummaryUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(doctorId: string): Promise<{
    total: number;
    growth: {
      percentage: number;
      currentWeek: number;
      previousWeek: number;
    };
  }> {
    const total = await this.patientRepository.countByDoctorId(doctorId);

    const now = new Date();
    const startCurrent = new Date();
    startCurrent.setDate(now.getDate() - 7);

    const startPrevious = new Date();
    startPrevious.setDate(now.getDate() - 14);

    const endPrevious = new Date();
    endPrevious.setDate(now.getDate() - 8);

    const currentWeek = await this.patientRepository.countCreatedBetweenDates(
      doctorId,
      startCurrent,
      now
    );
    const previousWeek = await this.patientRepository.countCreatedBetweenDates(
      doctorId,
      startPrevious,
      endPrevious
    );

    const percentage =
      previousWeek === 0
        ? currentWeek > 0
          ? 100
          : 0
        : ((currentWeek - previousWeek) / previousWeek) * 100;

    return {
      total,
      growth: {
        percentage: Number(percentage.toFixed(2)),
        currentWeek,
        previousWeek,
      },
    };
  }
}
