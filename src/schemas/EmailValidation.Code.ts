import * as Yup from 'yup';

import { EmailValidationFormValues } from 'domain/misc/profile/Profile';

/**
 * Validation schema rule for change admin name form.
 */
const EmailValidationCodeSchema: Yup.ObjectSchema<EmailValidationFormValues> = Yup.object({
  code: Yup.string().trim().required('Validation code is required'),
}).defined();

export default EmailValidationCodeSchema;
