import { NextFunction, Request, Response } from 'express';
import PatientRepository from '../repositories/PatientRepository';
import CohereService from '../services/CohereService';
import GetPersonalizedRecommendationsUseCase from '../useCases/GetPersonalizedRecommendationsUseCase';

export class GetPersonalizedRecommendationsController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const patientId = req.user?.id;

      if (!patientId) {
        return res.status(401).json({ error: 'Paciente não autenticado' });
      }

      const patientRepository = new PatientRepository();
      const cohereService = new CohereService();
      const getPersonalizedRecommendationsUseCase =
        new GetPersonalizedRecommendationsUseCase(
          patientRepository,
          cohereService
        );

      const recommendations =
        await getPersonalizedRecommendationsUseCase.execute(patientId);

      return res.status(200).json(recommendations);
    } catch (err) {
      next(err);
    }
  }
}

export default GetPersonalizedRecommendationsController;
