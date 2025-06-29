import { NextFunction, Request, Response } from 'express';
import DoctorRepository from '../repositories/DoctorRepository';
import GetDoctorUseCase from '../useCases/GetDoctorUseCase';

export class GetDoctorController {
  async hanlde(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id = req.user?.id;

      const doctorRepository = new DoctorRepository();
      const getDoctorUseCase = new GetDoctorUseCase(doctorRepository);

      const doctor = await getDoctorUseCase.execute(id);

      return res.status(200).json(doctor);
    } catch (err) {
      next(err);
    }
  }
}

export default GetDoctorController;
