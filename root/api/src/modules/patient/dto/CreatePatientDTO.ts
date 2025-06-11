export interface CreatePatientDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  birthDate: Date;
  gender: 'Masculino' | 'Feminino' | 'Outros' | 'Não declarado';
  state: string;
  ethnicity:
    | 'Branco'
    | 'Preto'
    | 'Amarelo'
    | 'Indígena'
    | 'Outro'
    | 'Não declarado';
  educationLevel: 'Nenhum' | 'Ensino Médio' | 'Graduação' | 'Pós Graduação';
  selfiePhoto?: string;
  createdByDoctor: string;
}
