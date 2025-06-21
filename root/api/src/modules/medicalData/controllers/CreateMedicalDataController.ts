import { NextFunction, Request, Response } from 'express';
import { handleValidationError } from '../../shared/errors/handleValidationError';

import { CreateMedicalDataValidator } from '../validations/CreateMedicalDataValidator';
import { PatientRepository } from '../../patient/repositories/PatientRepository';
import { MedicalDataRepository } from '../repositories/MedicalDataRepository';
import CreateMedicalDataUseCase from '../useCases/CreateMedicalDataUseCase';

export class CreateMedicalDataController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      await CreateMedicalDataValidator.validate(req.body, {
        abortEarly: false,
      });

      const patient_id = req.user?.id;

      const {
        bmi,
        sleep_quality,
        cholesterol_ldl,
        cholesterol_hdl,
        cholesterol_triglycerides,
        mmse,
        functional_assessment,
        memory_complaints,
        behavioral_problems,
        adl,
        date_exam,
      } = req.body;

      const parsedDateExam = new Date(date_exam.split('/').reverse().join('-'));

      const medicalDataRepository = new MedicalDataRepository();
      const patientRepository = new PatientRepository();
      const createMedicalDataUseCase = new CreateMedicalDataUseCase(
        medicalDataRepository,
        patientRepository
      );

      const medicalData = await createMedicalDataUseCase.execute({
        bmi,
        sleep_quality,
        cholesterol_ldl,
        cholesterol_hdl,
        cholesterol_triglycerides,
        mmse,
        functional_assessment,
        memory_complaints,
        behavioral_problems,
        adl,
        date_exam: parsedDateExam,
        patient_id,
      });

      return res.status(201).json(medicalData);
    } catch (err) {
      if (handleValidationError(err, next)) return;
      next(err);
    }
  }
}

export default CreateMedicalDataController;
