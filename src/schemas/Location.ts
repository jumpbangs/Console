import * as Yup from 'yup';

import { EditLocationFormValues } from 'domain/misc/locations/Locations';

/**
 * Validation schema rule for edit location form
 */
const editLocationSchema: Yup.ObjectSchema<EditLocationFormValues> = Yup.object({
  logo: Yup.string().trim(),
  address2: Yup.string().trim(),
  website: Yup.string().url('Website format is not correct'),
  zip: Yup.string().required('ZIP is a required field').trim(),
  city: Yup.string().required('City is a required field').trim(),
  state: Yup.string().required('State is a required field').trim(),
  locationName: Yup.string().required('Name is a required field').trim(),
  countryName: Yup.string().required('Country is a required field').trim(),
  address1: Yup.string().required('Address line 1 is a required field').trim(),
  phone: Yup.string().matches(/^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*\b$/, 'Phone format is not correct'),
}).defined();

export default editLocationSchema;
