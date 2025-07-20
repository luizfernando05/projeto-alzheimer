import { Response } from 'express';
import { IPatientRepository } from '../interfaces/IPatientRepository';
import { generatePatientPdf } from '../../shared/utils/PatientPDFGenerator';
import { AppError } from '../../shared/errors/AppError';

export class DownloadPatientPdfUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(
    patientId: string,
    doctorId: string,
    res: Response
  ): Promise<void> {
    const patient = await this.patientRepository.findByIdAndDoctor(
      patientId,
      doctorId
    );

    if (!patient || !patient.medicalData) {
      throw new AppError(
        'Paciente não encontrado ou dados médicos ausentes',
        404
      );
    }

    generatePatientPdf(patient, patient.medicalData[0], res);
  }
}
