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

      const { id } = req.params;
      const { name, email, password } = req.body;

      if (!id || !yup.string().uuid().isValidSync(id)) {
        throw new AppError('Erro de validação', 400, { id: 'ID inválido' });
      }

      const doctorRepository = new DoctorRepository();
      const updateDoctorUseCase = new UpdateDoctorUseCase(doctorRepository);

      const updateDoctor = await updateDoctorUseCase.execute({
        id,
        name,
        email,
        password,
      });

      return res.status(200).json(updateDoctor);
    } catch (err) {
      if (handleValidationError(err, next)) return;
      next(err);
    }
  }
}

export default UpdateDoctorController;
