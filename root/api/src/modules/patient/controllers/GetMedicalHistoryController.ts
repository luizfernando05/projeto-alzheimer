import { NextFunction, Request, Response } from 'express';
import MedicalHistoryRepository from '../repositories/MedicalHistoryRepository';
import PatientRepository from '../repositories/PatientRepository';
import GetMedicalHistoryUseCase from '../useCases/GetMedicalHistoryUseCase';

export class GetMedicalHistoryController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const patientId = req.user?.id;

      if (!patientId) {
        return res.status(401).json({ error: 'Paciente não autenticado' });
      }

      const medicalHistoryRepository = new MedicalHistoryRepository();
      const patientRepository = new PatientRepository();
      const getMedicalHistoryUseCase = new GetMedicalHistoryUseCase(
        patientRepository
      );

      const medicalHistory = await getMedicalHistoryUseCase.execute(patientId);

      return res.status(200).json(medicalHistory);
    } catch (err) {
      next(err);
    }
  }
}

export default GetMedicalHistoryController;
