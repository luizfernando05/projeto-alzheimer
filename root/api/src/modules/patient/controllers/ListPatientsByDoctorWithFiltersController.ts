import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../shared/errors/AppError';
import { PatientRepository } from '../repositories/PatientRepository';
import { ListPatientsByDoctorWithFiltersUseCase } from '../useCases/ListPatientsByDoctorWithFiltersUseCase';

export class ListPatientsByDoctorWithFiltersController {
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

      const filters = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        gender: req.query.gender as string,
        minAge: req.query.minAge
          ? parseInt(req.query.minAge as string)
          : undefined,
        maxAge: req.query.maxAge
          ? parseInt(req.query.maxAge as string)
          : undefined,
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
        sortBy: req.query.sortBy as 'createdAt',
        sortOrder: req.query.sortOrder as 'ASC' | 'DESC',
      };

      const patientRepository = new PatientRepository();
      const listPatientsByDoctorUseCase =
        new ListPatientsByDoctorWithFiltersUseCase(patientRepository);

      const result = await listPatientsByDoctorUseCase.execute(
        doctorId,
        filters
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default ListPatientsByDoctorWithFiltersController;
