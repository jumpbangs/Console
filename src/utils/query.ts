import qs, { ParsedQs } from 'qs';

/**
 * Parse given query string.
 *
 * @param {string} str
 *
 * @returns {ParsedQs}
 */
export const parse = (str: string): ParsedQs => {
  return qs.parse(str, { ignoreQueryPrefix: true });
};

/**
 * Stringify given object to query string.
 *
 * @param {any} obj
 * @param {boolean} addQueryPrefix
 *
 * @returns {string}
 */
export const stringify = (obj: any, { addQueryPrefix = true, skipNulls = true } = {}): string => {
  if (skipNulls) {
    obj = removeEmpty(obj);
  }

  return qs.stringify(obj, {
    addQueryPrefix,
  });
};

/**
 * Removes null/undefined from given objects.
 *
 * @param {any} obj
 *
 * @returns {any}
 */
const removeEmpty = (obj: any): any => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      const myObj = removeEmpty(obj[key]);
      if (Object.keys(myObj).length) {
        newObj[key] = myObj;
      }
    } else if (obj[key]) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};
