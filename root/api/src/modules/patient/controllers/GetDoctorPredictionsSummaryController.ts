import { Request, Response } from 'express';
import PatientRepository from '../repositories/PatientRepository';
import { GetDoctorPredictionsSummaryUseCase } from '../useCases/GetDoctorPredictionsSummaryUseCase';

export class GetDoctorPredictionsSummaryController {
  async handle(req: Request, res: Response) {
    try {
      const doctorId = req.user.id;
      const repository = new PatientRepository();
      const useCase = new GetDoctorPredictionsSummaryUseCase(repository);

      const summary = await useCase.execute(doctorId);
      return res.status(200).json(summary);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Erro ao buscar resumo de predições' });
    }
  }
}
