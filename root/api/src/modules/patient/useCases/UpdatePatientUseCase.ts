import { hash } from 'bcrypt';
import { AppError } from '../../shared/errors/AppError';
import Patient from '../../../domain/entities/Patient';
import { UpdatePatientDTO } from '../dto/UpdatePatientDTO';
import { IPatientRepository } from '../interfaces/IPatientRepository';

export class UpdatePatientUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(data: UpdatePatientDTO): Promise<Patient> {
    const {
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
    } = data;

    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new AppError('Erro ao atualizar paciente', 404, {
        id: 'Paciente não encontrado',
      });
    }

    if (email && email !== patient.email) {
      const emailInUse = await this.patientRepository.findByEmail(email);
      if (emailInUse) {
        throw new AppError('Erro de validação', 409, {
          email: 'Email já está em uso',
        });
      }

      patient.email = email;
    }

    if (name) patient.name = name;
    if (birthDate) patient.birthDate = birthDate;
    if (gender) patient.gender = gender;
    if (state) patient.state = state;
    if (phoneNumber) patient.phoneNumber = phoneNumber;
    if (educationLevel) patient.educationLevel = educationLevel;
    if (ethnicity) patient.ethnicity = ethnicity;

    if (password) {
      const hashedPassword = await hash(password, 10);
      patient.password = hashedPassword;
    }

    return this.patientRepository.update(patient);
  }
}

export default UpdatePatientUseCase;
