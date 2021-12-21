import * as Yup from 'yup';

import { ChangeAdminNameFormValues } from 'domain/misc/profile/Profile';

/**
 * Validation schema rule for change admin name form.
 */
const ChangeAdminNameSchema: Yup.ObjectSchema<ChangeAdminNameFormValues> = Yup.object({
  name: Yup.string().trim().required('Name is required').max(100, 'Name should contain less than 100 characters'),
}).defined();

export default ChangeAdminNameSchema;
