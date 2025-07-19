import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../shared/errors/AppError';
import PatientRepository from '../repositories/PatientRepository';
import { GetPatientDetailsUseCase } from '../useCases/GetPatientDetailsUseCase';

export class GetPatientDetailsController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const doctorId = req.user?.id;
      const { patientId } = req.params;

      if (!doctorId) {
        throw new AppError('Acesso não autorizado', 401);
      }

      const patientRepository = new PatientRepository();
      const getPatientDetailsUseCase = new GetPatientDetailsUseCase(
        patientRepository
      );

      const result = await getPatientDetailsUseCase.execute(
        patientId,
        doctorId
      );

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
