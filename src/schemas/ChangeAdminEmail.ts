import * as Yup from 'yup';

import { ChangeAdminEmailFormValues } from 'domain/misc/profile/Profile';

/**
 * Validation schema rule for change admin email form.
 */
const ChangeAdminEmailSchema: Yup.ObjectSchema<ChangeAdminEmailFormValues> = Yup.object({
  email: Yup.string().email('Email field should contain a valid email').trim().required('Email is required'),
}).defined();

export default ChangeAdminEmailSchema;
