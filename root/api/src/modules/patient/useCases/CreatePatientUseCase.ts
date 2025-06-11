import { hash } from 'bcrypt';
import Patient from '../../../domain/entities/Patient';
import { AppError } from '../../shared/errors/AppError';
import { IPatientRepository } from '../interfaces/IPatientRepository';
import { CreatePatientDTO } from '../dto/CreatePatientDTO';

export class CreatePatientUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(data: CreatePatientDTO): Promise<Patient> {
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
    patient.phoneNumber = { phoneNumber: data.phoneNumber } as any;
    patient.selfiePhoto = { selfiePhoto: data.selfiePhoto } as any;
    patient.educationLevel = data.educationLevel;
    patient.ethnicity = data.ethnicity;
    patient.gender = data.gender;
    patient.state = data.state;
    patient.password = hashedPassword;
    patient.createdByDoctor = { doctorId: data.createdByDoctor } as any;

    return this.patientRepository.create(patient);
  }
}

export default CreatePatientUseCase;
