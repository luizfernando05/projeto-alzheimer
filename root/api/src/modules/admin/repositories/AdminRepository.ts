import { Repository } from 'typeorm';
import Admin from '../../../domain/entities/Admin';
import { IAdminRepository } from '../interfaces/IAdminRepository';
import { AppDataSource } from '../../../config/data-source';

export class AdminRepository implements IAdminRepository {
  private ormRepository: Repository<Admin>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Admin);
  }

  async create(admin: Admin): Promise<Admin> {
    const createAdmin = this.ormRepository.create(admin);
    return this.ormRepository.save(createAdmin);
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return this.ormRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<Admin | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  async update(admin: Admin): Promise<Admin> {
    return this.ormRepository.save(admin);
  }
}

export default AdminRepository;
