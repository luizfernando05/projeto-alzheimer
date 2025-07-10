import Patient from '../../../domain/entities/Patient';
import { IFilterOptions } from '../interfaces/IFilterOptions';
import { IPatientRepository } from '../interfaces/IPatientRepository';

export class ListPatientsByDoctorWithFiltersUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(
    doctorId: string,
    filters: IFilterOptions
  ): Promise<{ data: Patient[]; total: number }> {
    return this.patientRepository.findByDoctorWithFilters(doctorId, filters);
  }
}
