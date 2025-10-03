import { AppError } from '../../shared/errors/AppError';
import { IPatientRepository } from '../interfaces/IPatientRepository';
import CohereService from '../services/CohereService';

interface RecommendationResponse {
  personalizedMessage: string;
  recommendations: Array<{
    category: string;
    title: string;
    description: string;
    icon: string;
  }>;
}

export class GetPersonalizedRecommendationsUseCase {
  constructor(
    private patientRepository: IPatientRepository,
    private cohereService: CohereService
  ) {}

  async execute(patientId: string): Promise<RecommendationResponse> {
    const patient = await this.patientRepository.findAllInfosById(patientId);

    if (!patient) {
      throw new AppError('Paciente não encontrado', 404);
    }

    // Calcular idade
    const birthDate = new Date(patient.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    // Buscar predição mais recente
    let latestPrediction = null;
    let mmseScore = null;
    let hasSymptoms = false;

    if (patient.medicalData && patient.medicalData.length > 0) {
      const medicalDataWithPredictions = patient.medicalData.filter(
        (md) => md.predictions && md.predictions.length > 0
      );

      if (medicalDataWithPredictions.length > 0) {
        const allPredictions = medicalDataWithPredictions
          .flatMap((md) => md.predictions)
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

        latestPrediction = allPredictions[0];
      }

      // Buscar dados médicos mais recentes
      const latestMedicalData = patient.medicalData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

      if (latestMedicalData) {
        mmseScore = latestMedicalData.mmse;
        hasSymptoms =
          latestMedicalData.memoryComplaints ||
          latestMedicalData.behavioralProblems ||
          latestMedicalData.confusion ||
          latestMedicalData.forgetfulness;
      }
    }

    const patientProfile = {
      name: patient.name,
      age: age,
      gender: patient.gender,
      predictionResult: latestPrediction?.prediction_result || 'negative',
      confidenceScore: latestPrediction?.confidence_score || 0,
      mmseScore: mmseScore !== null ? mmseScore : undefined,
      hasSymptoms: hasSymptoms,
    };

    return await this.cohereService.generateRecommendations(patientProfile);
  }
}

export default GetPersonalizedRecommendationsUseCase;
