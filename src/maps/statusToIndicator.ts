import Status from 'enums/Status';

/**
 * Maps transaction status to the specific color.
 */
export const statusToIndicatorColorMap = {
  [Status.FAILED]: 'red',
  [Status.PARTIAL]: 'gray',
  [Status.DECLINED]: 'red',
  [Status.REFUNDED]: 'gray',
  [Status.SUCCEEDED]: 'green',
};
