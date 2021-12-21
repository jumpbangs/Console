/**
 * Helper method to censor email address
 *
 * @param {string} str
 *
 * @returns {string}
 */
export function censorEmail(str: string): string {
  if (!str) {
    return '';
  }

  const preserve = (st: string, numberOfchar = 1) => {
    const s = st.replace('.com', '');

    return s.slice(0, numberOfchar) + '*'.repeat(s.length - numberOfchar);
  };

  const [first, second] = str.split('@');

  return `${preserve(first, 2)}@${preserve(second)}.com`;
}
