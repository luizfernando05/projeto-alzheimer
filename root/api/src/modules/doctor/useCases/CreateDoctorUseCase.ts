import { hash } from 'bcrypt';
import { AppError } from '../../shared/errors/AppError';
import { CreateDoctorDTO } from '../dtos/CreateDoctorDTO';
import Doctor from '../../../domain/entities/Doctor';
import { IDoctorRepository } from '../interfaces/IDoctorRepository';
import { IAdminRepository } from '../../admin/interfaces/IAdminRepository';

export class CreateDoctorUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private adminRepository: IAdminRepository
  ) {}

  async execute(data: CreateDoctorDTO): Promise<Doctor> {
    const existingAdmin = await this.adminRepository.findById(
      data.createdByAdminId
    );

    if (!existingAdmin) {
      throw new AppError('Admin not found', 409);
    }

    const existingDoctor = await this.doctorRepository.findByEmail(data.email);

    if (existingDoctor) {
      throw new AppError('Email already in use', 409);
    }

    const hashedPassword = await hash(data.password, 10);

    const doctor = new Doctor();
    doctor.name = data.name;
    doctor.email = data.email;
    doctor.crm = data.crm;
    doctor.password = hashedPassword;
    doctor.createdByAdminId = { id: data.createdByAdminId } as any;

    return this.doctorRepository.create(doctor);
  }
}

export default CreateDoctorUseCase;
