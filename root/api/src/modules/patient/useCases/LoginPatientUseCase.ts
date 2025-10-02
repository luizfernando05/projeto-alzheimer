import { compare } from 'bcrypt';
import { AppError } from '../../shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { LoginPatientDTO } from '../dto/LoginPatientDTO';
import { IPatientRepository } from '../interfaces/IPatientRepository';

export class LoginPatienteUseCase {
  constructor(private patientRepository: IPatientRepository) {}

  async execute({ email, password }: LoginPatientDTO): Promise<string> {
    const patient = await this.patientRepository.findByEmail(email);

    if (!patient) {
      throw new AppError('Erro de autenticação', 401, {
        email: 'Email não encontrado',
      });
    }

    const passwordCheck = await compare(password, patient.password);

    if (!passwordCheck) {
      throw new AppError('Erro de autenticação', 401, {
        password: 'Senha incorreta',
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new AppError('JWT secret is missing', 500);
    }

    const token = sign({ id: patient.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    console.log(token);

    return token;
  }
}

export default LoginPatienteUseCase;
