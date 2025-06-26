import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../shared/errors/AppError';
import { PatientRepository } from '../repositories/PatientRepository';
import { GetPatientSummaryUseCase } from '../useCases/GetPatientSummaryUseCase';
import { json } from 'stream/consumers';

export class GetPatientSummaryController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const doctorId = req.user?.id;

      if (!doctorId) {
        throw new AppError('Não autorizado', 401);
      }

      const patientRepository = new PatientRepository();
      const getPatientSummaryUseCase = new GetPatientSummaryUseCase(
        patientRepository
      );

      const summary = await getPatientSummaryUseCase.execute(doctorId);

      return res.status(200).json(summary);
    } catch (err) {
      next(err);
    }
  }
}
