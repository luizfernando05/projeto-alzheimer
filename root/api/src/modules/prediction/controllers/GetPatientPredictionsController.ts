import { Request, Response } from 'express';
import { GetPatientPredictionsUseCase } from '../useCases/GetPatientPredictionsUseCase';

export class GetPatientPredictionsController {
  constructor(
    private getPatientPredictionsUseCase: GetPatientPredictionsUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { patientId } = request.params;

      const predictions =
        await this.getPatientPredictionsUseCase.execute(patientId);

      return response.status(200).json(predictions);
    } catch (error) {
      console.error('Erro ao buscar predições do paciente:', error);
      return response.status(500).json({
        error: 'Erro interno do servidor ao buscar predições',
      });
    }
  }
}
