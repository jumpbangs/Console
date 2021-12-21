import AppActions from 'domain/actions/AppActions';
import DateRange from 'domain/states/data/DateRange';
import { SET_DATE_RANGE } from 'actions/setDateRange/setDateRange';

const INITIAL_STATE: DateRange = {
  endDate: null,
  startDate: null,
};

/**
 * Date Range Reducer.
 *
 * @param {DateRange} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {DateRange}
 */
export default function (state: DateRange = INITIAL_STATE, action: AppActions): DateRange {
  switch (action.type) {
    case SET_DATE_RANGE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
