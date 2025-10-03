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
import { GenderStatsDTO } from '../dto/GenderStatsDTO';
import { Prediction } from '../../../domain/entities/Prediction';
import { PredictionResult } from '../../prediction/types/PredictionTypes';
import { PredictionSummaryResponseDTO } from '../dto/GetDoctorPredictionsSummaryDTO';
import MedicalData from '../../../domain/entities/MedicalData';
import { PositiveByDayDTO } from '../dto/PositiveByDayDTO';

export class PatientRepository implements IPatientRepository {
  private ormRepository: Repository<Patient>;
  private predictRepository: Repository<Prediction>;
  private medicalDataRepository: Repository<MedicalData>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Patient);
    this.predictRepository = AppDataSource.getRepository(Prediction);
    this.medicalDataRepository = AppDataSource.getRepository(MedicalData);
  }

  async findAllInfosById(id: string): Promise<Patient | null> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['medicalData', 'medicalData.predictions'],
    });
  }

  async getPositiveByDay(doctorId: string): Promise<PositiveByDayDTO[]> {
    const result = await this.predictRepository
      .createQueryBuilder('prediction')
      .select("TO_CHAR(prediction.created_at, 'YYYY-MM-DD')", 'date')
      .addSelect('COUNT(prediction.id)', 'diagnoses')
      .innerJoin('prediction.medicalData', 'md')
      .innerJoin('md.patientId', 'patient')
      .innerJoin('patient.createdByDoctor', 'doctor')
      .where('doctor.id = :doctorId', { doctorId })
      .andWhere('prediction.prediction_result = :positive', {
        positive: PredictionResult.POSITIVE,
      })
      .groupBy('date')
      .orderBy('date', 'ASC')
      .getRawMany();

    return result.map((row) => ({
      date: row.date,
      diagnoses: parseInt(row.diagnoses, 10),
    }));
  }

  async getSummaryByDoctorId(
    doctorId: string
  ): Promise<PredictionSummaryResponseDTO[]> {
    const result = await this.predictRepository
      .createQueryBuilder('prediction')
      .select('prediction.prediction_result', 'name')
      .addSelect('COUNT(prediction.id)', 'value')
      .innerJoin('prediction.medicalData', 'md')
      .innerJoin('md.patientId', 'patient')
      .innerJoin('patient.createdByDoctor', 'doctor')
      .where('doctor.id = :doctorId', { doctorId })
      .andWhere('prediction.prediction_result IS NOT NULL')
      .groupBy('prediction.prediction_result')
      .getRawMany();

    return result.map((row) => ({
      name: row.name,
      value: parseInt(row.value, 10),
    }));
  }

  async getPositiveByGender(doctorId: string): Promise<GenderStatsDTO> {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const femaleTotal = await this.predictRepository.count({
      where: {
        prediction_result: PredictionResult.POSITIVE,
        medicalData: {
          patientId: { gender: 'Feminino', createdByDoctor: { id: doctorId } },
        },
      },
    });

    const maleTotal = await this.predictRepository.count({
      where: {
        prediction_result: PredictionResult.POSITIVE,
        medicalData: {
          patientId: { gender: 'Masculino', createdByDoctor: { id: doctorId } },
        },
      },
    });

    const femaleLastWeek = await this.predictRepository.count({
      where: {
        prediction_result: PredictionResult.POSITIVE,
        created_at: Between(lastWeek, today),
        medicalData: {
          patientId: { gender: 'Feminino', createdByDoctor: { id: doctorId } },
        },
      },
    });

    const maleLastWeek = await this.predictRepository.count({
      where: {
        prediction_result: PredictionResult.POSITIVE,
        created_at: Between(lastWeek, today),
        medicalData: {
          patientId: { gender: 'Masculino', createdByDoctor: { id: doctorId } },
        },
      },
    });

    const femaleVariation =
      femaleTotal > 0 ? (femaleLastWeek / femaleTotal) * 100 : 0;
    const maleVariation = maleTotal > 0 ? (maleLastWeek / maleTotal) * 100 : 0;

    return {
      female: {
        total: femaleTotal,
        variation: parseFloat(femaleVariation.toFixed(2)),
      },
      male: {
        total: maleTotal,
        variation: parseFloat(maleVariation.toFixed(2)),
      },
    };
  }

  async findByIdAndDoctor(
    patientId: string,
    doctorId: string
  ): Promise<Patient | null> {
    return this.ormRepository.findOne({
      where: {
        id: patientId,
        createdByDoctor: { id: doctorId },
      },
      relations: ['createdByDoctor', 'medicalData'],
    });
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
    const { entities } = await this.ormRepository
      .createQueryBuilder('patient')
      .leftJoinAndSelect('patient.createdByDoctor', 'doctor')
      .leftJoinAndSelect('patient.medicalData', 'medicalData')
      .leftJoinAndMapOne(
        'patient.lastPrediction',
        Prediction,
        'prediction',
        'prediction.medical_data_id = medicalData.id'
      )
      .where('patient.created_by_doctor_id = :doctorId', { doctorId })
      .orderBy('patient.createdAt', 'DESC')
      .addOrderBy('prediction.created_at', 'DESC')
      .getRawAndEntities();
    return entities;
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
