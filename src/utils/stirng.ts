/**
 * Capitalize the first letter of the given string.
 *
 * @param {string} value
 *
 * @returns {string}
 */
export const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
