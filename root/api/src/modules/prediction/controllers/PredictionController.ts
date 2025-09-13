import { Request, Response } from 'express';
import { PredictionUseCase } from '../useCases/PredictionUseCase';
import { PredictionService } from '../services/PredictionService';
import { PredictionRepository } from '../repositories/PredictionRepository';
import { MedicalDataRepository } from '../../medicalData/repositories/MedicalDataRepository';

export class PredictionController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { medicalDataId } = req.body;

      const predictionService = new PredictionService();
      const predictionRepository = new PredictionRepository();
      const medicalDataRepository = new MedicalDataRepository();

      const predictionUseCase = new PredictionUseCase(
        predictionService,
        predictionRepository,
        medicalDataRepository
      );

      const prediction = await predictionUseCase.execute({ medicalDataId });

      return res.status(201).json(prediction);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.message || 'Erro ao gerar predição',
      });
    }
  }
}
