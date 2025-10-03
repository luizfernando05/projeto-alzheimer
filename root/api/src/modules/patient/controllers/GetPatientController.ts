import { NextFunction, Request, Response } from 'express';
import PatientRepository from '../repositories/PatientRepository';
import GetPatientUseCase from '../useCases/GetPatientUseCase';

export class GetPatientController {
  async hanlde(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id = req.user?.id;

      const patientRepository = new PatientRepository();
      const getPatientUseCase = new GetPatientUseCase(patientRepository);

      const patient = await getPatientUseCase.execute(id);

      return res.status(200).json(patient);
    } catch (err) {
      next(err);
    }
  }
}

export default GetPatientController;
