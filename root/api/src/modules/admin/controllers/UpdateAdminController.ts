import { NextFunction, Request, Response } from 'express';
import { UpdateAdminValidator } from '../validations/UpdateAdminValidator';
import { handleValidationError } from '../../shared/errors/handleValidationError';
import * as yup from 'yup';
import { AppError } from '../../shared/errors/AppError';
import AdminRepository from '../repositories/AdminRepository';
import UpdateAdminUseCase from '../useCases/UpdateAdminUseCase';

export class UpdateAdminController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      await UpdateAdminValidator.validate(req.body, { abortEarly: false });

      const { id } = req.params;
      const { name, email, password } = req.body;

      if (!id || !yup.string().uuid().isValidSync(id)) {
        throw new AppError('Invalid ID.', 400);
      }

      const adminRepository = new AdminRepository();
      const updateAdminUseCase = new UpdateAdminUseCase(adminRepository);

      const updateAdmin = await updateAdminUseCase.execute({
        id,
        name,
        email,
        password,
      });

      return res.status(200).json(updateAdmin);
    } catch (err) {
      if (handleValidationError(err, next)) return;
      next(err);
    }
  }
}

export default UpdateAdminController;
