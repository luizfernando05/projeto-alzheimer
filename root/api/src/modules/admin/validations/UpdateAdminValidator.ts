import * as yup from 'yup';

export const UpdateAdminValidator = yup.object().shape({
  name: yup.string().min(3, 'Name must be at least 3 characters long.'),
  email: yup.string().email('Invalid email format.'),
  password: yup.string().min(6, 'Password must be at least 6 characters long.'),
});
