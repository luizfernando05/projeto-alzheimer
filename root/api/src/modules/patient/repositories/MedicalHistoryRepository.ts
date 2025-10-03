import { Repository } from 'typeorm';
import { AppDataSource } from '../../../config/data-source';
import { MedicalData } from '../../../domain/entities/MedicalData';
import {
  IMedicalHistoryRepository,
  MedicalHistoryData,
} from '../interfaces/IMedicalHistoryRepository';

export class MedicalHistoryRepository implements IMedicalHistoryRepository {
  private medicalDataRepository: Repository<MedicalData>;

  constructor() {
    this.medicalDataRepository = AppDataSource.getRepository(MedicalData);
  }

  async getMedicalHistoryByPatientId(
    patientId: string
  ): Promise<MedicalHistoryData[]> {
    const medicalData = await this.medicalDataRepository
      .createQueryBuilder('medicalData')
      .leftJoinAndSelect('medicalData.predictions', 'prediction')
      .where('medicalData.patientId = :patientId', { patientId })
      .orderBy('medicalData.createdAt', 'DESC')
      .getMany();

    return medicalData.map((data) => {
      // Pegar a predição mais recente para este registro médico
      const latestPrediction =
        data.predictions && data.predictions.length > 0
          ? data.predictions.sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )[0]
          : null;

      return {
        id: data.id,
        dateExam: data.createdAt.toISOString().split('T')[0], // YYYY-MM-DD format
        mmse: data.mmse || 0,
        functionalAssessment: data.functionalAssessment || 0,
        adl: data.adl ?? undefined,
        bmi: data.bmi || 0,
        cholesterolLdl: data.cholesterolLdl || 0,
        cholesterolHdl: data.cholesterolHdl || 0,
        cholesterolTriglycerides: data.cholesterolTriglycerides || 0,
        smoking: data.smoking || false,
        alcoholConsumption: !!data.alcoholConsumption,
        physicalActivity: Boolean(data.physicalActivity),
        memoryComplaints: data.memoryComplaints || false,
        behavioralProblems: data.behavioralProblems || false,
        confusion: data.confusion || false,
        forgetfulness: data.forgetfulness || false,
        createdAt: data.createdAt.toISOString(),
        prediction: latestPrediction
          ? {
              id: latestPrediction.id,
              result: latestPrediction.prediction_result,
              confidence: latestPrediction.confidence_score,
              createdAt: latestPrediction.created_at.toISOString(),
            }
          : undefined,
      };
    });
  }
}

export default MedicalHistoryRepository;
