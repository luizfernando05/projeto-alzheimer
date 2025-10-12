import { IPredictionRepository } from '../interfaces/IPredictionRepository';
import { Prediction } from '../../../domain/entities/Prediction';

export class GetPatientPredictionsUseCase {
  constructor(private predictionRepository: IPredictionRepository) {}

  async execute(patientId: string): Promise<Prediction[]> {
    if (!patientId) {
      throw new Error('ID do paciente é obrigatório');
    }

    const predictions =
      await this.predictionRepository.findByPatientId(patientId);

    // Ordenar por data de criação (mais recentes primeiro)
    return predictions.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }
}
