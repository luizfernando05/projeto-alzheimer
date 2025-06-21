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

      const {
        patientId,
        bmi,
        sleepQuality,
        cholesterolLdl,
        cholesterolHdl,
        cholesterolTriglycerides,
        mmse,
        functionalAssessment,
        memoryComplaints,
        behavioralProblems,
        adl,
        dateExam,
        somoking,
        alcoholConsumption,
        physicalActivity,
        dietQuality,
        weight,
        height,
        familyHistory,
        cardiovascularDisease,
        diabetes,
        depression,
        headTrauma,
        hypertension,
        confusion,
        disorientation,
        personalityChanges,
        difficultyCompletingTasks,
        forgetfulness,
        systolicBP,
        diastolicBP,
        cholesterolTotal,
      } = req.body;

      const parsedDateExam = new Date(
        dateExam?.includes('/')
          ? dateExam.split('/').reverse().join('-')
          : dateExam
      );

      const medicalDataRepository = new MedicalDataRepository();
      const patientRepository = new PatientRepository();
      const createMedicalDataUseCase = new CreateMedicalDataUseCase(
        medicalDataRepository,
        patientRepository
      );

      const medicalData = await createMedicalDataUseCase.execute({
        bmi,
        sleepQuality,
        cholesterolLdl,
        cholesterolHdl,
        cholesterolTriglycerides,
        mmse,
        functionalAssessment,
        memoryComplaints,
        behavioralProblems,
        adl,
        dateExam: parsedDateExam,
        patientId,
        somoking,
        alcoholConsumption,
        physicalActivity,
        dietQuality,
        weight,
        height,
        familyHistory,
        cardiovascularDisease,
        diabetes,
        depression,
        headTrauma,
        hypertension,
        confusion,
        disorientation,
        personalityChanges,
        difficultyCompletingTasks,
        forgetfulness,
        systolicBP,
        diastolicBP,
        cholesterolTotal,
      });

      return res.status(201).json(medicalData);
    } catch (err) {
      if (handleValidationError(err, next)) return;
      next(err);
    }
  }
}

export default CreateMedicalDataController;
