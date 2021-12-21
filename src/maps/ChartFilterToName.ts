import ChartIds from 'enums/ChartIds';
import LeftFilter from 'enums/ChartFilter';

/**
 * Maps chart left filter type to name.
 */
export const ChartFilterToName = {
  [ChartIds.CARD_VOLUME]: LeftFilter.CARD_VOLUME,
  [ChartIds.TOTAL_SALES]: LeftFilter.TOTAL_SALES,
};
