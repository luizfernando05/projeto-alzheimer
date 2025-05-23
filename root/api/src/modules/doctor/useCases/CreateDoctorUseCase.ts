import { hash } from 'bcrypt';
import { AppError } from '../../shared/errors/AppError';
import { CreateDoctorDTO } from '../dtos/CreateDoctorDTO';
import Doctor, { DoctorStatus } from '../../../domain/entities/Doctor';
import { IDoctorRepository } from '../interfaces/IDoctorRepository';

export class CreateDoctorUseCase {
  constructor(private doctorRepository: IDoctorRepository) {}

  async execute(data: CreateDoctorDTO): Promise<Doctor> {
    const existingDoctor = await this.doctorRepository.findByEmail(data.email);

    if (existingDoctor) {
      throw new AppError('Erro de validação', 409, {
        email: 'Email já está em uso',
      });
    }

    const existingCRM = await this.doctorRepository.findByCrm(data.crm);

    if (existingCRM) {
      throw new AppError('Erro de validação', 409, {
        crm: 'CRM já está em uso',
      });
    }

    const existingUsername = await this.doctorRepository.findByUsername(
      data.username
    );

    if (existingUsername) {
      throw new AppError('Erro de validação', 409, {
        username: 'Usuário já está em uso',
      });
    }

    const existingCelphone = await this.doctorRepository.findByCelphone(
      data.celphone
    );

    if (existingCelphone) {
      throw new AppError('Erro de validação', 409, {
        celphone: 'Telefone já está em uso',
      });
    }

    const hashedPassword = await hash(data.password, 10);

    const doctor = new Doctor();
    doctor.name = data.name;
    doctor.email = data.email;
    doctor.crm = data.crm;
    doctor.username = data.username;
    doctor.celphone = data.celphone;
    doctor.password = hashedPassword;
    doctor.crmPhoto = data.crmPhoto;
    doctor.selfiePhoto = data.selfiePhoto;
    doctor.status = DoctorStatus.PENDING;

    return this.doctorRepository.create(doctor);
  }
}

export default CreateDoctorUseCase;
