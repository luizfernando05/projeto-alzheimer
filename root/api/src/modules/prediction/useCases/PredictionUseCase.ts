import { Prediction } from '../../../domain/entities/Prediction';
import { IMedicalDataRepository } from '../../medicalData/interfaces/IMedicalDataRepository';
import { AppError } from '../../shared/errors/AppError';
import { IPredictionRepository } from '../interfaces/IPredictionRepository';
import { PredictionService } from '../services/PredictionService';

export class PredictionUseCase {
  constructor(
    private predictionService: PredictionService,
    private predictionRepository: IPredictionRepository,
    private medicalDataRepository: IMedicalDataRepository
  ) {}

  async execute({
    medicalDataId,
  }: {
    medicalDataId: string;
  }): Promise<Prediction> {
    const medicalData =
      await this.medicalDataRepository.findById(medicalDataId);

    if (!medicalData) {
      throw new AppError('Dados não encontrados', 404);
    }

    const predictionData = {
      mmse: medicalData.mmse,
      functionalAssessment: medicalData.functionalAssessment,
      memoryComplaints: medicalData.memoryComplaints,
      behavioralProblems: medicalData.behavioralProblems,
      adl: medicalData.adl,
    };

    const predictionResponse =
      await this.predictionService.getPrediction(predictionData);

    const prediction = new Prediction();
    prediction.medicalData = medicalData;
    prediction.prediction_result = predictionResponse.prediction_result;
    prediction.confidence_score = predictionResponse.confidence_score;

    await this.predictionRepository.create(prediction);

    return prediction;
  }
}
