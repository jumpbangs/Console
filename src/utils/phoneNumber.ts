import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

/**
 * Format phone number
 *
 * @param {string} str
 *
 * @returns {string}
 */
export const formatPhoneNumber = (str: string): string => {
  try {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const phoneNumber = phoneUtil.parseAndKeepRawInput(str, 'US');

    return `+${phoneNumber.getCountryCode()} ${phoneUtil.format(phoneNumber, PhoneNumberFormat.NATIONAL)}`;
  } catch (err) {
    return str;
  }
};
