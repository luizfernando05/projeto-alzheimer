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
});
