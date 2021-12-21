import * as Yup from 'yup';

import { ForgotPasswordSubmitFormValues } from 'domain/misc/forgotPassword/ForgotPasswordSubmit';

/**
 * Validation schema rule for forgot password submit form
 */
const forgotPasswordSubmitSchema: Yup.ObjectSchema<ForgotPasswordSubmitFormValues> = Yup.object({
  code: Yup.string().required('Code is a required field'),
  newPassword: Yup.string()
    .required('New password is a required field')
    .min(8, 'New password should atleast be of 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{6,99}$/,
      'New password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords does not match')
    .required('Repeat password is a required field'),
}).defined();

export default forgotPasswordSubmitSchema;
