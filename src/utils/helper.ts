/**
 * Convert the given number to given decimal precisions.
 *
 * @param {number} value
 * @param {number} precision
 *
 * @returns {string}
 */
export const convertToDecimalPrecision = (value: number, precision: number): string => {
  return value.toFixed(precision);
};
