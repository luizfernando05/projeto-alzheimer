import { IMedicalDataRepository } from '../../medicalData/interfaces/IMedicalDataRepository';
import { IPredictionRepository } from '../../prediction/interfaces/IPredictionRepository';
import { AppError } from '../../shared/errors/AppError';
import { AdviceResponseDTO } from '../dtos/AdviceRequestDTO';
import AdviceService from '../services/AdviceService';

interface IRequest {
  medicalDataId: string;
}

export class GenerateAdviceUseCase {
  constructor(
    private adviceService: AdviceService,
    private medicalDataRepository: IMedicalDataRepository,
    private predictionRepository: IPredictionRepository
  ) {}

  async execute({ medicalDataId }: IRequest): Promise<AdviceResponseDTO> {
    const medicalData =
      await this.medicalDataRepository.findById(medicalDataId);
    if (!medicalData) {
      throw new AppError('Dados médicos não encontrados', 404);
    }

    const predictions =
      await this.predictionRepository.findByMedicalDataId(medicalDataId);
    if (!predictions || predictions.length === 0) {
      throw new AppError('Predição não encontrada para este exame', 404);
    }

    const latestPrediction = predictions[predictions.length - 1];
    const adviceRequest = {
      patientName: medicalData.patientId.name,
      age:
        new Date().getFullYear() -
        new Date(medicalData.patientId.birthDate).getFullYear(),
      gender: medicalData.patientId.gender,
      medicalData: {
        mmse: medicalData.mmse,
        functionalAssessment: medicalData.functionalAssessment,
        memoryComplaints: medicalData.memoryComplaints,
        behavioralProblems: medicalData.behavioralProblems,
        adl: medicalData.adl,
      },
      prediction: {
        result: latestPrediction.prediction_result,
        confidenceScore: latestPrediction.confidence_score,
      },
    };

    const advice = await this.adviceService.generateAdvice(adviceRequest);

    return advice;
  }
}
