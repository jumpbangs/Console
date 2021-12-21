/**
 * Sort the given array of objects based on the given object field.
 *
 * @param {any[]} array
 * @param {string} property
 * @param {number} direction [1]
 *
 * @returns {any[]}
 */
export const sortArray = (array: any[], property: string, direction: number = 1) => {
  direction = direction || 1;
  array.sort(function compare(a, b) {
    let comparison = 0;
    if (a[property] > b[property]) {
      comparison = 1 * direction;
    } else if (a[property] < b[property]) {
      comparison = -1 * direction;
    }

    return comparison;
  });

  return array;
};
