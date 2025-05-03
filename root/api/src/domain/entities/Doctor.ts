import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Admin } from './Admin';

export enum DoctorStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  crm: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: false, name: 'crm_photo' })
  crmPhoto: string;

  @Column({ type: 'text', nullable: false, name: 'selfie_photo' })
  selfiePhoto: string;

  @Column({ type: 'enum', enum: DoctorStatus, default: DoctorStatus.PENDING })
  status: DoctorStatus;

  @Column({ type: 'text', nullable: true, name: 'rejection_reason' })
  rejectionReason?: string;

  @ManyToOne(() => Admin, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'approved_by_admin' })
  approvedByAdmin?: Admin;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Doctor;
