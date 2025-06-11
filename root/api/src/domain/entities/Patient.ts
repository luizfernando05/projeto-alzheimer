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
    enum: ['Masculino', 'Feminino', 'Outros', 'Não declarado'],
    default: 'Não declarado',
  })
  gender: 'Masculino' | 'Feminino' | 'Outros' | 'Não declarado';

  @Column({ type: 'varchar', nullable: false })
  state: string;

  @Column({
    type: 'enum',
    enum: ['Branco', 'Preto', 'Amarelo', 'Indígena', 'Outro', 'Não declarado'],
    default: 'Não declarado',
  })
  ethnicity:
    | 'Branco'
    | 'Preto'
    | 'Amarelo'
    | 'Indígena'
    | 'Outro'
    | 'Não declarado';

  @Column({
    name: 'educational_level',
    type: 'enum',
    enum: ['Nenhum', 'Ensino Médio', 'Graduação', 'Pós Graduação'],
  })
  educationLevel: 'Nenhum' | 'Ensino Médio' | 'Graduação' | 'Pós Graduação';

  @Column({ name: 'phone_number', type: 'date', nullable: true })
  phoneNumber: string;

  @Column({ name: 'selfie_photo', type: 'text', nullable: true })
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
