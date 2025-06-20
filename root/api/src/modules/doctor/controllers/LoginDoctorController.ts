import { NextFunction, Request, Response } from 'express';
import DoctorRepository from '../repositories/DoctorRepository';
import LoginDoctorUseCase from '../useCases/LoginDoctorUseCase';
import { LoginDoctorValidator } from '../validations/LoginDoctorValidator';
import { handleValidationError } from '../../shared/errors/handleValidationError';

export class LoginDoctorController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      await LoginDoctorValidator.validate(req.body, { abortEarly: false });

      const { email, password } = req.body;

      const doctorRepository = new DoctorRepository();
      const loginDoctorUseCase = new LoginDoctorUseCase(doctorRepository);

      const token = await loginDoctorUseCase.execute({ email, password });

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ message: 'Login realizado com sucesso' });
    } catch (err) {
      if (handleValidationError(err, next)) return;
      next(err);
    }
  }
}
