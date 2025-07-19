export interface UpdatePatientDTO {
  id: string;
  name?: string;
  birthDate?: Date;
  gender: 'Masculino' | 'Feminino' | 'Outros' | 'Não declarado';
  state?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  educationalLevel: 'Nenhum' | 'Ensino Médio' | 'Graduação' | 'Pós Graduação';
  ethnicity:
    | 'Branco'
    | 'Preto'
    | 'Amarelo'
    | 'Indígena'
    | 'Outro'
    | 'Não declarado';
}
