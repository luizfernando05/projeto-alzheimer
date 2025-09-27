import axios from 'axios';
import { AppError } from '../../shared/errors/AppError';
import { PredictionResult } from '../types/PredictionTypes';

export class PredictionService {
  private baseUrl = 'http://localhost:5000';

  async getPrediction(inputData: any): Promise<{
    prediction_result: PredictionResult;
    confidence_score: number;
  }> {
    try {
      const response = await axios.post(`${this.baseUrl}/predict`, inputData);

      // Convert numeric result to string enum
      const predictionResult =
        response.data.prediction_result === 1
          ? PredictionResult.POSITIVE
          : PredictionResult.NEGATIVE;

      return {
        prediction_result: predictionResult,
        confidence_score: response.data.confidence_score,
      };
    } catch (error) {
      console.error('Erro ao se comunicar com a API Python:', error);
      throw new AppError('Falha ao obter predição do modelo de ML', 500);
    }
  }
}
