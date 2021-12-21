import AppActions from 'domain/actions/AppActions';

import ChartIds from 'enums/ChartIds';
import { TabSelector } from 'services/home';
import { RightFilter } from 'enums/ChartFilter';
import { startOfToday, endOfToday } from 'utils/dateTime';
import ChartFilterState from 'domain/states/data/home/ChartFilter';
import { SET_DATE_RANGE } from 'actions/setDateRange/setDateRange';
import { SET_SELECTED_LOCATION } from 'actions/location/selectLocation';
import { SET_CHART_FILTER, SET_LINE_CHART_TIME_FILTER } from 'actions/home/setLineChartFilters';

const INITIAL_STATE: ChartFilterState = {
  rightFilter: RightFilter.HOURLY,
  leftFilter: ChartIds.TOTAL_SALES,
};

/**
 * Chart filter Data Reducer.
 *
 * @param {ChartFilterState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {ChartFilterState}
 */
export default function (state: ChartFilterState = INITIAL_STATE, action: AppActions): ChartFilterState {
  switch (action.type) {
    case SET_CHART_FILTER:
      return {
        ...state,
        leftFilter: action.payload,
      };

    case SET_DATE_RANGE:
      return {
        ...state,
        leftFilter: ChartIds.TOTAL_SALES,
        rightFilter:
          TabSelector(action.payload.startDate || startOfToday(), action.payload.endDate || endOfToday()).min ||
          RightFilter.HOURLY,
      };

    case SET_SELECTED_LOCATION:
      return {
        ...state,
        leftFilter: ChartIds.TOTAL_SALES,
      };

    case SET_LINE_CHART_TIME_FILTER:
      return {
        ...state,
        rightFilter: action.payload,
      };
    default:
      return state;
  }
}
