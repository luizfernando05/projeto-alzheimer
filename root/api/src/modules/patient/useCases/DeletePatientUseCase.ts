import { PatientRepository } from '../repositories/PatientRepository';

export class DeletePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(patientId: string, doctorId: string): Promise<void> {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new Error('Paciente não encontrado');
    }

    await this.patientRepository.delete(patientId);
  }
}
