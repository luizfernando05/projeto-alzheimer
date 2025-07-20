import { NextFunction, Request, Response } from 'express';
import { DownloadPatientPdfUseCase } from '../useCases/DownloadPatientPdfUseCase';
import { AppError } from '../../shared/errors/AppError';
import PatientRepository from '../repositories/PatientRepository';

export class DownloadPatientPdfController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const doctorId = req.user?.id;
      const { patientId } = req.params;

      if (!doctorId) {
        throw new AppError('Acesso não autorizado', 401);
      }

      const patientRepository = new PatientRepository();
      const downloadPatientPdfUseCase = new DownloadPatientPdfUseCase(
        patientRepository
      );

      await downloadPatientPdfUseCase.execute(patientId, doctorId, res);
    } catch (err) {
      next(err);
    }
  }
}
