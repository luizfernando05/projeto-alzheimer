import { compare } from 'bcrypt';
import { AppError } from '../../shared/errors/AppError';
import { LoginDoctorDTO } from '../dtos/LoginDoctorDTO';
import { IDoctorRepository } from '../interfaces/IDoctorRepository';
import { sign } from 'jsonwebtoken';

export class LoginDoctorUseCase {
  constructor(private doctorRepository: IDoctorRepository) {}

  async execute({ email, password }: LoginDoctorDTO): Promise<string> {
    const doctor = await this.doctorRepository.findByEmail(email);

    if (!doctor) {
      throw new AppError('Erro de autenticação', 401, {
        email: 'Email não encontrado',
      });
    }

    const passwordCheck = await compare(password, doctor.password);

    if (!passwordCheck) {
      throw new AppError('Erro de autenticação', 401, {
        password: 'Senha incorreta',
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new AppError('JWT secret is missing', 500);
    }

    const token = sign({ id: doctor.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    console.log(token);

    return token;
  }
}

export default LoginDoctorUseCase;
