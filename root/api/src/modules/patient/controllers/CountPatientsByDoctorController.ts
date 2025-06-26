import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../shared/errors/AppError';
import { CountPatientsByDoctorUseCase } from '../useCases/CountPatientsByDoctorUseCase';
import { PatientRepository } from '../repositories/PatientRepository';

export class CountPatientsByDoctorController {
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
      const countPatientsByDoctorUseCase = new CountPatientsByDoctorUseCase(
        patientRepository
      );

      const total = await countPatientsByDoctorUseCase.execute(doctorId);

      return res.status(200).json({ total });
    } catch (err) {
      next(err);
    }
  }
}
