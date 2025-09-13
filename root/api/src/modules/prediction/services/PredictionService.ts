import axios from 'axios';
import { AppError } from '../../shared/errors/AppError';

export class PredictionService {
  private baseUrl = 'http://localhost:5000';

  async getPrediction(
    inputData: any
  ): Promise<{ prediction_result: string; confidence_score: number }> {
    try {
      const response = await axios.post(`${this.baseUrl}/predict`, inputData);
      return {
        prediction_result: response.data.prediction_result,
        confidence_score: response.data.confidence_score,
      };
    } catch (error) {
      console.error('Erro ao se comunicar com a API Python:', error);
      throw new AppError('Falha ao obter predição do modelo de ML', 500);
    }
  }
}
