import Doctor, { DoctorStatus } from '../../../domain/entities/Doctor';
import { AppError } from '../../shared/errors/AppError';
import { UpdateDoctorStatusDTO } from '../dtos/UpdateDoctorStatusDTO';
import { IDoctorRepository } from '../interfaces/IDoctorRepository';

export class UpdateDoctorStatusUseCase {
  constructor(private doctorRepository: IDoctorRepository) {}

  async execute(data: UpdateDoctorStatusDTO): Promise<Doctor> {
    const { id, status, rejectionReason } = data;

    const doctor = await this.doctorRepository.findById(id);

    if (!doctor) {
      throw new AppError('Erro ao atualizar médico', 404, {
        id: 'Médico não encontrado',
      });
    }

    if (status === DoctorStatus.REJECTED && !rejectionReason) {
      throw new AppError('Motivo da rejeição é obrigatório', 400, {
        rejectionReason: 'Informe o motivo da rejeição do médico',
      });
    }

    doctor.status = status as DoctorStatus;
    doctor.rejectionReason =
      status === DoctorStatus.REJECTED ? rejectionReason : undefined;

    return await this.doctorRepository.update(doctor);
  }
}
