import { NextFunction, Request, Response } from 'express';
import AdminRepository from '../repositories/AdminRepository';
import LoginAdminUseCase from '../useCases/LoginAdminUseCase';
import { LoginAdminValidator } from '../validations/LoginAdminValidator';
import { handleValidationError } from '../../shared/errors/handleValidationError';

export class LoginAdminController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      await LoginAdminValidator.validate(req.body, { abortEarly: false });

      const { email, password } = req.body;

      const adminRepository = new AdminRepository();
      const loginAdminUseCase = new LoginAdminUseCase(adminRepository);

      const token = await loginAdminUseCase.execute({ email, password });

      return res.status(200).json({ token });
    } catch (err) {
      if (handleValidationError(err, next)) return;
      next(err);
    }
  }
}
