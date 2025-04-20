import Admin from '../entities/Admin';

export interface IAdminRepository {
  create(admin: Admin): Promise<Admin>;
  findByEmail(email: string): Promise<Admin | null>;
}
