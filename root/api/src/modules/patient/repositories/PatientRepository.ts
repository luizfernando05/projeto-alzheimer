import {
  Between,
  FindOptionsWhere,
  ILike,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { AppDataSource } from '../../../config/data-source';
import Patient from '../../../domain/entities/Patient';
import { IPatientRepository } from '../interfaces/IPatientRepository';
import { startOfDay, subDays, addDays, min } from 'date-fns';

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
      order: { createdAt: 'DESC' },
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

  async findByDoctorWithFilters(
    doctorId: string,
    {
      page = 1,
      limit = 10,
      gender,
      name,
      minAge,
      maxAge,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    }: any
  ): Promise<{ data: Patient[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: FindOptionsWhere<Patient> = {
      createdByDoctor: { id: doctorId },
    };

    if (gender) where.gender = gender;
    if (name) where.name = ILike(`%${name}%`);

    if (startDate && endDate) {
      where.createdAt = Between(new Date(startDate), new Date(endDate));
    } else if (startDate) {
      where.createdAt = MoreThanOrEqual(new Date(startDate));
    } else if (endDate) {
      where.createdAt = MoreThanOrEqual(new Date(endDate));
    }

    const [data, total] = await this.ormRepository.findAndCount({
      where,
      order: { [sortBy]: sortOrder },
      skip,
      take: limit,
    });

    const filtered = data.filter((patient) => {
      if (!patient.birthDate) return true;

      const age = Math.floor(
        (Date.now() - new Date(patient.birthDate).getTime()) /
          (1000 * 60 * 60 * 24 * 365.25)
      );

      return (!minAge || age >= minAge) && (!maxAge || age <= maxAge);
    });

    return { data: filtered, total };
  }
}

export default PatientRepository;
