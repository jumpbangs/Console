/**
 * Get status indicator color for given status.
 *
 * @param {string} status
 *
 * @returns {string}
 */
export function getStatusColor(status: string): void {
  const color = {
    failed: 'red',
    refund: 'gray',
    default: 'gray',
    succeeded: 'green',
    'partial refund': 'gray',
  };

  return color[status] || color.default;
}
