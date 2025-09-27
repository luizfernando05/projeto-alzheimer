import { NextFunction, Request, Response } from 'express';
import PatientRepository from '../repositories/PatientRepository';
import { GetGenderStatsUseCase } from '../useCases/GetGenderStatsUseCase';

export class GetGenderStatsController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const doctorId = req.user?.id;

    const patientRepository = new PatientRepository();
    const useCase = new GetGenderStatsUseCase(patientRepository);

    const stats = await useCase.execute(doctorId);

    return res.json(stats);
  }
}
