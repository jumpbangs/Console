import countries from 'constants/countries';
import { FormatAddress } from 'domain/address';
import { Address } from 'domain/response/Account';

const FORMAT = [['line2'], ['line1'], [{ name: 'city', appendComma: true }, 'state', 'postal_code'], ['country']];

/**
 * Returns formatted address string.
 *
 * @param {Address} address
 * @param {FormatAddress} format
 *
 * @returns {FormatAddress}
 */
export const formatAddress = (address: Address, format = FORMAT): FormatAddress => {
  const addr = { ...address };

  return format.map((keys) => {
    return keys.reduce((result, key) => {
      if (key === 'country') {
        const country = countries.find((country) => country.value === addr[key]);
        if (country) addr[key] = country.label;
      }

      if (typeof key === 'string' && addr[key]) {
        result.push(addr[key]);
      }

      if (typeof key === 'object' && addr[key.name]) {
        result.push(`${addr[key.name]}${key.appendComma ? ',' : ''}`);
      }

      return result;
    }, [] as string[]);
  });
};
