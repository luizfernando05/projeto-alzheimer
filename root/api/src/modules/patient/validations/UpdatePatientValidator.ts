import * as Yup from 'yup';

export const UpdatePatientValidator = Yup.object().shape({
  name: Yup.string().min(3, 'Nome muito curto.'),
  birthDate: Yup.date(),
  gender: Yup.mixed<
    'Masculino' | 'Feminino' | 'Outros' | 'Não declarado'
  >().oneOf(['Masculino', 'Feminino', 'Outros', 'Não declarado']),
  state: Yup.string(),
  phoneNumber: Yup.string().min(8, 'Telefone muito curto.'),
  email: Yup.string().email('Email inválido.'),
  password: Yup.string().min(6, 'Senha muito curta.'),
  educationalLevel: Yup.mixed<
    'Nenhum' | 'Ensino Médio' | 'Graduação' | 'Pós Graduação'
  >().oneOf(['Nenhum', 'Ensino Médio', 'Graduação', 'Pós Graduação']),
  ethnicity: Yup.mixed<
    'Branco' | 'Preto' | 'Amarelo' | 'Indígena' | 'Outro' | 'Não declarado'
  >().oneOf([
    'Branco',
    'Preto',
    'Amarelo',
    'Indígena',
    'Outro',
    'Não declarado',
  ]),
});
