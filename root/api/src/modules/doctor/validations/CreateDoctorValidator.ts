import * as yup from 'yup';

export const CreateDoctorValidator = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  crm: yup.string().required('CRM é obrigatório'),
  email: yup
    .string()
    .email('Formato de email inválido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
  username: yup.string().required('Nome de usuário é obrigatório'),
  celphone: yup
    .string()
    .required('Celular é obrigatório')
    .matches(
      /^\(\d{2}\)\s\d\s\d{4}-\d{4}$/,
      'Formato inválido. Use o formato (xx) x xxxx-xxxx'
    ),
});
