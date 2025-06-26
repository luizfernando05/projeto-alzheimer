import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../shared/errors/AppError';
import { PatientRepository } from '../repositories/PatientRepository';
import { ListPatientsByDoctorUseCase } from '../useCases/ListPatientsByDoctorUseCase';

export class ListPatientsByDoctorController {
  async hanlde(
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
      const listPatientsByDoctorUseCase = new ListPatientsByDoctorUseCase(
        patientRepository
      );

      const patients = await listPatientsByDoctorUseCase.execute(doctorId);

      return res.status(200).json(patients);
    } catch (err) {
      next(err);
    }
  }
}
