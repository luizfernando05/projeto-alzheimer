import { AppError } from '../../shared/errors/AppError';
import { IPatientRepository } from '../interfaces/IPatientRepository';

interface UpdatePatientProfileRequest {
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  state: string;
  ethnicity: string;
  educationLevel: string;
}

export class UpdatePatientProfileUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute(
    patientId: string,
    data: UpdatePatientProfileRequest
  ): Promise<void> {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new AppError('Paciente não encontrado', 404);
    }

    // Validar se o email já não está sendo usado por outro paciente
    if (data.email !== patient.email) {
      const existingPatient = await this.patientRepository.findByEmail(
        data.email
      );
      if (existingPatient && existingPatient.id !== patientId) {
        throw new AppError(
          'Este email já está sendo usado por outro paciente',
          400
        );
      }
    }

    let birthDate = patient.birthDate;
    const patientBirthDateStr =
      patient.birthDate instanceof Date
        ? `${('0' + patient.birthDate.getDate()).slice(-2)}/${('0' + (patient.birthDate.getMonth() + 1)).slice(-2)}/${patient.birthDate.getFullYear()}`
        : patient.birthDate;
    if (data.birthDate && data.birthDate !== patientBirthDateStr) {
      try {
        const [day, month, year] = data.birthDate.split('/');
        birthDate = new Date(`${year}-${month}-${day}`);
      } catch (error) {
        throw new AppError('Formato de data inválido. Use DD/MM/AAAA', 400);
      }
    }

    // Atualizar os dados do paciente
    patient.name = data.name;
    patient.email = data.email;
    patient.phoneNumber = data.phoneNumber;
    patient.birthDate = birthDate;
    const allowedGenders = [
      'Masculino',
      'Feminino',
      'Outros',
      'Não declarado',
    ] as const;
    if (
      !allowedGenders.includes(data.gender as (typeof allowedGenders)[number])
    ) {
      throw new AppError('Gênero inválido', 400);
    }
    patient.gender = data.gender as (typeof allowedGenders)[number];
    patient.state = data.state;
    const allowedEthnicities = [
      'Branco',
      'Preto',
      'Amarelo',
      'Indígena',
      'Outro',
      'Não declarado',
    ] as const;
    if (
      !allowedEthnicities.includes(
        data.ethnicity as (typeof allowedEthnicities)[number]
      )
    ) {
      throw new AppError('Etnia inválida', 400);
    }
    patient.ethnicity = data.ethnicity as (typeof allowedEthnicities)[number];
    const allowedEducationLevels = [
      'Nenhum',
      'Ensino Médio',
      'Graduação',
      'Pós Graduação',
    ] as const;
    if (
      !allowedEducationLevels.includes(
        data.educationLevel as (typeof allowedEducationLevels)[number]
      )
    ) {
      throw new AppError('Nível de escolaridade inválido', 400);
    }
    patient.educationLevel =
      data.educationLevel as (typeof allowedEducationLevels)[number];
    patient.updatedAt = new Date();

    await this.patientRepository.save(patient);
  }
}

export default UpdatePatientProfileUseCase;
