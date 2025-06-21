import * as yup from 'yup';

export const CreatePatientValidator = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  birthDate: yup.string().required('Data de nascimento é obrigatório'),
  gender: yup.string().required('Gênero é obrigatório'),
  state: yup.string().required('Estado é obrigatório'),
  ethnicity: yup.string().required('Cor/raça é obrigatório'),
  educationLevel: yup.string().required('Nível educacional é obrigatório'),
  email: yup
    .string()
    .email('Formato de email inválido')
    .required('Email é obrigatório'),
  phoneNumber: yup
    .string()
    .required('Celular é obrigatório')
    .matches(
      /^\(\d{2}\)\s\d\s\d{4}-\d{4}$/,
      'Formato inválido. Use o formato (xx) x xxxx-xxxx'
    ),
});
