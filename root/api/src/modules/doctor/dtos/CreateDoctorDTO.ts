import Admin from "../../../domain/entities/Admin";

export interface CreateDoctorDTO {
    name: string;
    email: string;
    crm: string;
    password: string;
    created_by_admin_id: Admin;
  }
  