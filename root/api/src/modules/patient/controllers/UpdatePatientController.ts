import { NextFunction, Request, Response } from 'express';
import { UpdatePatientValidator } from '../validations/UpdatePatientValidator';
import { handleValidationError } from '../../shared/errors/handleValidationError';
import * as yup from 'yup';
import { AppError } from '../../shared/errors/AppError';
import PatientRepository from '../repositories/PatientRepository';
import UpdatePatientUseCase from '../useCases/UpdatePatientUseCase';

export class UpdatePatientController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      await UpdatePatientValidator.validate(req.body, { abortEarly: false });

      const { id } = req.params;
      const {
        name,
        birthDate,
        gender,
        state,
        phoneNumber,
        email,
        password,
        educationLevel,
        ethnicity,
      } = req.body;

      if (!id || !yup.string().uuid().isValidSync(id)) {
        throw new AppError('Erro de validação', 400, { id: 'ID inválido' });
      }

      const patientRepository = new PatientRepository();
      const updatePatientUseCase = new UpdatePatientUseCase(patientRepository);

      const updatedPatient = await updatePatientUseCase.execute({
        id,
        name,
        birthDate,
        gender,
        state,
        phoneNumber,
        email,
        password,
        educationLevel,
        ethnicity,
      });

      return res.status(200).json(updatedPatient);
    } catch (err) {
      if (handleValidationError(err, next)) return;
      next(err);
    }
  }
}

export default UpdatePatientController;
