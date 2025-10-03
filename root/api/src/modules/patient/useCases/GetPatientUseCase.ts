import Patient from '../../../domain/entities/Patient';
import { AppError } from '../../shared/errors/AppError';
import { IPatientRepository } from '../interfaces/IPatientRepository';

export class GetPatientUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(id: string): Promise<any> {
    const patient = await this.patientRepository.findAllInfosById(id);

    if (!patient) {
      throw new AppError('Paciente não encontrado', 404);
    }

    let latestPrediction = null;
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
    }

    return {
      id: patient.id,
      name: patient.name,
      email: patient.email,
      birthDate: patient.birthDate,
      gender: patient.gender,
      state: patient.state,
      ethnicity: patient.ethnicity,
      educationLevel: patient.educationLevel,
      phoneNumber: patient.phoneNumber,
      selfiePhoto: patient.selfiePhoto,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
      prediction: latestPrediction
        ? {
            id: latestPrediction.id,
            result: latestPrediction.prediction_result,
            confidence: latestPrediction.confidence_score,
            createdAt: latestPrediction.created_at,
          }
        : null,
    };
  }
}

export default GetPatientUseCase;
