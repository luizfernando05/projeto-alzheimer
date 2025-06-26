import { Between, Repository } from 'typeorm';
import { AppDataSource } from '../../../config/data-source';
import Patient from '../../../domain/entities/Patient';
import { IPatientRepository } from '../interfaces/IPatientRepository';
import { startOfDay, subDays, addDays } from 'date-fns';

export class PatientRepository implements IPatientRepository {
  private ormRepository: Repository<Patient>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Patient);
  }

  async getCountByDateLast7Days(
    doctorId: string
  ): Promise<{ date: string; count: number }[]> {
    const today = startOfDay(new Date());
    const sevenDaysAgo = subDays(today, 6);

    const queryResult = await this.ormRepository
      .createQueryBuilder('patient')
      .select("TO_CHAR(patient.createdAt, 'YYYY-MM-DD')", 'date')
      .addSelect('COUNT(*)', 'count')
      .where('patient.created_by_doctor_id = :doctorId', { doctorId })
      .andWhere('patient.createdAt BETWEEN :start AND :end', {
        start: sevenDaysAgo.toISOString(),
        end: addDays(today, 1).toISOString(),
      })
      .groupBy('date')
      .orderBy('date', 'ASC')
      .getRawMany();

    const fullResult: { date: string; count: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const date = subDays(today, 6 - i)
        .toISOString()
        .slice(0, 10);
      const match = queryResult.find((d) => d.date === date);
      fullResult.push({
        date,
        count: match ? Number(match.count) : 0,
      });
    }

    return fullResult;
  }

  async countByDoctorId(doctorId: string): Promise<number> {
    return this.ormRepository.count({
      where: {
        createdByDoctor: { id: doctorId },
      },
    });
  }

  async countCreatedBetweenDates(
    doctorId: string,
    start: Date,
    end: Date
  ): Promise<number> {
    return this.ormRepository.count({
      where: {
        createdByDoctor: { id: doctorId },
        createdAt: Between(start, end),
      },
    });
  }

  async findByDoctorId(doctorId: string): Promise<Patient[]> {
    return this.ormRepository.find({
      where: { createdByDoctor: { id: doctorId } },
      relations: ['createdByDoctor'],
    });
  }

  async create(patient: Patient): Promise<Patient> {
    const createPatient = this.ormRepository.create(patient);
    return this.ormRepository.save(createPatient);
  }

  async findByEmail(email: string): Promise<Patient | null> {
    return this.ormRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<Patient | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Patient[]> {
    return this.ormRepository.find();
  }

  async findByCelphone(phoneNumber: string): Promise<Patient | null> {
    return this.ormRepository.findOne({ where: { phoneNumber } });
  }

  async update(patient: Patient): Promise<Patient> {
    return this.ormRepository.save(patient);
  }
}
