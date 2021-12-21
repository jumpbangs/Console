import * as Yup from 'yup';

import { LoginFormValues } from 'domain/misc/login/Login';

/**
 * Validation schema rule for login form
 */
const loginSchema: Yup.ObjectSchema<LoginFormValues> = Yup.object({
  email: Yup.string().email('Email format is not correct').required('Email is a required field'),
  password: Yup.string().required('Password is a required field'),
}).defined();

export default loginSchema;
