import { hash } from 'bcrypt';
import Doctor from '../../../domain/entities/Doctor';
import { AppError } from '../../shared/errors/AppError';
import { UpdateDoctorDTO } from '../dtos/UpdateDoctorDTO';
import { IDoctorRepository } from '../interfaces/IDoctorRepository';

export class UpdateDoctorUseCase {
  constructor(private doctorRepository: IDoctorRepository) {}

  async execute(data: UpdateDoctorDTO): Promise<Doctor> {
    const { id, name, username, email, password, celphone } = data;

    const doctor = await this.doctorRepository.findById(id);

    if (!doctor) {
      throw new AppError('Erro ao atualizar médico', 404, {
        id: 'Médico não encontrado',
      });
    }

    if (email && email !== doctor.email) {
      const emailInUse = await this.doctorRepository.findByEmail(email);

      if (emailInUse) {
        throw new AppError('Erro de validação', 409, {
          email: 'Email já está em uso',
        });
      }

      doctor.email = email;
    }

    if (username && username !== doctor.username) {
      const emailInUse = await this.doctorRepository.findByUsername(username);

      if (emailInUse) {
        throw new AppError('Erro de validação', 409, {
          username: 'Username já está em uso',
        });
      }

      doctor.username = username;
    }

    if (celphone && celphone !== doctor.celphone) {
      const celphoneInUse =
        await this.doctorRepository.findByCelphone(celphone);

      if (celphoneInUse) {
        throw new AppError('Erro de validação', 409, {
          celphone: 'Telefone já está em uso',
        });
      }

      doctor.celphone = celphone;
    }

    if (name) {
      doctor.name = name;
    }

    if (password) {
      const hashedPassword = await hash(password, 10);
      doctor.password = hashedPassword;
    }

    return this.doctorRepository.update(doctor);
  }
}

export default UpdateDoctorUseCase;
