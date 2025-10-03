import { NextFunction, Request, Response } from 'express';
import GetMMSEDataUseCase from '../useCases/GetMMSEDataUseCase';
import { MedicalDataRepository } from '../repositories/MedicalDataRepository';
import PatientRepository from '../../patient/repositories/PatientRepository';

export class GetMMSEDataController {
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

      const medicalDataRepository = new MedicalDataRepository();
      const patientRepository = new PatientRepository();
      const getMMSEDataUseCase = new GetMMSEDataUseCase(
        medicalDataRepository,
        patientRepository
      );

      const mmseData = await getMMSEDataUseCase.execute(patientId);

      return res.status(200).json(mmseData);
    } catch (err) {
      next(err);
    }
  }
}

export default GetMMSEDataController;
