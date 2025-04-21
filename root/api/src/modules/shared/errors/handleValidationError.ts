import { NextFunction } from 'express';
import { ValidationError } from 'yup';
import { AppError } from './AppError';

export function handleValidationError(
  err: unknown,
  next: NextFunction
): boolean {
  if (err instanceof ValidationError) {
    const errorMessage = err.errors.join(', ');
    next(new AppError(errorMessage, 400));
    return true;
  }

  return false;
}
