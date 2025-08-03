import { NextFunction, Request, Response } from 'express';
import { UpdateDoctorValidator } from '../validations/UpdateDoctorValidator';
import { handleValidationError } from '../../shared/errors/handleValidationError';
import * as yup from 'yup';
import { AppError } from '../../shared/errors/AppError';
import DoctorRepository from '../repositories/DoctorRepository';
import UpdateDoctorUseCase from '../useCases/UpdateDoctorUseCase';

export class UpdateDoctorController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      await UpdateDoctorValidator.validate(req.body, { abortEarly: false });

      const id = req.user?.id;
      const { name, email, username, password, celphone } = req.body;

      const doctorRepository = new DoctorRepository();
      const updateDoctorUseCase = new UpdateDoctorUseCase(doctorRepository);

      const updateDoctor = await updateDoctorUseCase.execute({
        id,
        name,
        username,
        email,
        password,
        celphone,
      });

      return res.status(200).json(updateDoctor);
    } catch (err) {
      if (handleValidationError(err, next)) return;
      next(err);
    }
  }
}

export default UpdateDoctorController;
