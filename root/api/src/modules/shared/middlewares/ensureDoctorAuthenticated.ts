import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { verify } from 'jsonwebtoken';
import { ITokenPayload } from '../../../interfaces/ITokenPayload';
import DoctorRepository from '../../doctor/repositories/DoctorRepository';

export const ensureDoctorAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.auth_token;

  if (!token) {
    return next(new AppError('JWT token is missing.', 401));
  }

  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET || 'default'
    ) as ITokenPayload;

    const doctorRepository = new DoctorRepository();
    const doctor = await doctorRepository.findById(decoded.id);

    if (!doctor) {
      return next(new AppError('User does not have doctor privileges.', 403));
    }

    req.user = { id: decoded.id, role: 'doctor' };
    return next();
  } catch {
    return next(new AppError('Invalid JWT token.', 401));
  }
};
