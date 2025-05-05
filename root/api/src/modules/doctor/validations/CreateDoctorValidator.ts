import * as yup from 'yup';

export const CreateDoctorValidator = yup.object().shape({
  name: yup.string().required('Name is required'),
  crm: yup.string().required('CRM is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  username: yup.string().required('Username is required'),
  celphone: yup
    .string()
    .required('Cellphone is required')
    .matches(
      /^(\(\d{2}\)\s?\d{5}-\d{4})$/,
      'Invalid format. Please enter in the format (xx)xxxxx-xxxx'
    ),
});
