import * as Yup from 'yup';

import { RegisterDeviceParams } from 'domain/request/Devices';

const registerDeviceSchema: Yup.ObjectSchema<RegisterDeviceParams> = Yup.object({
  registration_code: Yup.string()
    .required('Registration code is required')
    .matches(/^(?:\b\w+\b\W*){3}$/, 'Registration code does not match'),
  label: Yup.string().ensure(),
  location: Yup.object()
    .shape({
      label: Yup.string(),
      value: Yup.string(),
    })
    .nullable()
    .required('Location Required'),
}).defined();

export default registerDeviceSchema;
