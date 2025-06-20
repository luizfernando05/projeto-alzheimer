import { unlink } from 'fs/promises';
import { NextFunction, Request, Response } from 'express';
import { CreatePatientValidator } from '../validations/CreatePatientValidator';
import { PatientRepository } from '../repositories/PatientRepository';
import CreatePatientUseCase from '../useCases/CreatePatientUseCase';
import { handleValidationError } from '../../shared/errors/handleValidationError';
import DoctorRepository from '../../doctor/repositories/DoctorRepository';

export class CreatePatientController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    let selfiePhotoPath: string | undefined;

    try {
      await CreatePatientValidator.validate(req.body, { abortEarly: false });

      const createdByDoctor = req.user?.id;

      const {
        name,
        email,
        password,
        phoneNumber,
        state,
        ethnicity,
        educationLevel,
        birthDate,
        gender,
      } = req.body;

      const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;
      const selfiePhotoFile = files?.['selfiePhoto']?.[0];

      if (selfiePhotoFile) {
        selfiePhotoPath = selfiePhotoFile.path;
      }

      const patientRepository = new PatientRepository();
      const doctorRepository = new DoctorRepository();
      const createPatientUseCase = new CreatePatientUseCase(
        patientRepository,
        doctorRepository
      );

      const patient = await createPatientUseCase.execute({
        name,
        email,
        phoneNumber,
        state,
        password,
        ethnicity,
        educationLevel,
        birthDate,
        gender,
        selfiePhoto: selfiePhotoPath,
        createdByDoctor,
      });

      return res.status(201).json(patient);
    } catch (err) {
      if (selfiePhotoPath) {
        await unlink(selfiePhotoPath).catch(() => {});
      }

      if (handleValidationError(err, next)) return;
      next(err);
    }
  }
}

export default CreatePatientController;
