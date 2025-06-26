import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../shared/errors/AppError';
import { PatientRepository } from '../repositories/PatientRepository';
import { GetPatientsByLast7DaysUseCase } from '../useCases/GetPatientsByLast7DaysUseCase';

export class GetPatientsByLast7DaysController {
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
      const getPatientsByLast7DaysUseCase = new GetPatientsByLast7DaysUseCase(
        patientRepository
      );

      const data = await getPatientsByLast7DaysUseCase.execute(doctorId);

      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

export default GetPatientsByLast7DaysController;
