import * as Yup from 'yup';

import { CreatePasswordFormValues } from 'domain/misc/create-password/CreatePassword';

/**
 * Validation schema rule for create password form
 */
const createPasswordSchema: Yup.ObjectSchema<CreatePasswordFormValues> = Yup.object({
  password: Yup.string()
    .required('Password is a required field')
    .min(8, 'Password should atleast be of 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{6,99}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords does not match')
    .required('Repeat password is a required field'),
}).defined();

export default createPasswordSchema;
