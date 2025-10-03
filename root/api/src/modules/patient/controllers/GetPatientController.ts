import { NextFunction, Request, Response } from 'express';
import PatientRepository from '../repositories/PatientRepository';
import { AppDataSource } from '../../../config/data-source';
import { Prediction } from '../../../domain/entities/Prediction';

export class GetPatientController {
  async hanlde(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id = req.user?.id;

      const patientRepository = new PatientRepository();
      const patient = await patientRepository.findById(id);

      if (!patient) {
        throw new Error('Paciente não encontrado');
      }

      const predictionRepository = AppDataSource.getRepository(Prediction);
      const latestPrediction = await predictionRepository
        .createQueryBuilder('prediction')
        .innerJoin('prediction.medicalData', 'medicalData')
        .innerJoin('medicalData.patientId', 'patient')
        .where('patient.id = :patientId', { patientId: id })
        .orderBy('prediction.created_at', 'DESC')
        .getOne();

      const response = {
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

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default GetPatientController;
