import * as Yup from 'yup';

import { ChangePasswordFormValues } from 'domain/misc/profile/Profile';

/**
 * Validation schema rule for change password form
 */
const changePasswordSchema: Yup.ObjectSchema<ChangePasswordFormValues> = Yup.object({
  oldPassword: Yup.string().required('Old password is a required field'),
  newPassword: Yup.string()
    .required('New password is a required field')
    .min(8, 'New password should atleast be of 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{6,99}$/,
      'New password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    )
    .test('no old and new password match', "New password can't be same as old password", function (value) {
      return this.parent.oldPassword !== value;
    }),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords does not match')
    .required('Repeat password is a required field'),
}).defined();

export default changePasswordSchema;
