import { NextFunction, Request, Response } from 'express';
import DoctorRepository from '../repositories/DoctorRepository';
import ListDoctorUseCase from '../useCases/ListDoctorUseCase';

export class ListDoctorController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const doctorRepository = new DoctorRepository();
      const listDoctorUseCase = new ListDoctorUseCase(doctorRepository);

      const doctors = await listDoctorUseCase.execute();

      return res.status(200).json(doctors);
    } catch (err) {
      next(err);
    }
  }
}

export default ListDoctorController;
