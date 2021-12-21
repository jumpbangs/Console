import * as Yup from 'yup';

import { ForgotPasswordFormValues } from 'domain/misc/forgotPassword/ForgotPassword';

/**
 * Validation schema rule for forgot password form
 */
const forgotPasswordSchema: Yup.ObjectSchema<ForgotPasswordFormValues> = Yup.object({
  email: Yup.string().email('Email format is not correct').required('Email is a required field'),
}).defined();

export default forgotPasswordSchema;
