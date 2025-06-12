import { hash } from 'bcrypt';
import Patient from '../../../domain/entities/Patient';
import { AppError } from '../../shared/errors/AppError';
import { IPatientRepository } from '../interfaces/IPatientRepository';
import { CreatePatientDTO } from '../dto/CreatePatientDTO';
import { IDoctorRepository } from '../../doctor/interfaces/IDoctorRepository';

export class CreatePatientUseCase {
  constructor(
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository
  ) {}

  async execute(data: CreatePatientDTO): Promise<Patient> {
    const existingDoctor = await this.doctorRepository.findById(
      data.createdByDoctor
    );

    if (!existingDoctor) {
      throw new AppError('Doctor not found.', 404);
    }

    const existingPatient = await this.patientRepository.findByEmail(
      data.email
    );

    if (existingPatient) {
      throw new AppError('Erro de validação', 409, {
        email: 'Email já está em uso',
      });
    }

    const hashedPassword = await hash(data.password, 10);

    const patient = new Patient();
    patient.name = data.name;
    patient.email = data.email;
    patient.birthDate = data.birthDate;

    if (data.phoneNumber) {
      patient.phoneNumber = data.phoneNumber;
    }

    if (data.selfiePhoto) {
      patient.selfiePhoto = data.selfiePhoto;
    }

    patient.educationLevel = data.educationLevel;
    patient.ethnicity = data.ethnicity;
    patient.gender = data.gender;
    patient.state = data.state;
    patient.password = hashedPassword;
    patient.createdByDoctor = { id: data.createdByDoctor } as any;

    return this.patientRepository.create(patient);
  }
}

export default CreatePatientUseCase;
