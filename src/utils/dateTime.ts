import utc from 'dayjs/plugin/utc';
import dayjs, { OpUnitType, QUnitType } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(relativeTime);

/**
 * Format date into the given format.
 *
 * @param {Date} date
 * @param {string} formatting
 *
 * @returns {string}
 */
export const formatDate = (date: Date, formatting: string): string => {
  const toBeFormattedDate = isDateType(date) ? date : new Date(date);

  return dayjs(toBeFormattedDate).utc().format(formatting);
};

/**
 * Check given date type is string or date.
 *
 * @param {Date} date
 *
 * @returns {boolean}
 */
export const isDateType = (date: Date | string): boolean => {
  if (typeof date === 'string') {
    return false;
  }

  return true;
};

/**
 *  Returns the difference between 2 dates
 *
 *  @para {string} givenDate
 *
 *  @returns {string}
 */
export const lastSeenTime = (givenDate: string) => {
  return dayjs(givenDate).fromNow(true);
};

/**
 * Returns start of the day in milliseconds.
 *
 * @returns {number}
 */
export const startOfToday = (): number => {
  return dayjs().startOf('day').valueOf();
};

/**
 * Returns end of the day in milliseconds.
 *
 * @returns {number}
 */
export const endOfToday = (): number => {
  return dayjs().endOf('day').valueOf();
};

/**
 * Returns today in milliseconds.
 *
 * @returns {number}
 */
export const today = (): number => {
  return dayjs().valueOf();
};

/**
 * Returns difference in days.
 *
 * @param {number} dateOne
 * @param {number} dateTwo
 * @param {QUnitType | OpUnitType} unit
 *
 * @returns {boolean}
 */
export const differenceIn = (dateOne: number, dateTwo: number, unit: QUnitType | OpUnitType): number => {
  return dayjs(dateOne).diff(dateTwo, unit);
};
