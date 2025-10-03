import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { verify } from 'jsonwebtoken';
import { ITokenPayload } from '../../../interfaces/ITokenPayload';
import PatientRepository from '../../patient/repositories/PatientRepository';

export const ensurePatientAuthenticated = async (
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

    const patientRepository = new PatientRepository();
    const patient = await patientRepository.findById(decoded.id);

    if (!patient) {
      return next(new AppError('User does not have patient privileges.', 403));
    }

    req.user = { id: decoded.id, role: 'patient' };
    return next();
  } catch {
    return next(new AppError('Invalid JWT token.', 401));
  }
};
