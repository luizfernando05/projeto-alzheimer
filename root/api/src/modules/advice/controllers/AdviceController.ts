import { Request, Response } from 'express';
import { AdviceService } from '../services/AdviceService';
import { MedicalDataRepository } from '../../medicalData/repositories/MedicalDataRepository';
import { PredictionRepository } from '../../prediction/repositories/PredictionRepository';
import { GenerateAdviceUseCase } from '../useCases/AdviceUseCase';

export class AdviceController {
  async generate(req: Request, res: Response): Promise<Response> {
    try {
      const { medicalDataId } = req.body;

      const adviceService = new AdviceService();
      const medicalDataRepository = new MedicalDataRepository();
      const predictionRepository = new PredictionRepository();

      const generateAdviceUseCase = new GenerateAdviceUseCase(
        adviceService,
        medicalDataRepository,
        predictionRepository
      );

      const advice = await generateAdviceUseCase.execute({ medicalDataId });

      return res.status(200).json(advice);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        message: error.message || 'Erro ao gerar aconselhamento',
      });
    }
  }
}
