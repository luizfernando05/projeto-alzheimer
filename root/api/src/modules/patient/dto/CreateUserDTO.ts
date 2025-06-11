export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  birthDate: Date;
  gender: string;
  state: string;
  ethnicity: string;
  educationLevel: string;
  selfiePhoto?: string;
}
