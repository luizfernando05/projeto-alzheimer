import { NextFunction, Request, Response } from 'express';
import DoctorRepository from '../repositories/DoctorRepository';
import { UpdateDoctorStatusUseCase } from '../useCases/UpdateDoctorStatusUseCase';

export class UpdateDoctorStatusController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const { status, rejectionReason } = req.body;

      const doctorRepository = new DoctorRepository();
      const updateDoctorStatusUseCase = new UpdateDoctorStatusUseCase(
        doctorRepository
      );

      const doctor = await updateDoctorStatusUseCase.execute({
        id,
        status,
        rejectionReason,
      });

      return res.status(200).json(doctor);
    } catch (err) {
      next(err);
    }
  }
}
