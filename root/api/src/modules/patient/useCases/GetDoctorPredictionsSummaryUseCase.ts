import { PredictionSummaryResponseDTO } from '../dto/GetDoctorPredictionsSummaryDTO';
import { IPatientRepository } from '../interfaces/IPatientRepository';

export class GetDoctorPredictionsSummaryUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(doctorId: string): Promise<PredictionSummaryResponseDTO[]> {
    return this.patientRepository.getSummaryByDoctorId(doctorId);
  }
}
