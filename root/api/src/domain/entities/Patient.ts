import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Doctor from './Doctor';

export enum PatientGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  NOT_DECLARED = 'NOT_DECLARED',
}

export enum PatientEducationLevel {
  NONE = 'NONE',
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  BACHERLORS = 'BACHERLORS',
  HIGHER = 'HIGHER',
}

export enum PatientEthnicity {
  WHITE = 'WHITE',
  BLACK = 'BLACK',
  BROWN = 'BROWN',
  YWLLOW = 'YELLOW',
  INDIGENOUS = 'INDIGENOUS',
  OTHER = 'OTHER',
  NOT_DECLARED = 'NOT_DECLARED',
}

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ name: 'birth_date', type: 'date', nullable: false })
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: PatientGender,
    default: PatientGender.NOT_DECLARED,
  })
  gender: PatientGender;

  @Column({ type: 'varchar', nullable: false })
  state: string;

  @Column({
    type: 'enum',
    enum: PatientEthnicity,
    default: PatientEthnicity.NOT_DECLARED,
  })
  ethnicity: PatientEthnicity;

  @Column({
    type: 'enum',
    enum: PatientEducationLevel,
    default: PatientEducationLevel.NONE,
  })
  educationLever: PatientEducationLevel;

  @Column({ name: 'phone_number', type: 'date', nullable: true })
  phoneNumber: string;

  @Column({ name: 'selfie_phoro', type: 'text', nullable: true })
  selfiePhoto: string;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'created_by_doctor_id' })
  createdByDoctor: Doctor;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Patient;
