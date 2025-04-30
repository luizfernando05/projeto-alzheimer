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
      throw new AppError('Invalid credentials', 401);
    }

    const passwordCheck = await compare(password, doctor.password);

    if (!passwordCheck) {
      throw new AppError('Wrong password', 401);
    }

    if (!process.env.JWT_SECRET) {
      throw new AppError('JWT secret is missingo', 500);
    }

    const token = sign({ id: doctor.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    console.log(token);

    return token;
  }
}

export default LoginDoctorUseCase;
