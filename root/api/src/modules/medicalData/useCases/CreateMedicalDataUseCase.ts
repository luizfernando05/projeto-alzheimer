import { hash } from 'bcrypt';
import MedicalData from '../../../domain/entities/MedicalData';
import { AppError } from '../../shared/errors/AppError';
import { IMedicalDataRepository } from '../interfaces/IMedicalDataRepository';
import { CreateMedicalDataDTO } from '../dto/CreateMedicalDataDTO';
import { IPatientRepository } from '../../patient/interfaces/IPatientRepository';

export class CreateMedicalDataUseCase {
  constructor(
    private medicalDataRepository: IMedicalDataRepository,
    private patientRepository: IPatientRepository
  ) {}

  async execute(data: CreateMedicalDataDTO): Promise<MedicalData> {
    const existingPatient = await this.patientRepository.findById(
      data.patient_id
    );

    if (!existingPatient) {
      throw new AppError('Patient not found.', 404);
    }

    const medicalData = new MedicalData();
    medicalData.bmi = data.bmi;
    medicalData.sleep_quality = data.sleep_quality;
    medicalData.cholesterol_ldl = data.cholesterol_ldl;
    medicalData.cholesterol_hdl = data.cholesterol_hdl;
    medicalData.cholesterol_triglycerides = data.cholesterol_triglycerides;
    medicalData.mmse = data.mmse;
    medicalData.functional_assessment = data.functional_assessment;
    medicalData.memory_complaints = data.memory_complaints;
    medicalData.behavioral_problems = data.behavioral_problems;
    medicalData.adl = data.adl;
    medicalData.date_exam = data.date_exam;
    medicalData.patientId = { id: data.patient_id } as any;

    return this.medicalDataRepository.create(MedicalData);
  }
}

export default CreateMedicalDataUseCase;
