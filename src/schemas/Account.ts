import * as Yup from 'yup';

import { AccountsFormValues } from 'domain/misc/accounts/Accounts';

/**
 * Validation schema rule for edit account form
 */
const editAccountSchema: Yup.ObjectSchema<AccountsFormValues> = Yup.object({
  address2: Yup.string().trim(),
  website: Yup.string().url('Website format is not correct'),
  zip: Yup.string().required('ZIP is a required field').trim(),
  city: Yup.string().required('City is a required field').trim(),
  state: Yup.string().required('State is a required field').trim(),
  countryName: Yup.string().required('Country is a required field').trim(),
  address1: Yup.string().required('Address line 1 is a required field').trim(),
  phone: Yup.string().matches(/^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*\b$/, 'Phone format is not correct'),
  merchantName: Yup.string()
    .required('Merchant name is a required field')
    .trim()
    .max(100, 'Merchant name should contain less than 100 characters'),
}).defined();

export default editAccountSchema;
