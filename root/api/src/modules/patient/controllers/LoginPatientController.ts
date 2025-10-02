import { NextFunction, Request, Response } from 'express';
import { handleValidationError } from '../../shared/errors/handleValidationError';
import PatientRepository from '../repositories/PatientRepository';
import LoginPatienteUseCase from '../useCases/LoginPatientUseCase';

export class LoginPatientController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      // await LoginPatientValidator.validate(req.body, { abortEarly: false });

      const { email, password } = req.body;

      const doctorRepository = new PatientRepository();
      const loginPatientUseCase = new LoginPatienteUseCase(doctorRepository);

      const token = await loginPatientUseCase.execute({ email, password });

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
