import { NextFunction, Request, Response } from 'express';
import DoctorRepository from '../repositories/DoctorRepository';
import CreateDoctorUseCase from '../useCases/CreateDoctorUseCase';
import { CreateDoctorValidator } from '../validations/CreateDoctorValidator';
import { handleValidationError } from '../../shared/errors/handleValidationError';
import { Admin } from 'typeorm';
import AdminRepository from '../../admin/repositories/AdminRepository';

export class CreateDoctorController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      await CreateDoctorValidator.validate(req.body, { abortEarly: false });

      const { name, email, crm, password, createdByAdminId } = req.body;

      const doctorRepository = new DoctorRepository();
      const adminRepository = new AdminRepository();
      const createDoctorUseCase = new CreateDoctorUseCase(
        doctorRepository,
        adminRepository
      );

      const doctor = await createDoctorUseCase.execute({
        name,
        email,
        crm,
        password,
        createdByAdminId,
      });

      return res.status(200).json(doctor);
    } catch (err) {
      if (handleValidationError(err, next)) return;
      next(err);
    }
  }
}
