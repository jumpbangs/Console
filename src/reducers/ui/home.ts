import AppActions from 'domain/actions/AppActions';
import ChartState from 'domain/states/ui/Chart';
import {
  FETCH_GUEST_COUNT_PENDING,
  FETCH_GUEST_COUNT_REJECTED,
  FETCH_GUEST_COUNT_FULFILLED,
} from 'actions/home/fetchGuestCount';
import {
  FETCH_CARD_VOLUME_PENDING,
  FETCH_CARD_VOLUME_REJECTED,
  FETCH_CARD_VOLUME_FULFILLED,
} from 'actions/home/fetchCardVolume';
import {
  FETCH_TOTAL_SALES_PENDING,
  FETCH_TOTAL_SALES_REJECTED,
  FETCH_TOTAL_SALES_FULFILLED,
} from 'actions/home/fetchTotalSales';
import {
  FETCH_TOTAL_TRANSACTION_PENDING,
  FETCH_TOTAL_TRANSACTION_REJECTED,
  FETCH_TOTAL_TRANSACTION_FULFILLED,
} from 'actions/home/fetchTotalTransaction';
import {
  FETCH_TOTAL_TICKETS_PENDING,
  FETCH_TOTAL_TICKETS_REJECTED,
  FETCH_TOTAL_TICKETS_FULFILLED,
} from 'actions/home/fetchTotalTickets';
import {
  FETCH_LINE_CHART_DATA_PENDING,
  FETCH_LINE_CHART_DATA_REJECTED,
  FETCH_LINE_CHART_DATA_FULFILLED,
} from 'actions/home/fetchLineChartData';
import {
  FETCH_TOP_LOCATIONS_PENDING,
  FETCH_TOP_LOCATIONS_REJECTED,
  FETCH_TOP_LOCATIONS_FULFILLED,
} from 'actions/home/fetchTopLocations';

export const INITIAL_STATE: ChartState = {
  isFetchingGuests: false,
  isFetchingTickets: false,
  isChartDataVisible: false,
  isFetchingChartData: false,
  isFetchingTotalSales: false,
  isFetchingCardVolume: false,
  isFetchingTopLocations: false,
  isFetchingTransactions: false,
};

/**
 * Fetch Total transaction reducer.
 *
 * @param {ChartState} state [INITIAL_STATE]
 * @param {AppActions} action
 *
 * @returns {ChartState}
 */
export default function (state: ChartState = INITIAL_STATE, action: AppActions): ChartState {
  switch (action.type) {
    case FETCH_GUEST_COUNT_PENDING:
      return {
        ...state,
        isFetchingGuests: true,
      };

    case FETCH_TOP_LOCATIONS_REJECTED:
    case FETCH_TOP_LOCATIONS_FULFILLED:
      return {
        ...state,
        isFetchingTopLocations: false,
      };

    case FETCH_TOP_LOCATIONS_PENDING:
      return {
        ...state,
        isFetchingTopLocations: true,
      };

    case FETCH_CARD_VOLUME_PENDING:
      return {
        ...state,
        isChartDataVisible: false,
        isFetchingCardVolume: true,
      };

    case FETCH_TOTAL_SALES_PENDING:
      return {
        ...state,
        isChartDataVisible: false,
        isFetchingTotalSales: true,
      };

    case FETCH_TOTAL_TRANSACTION_PENDING:
      return {
        ...state,
        isFetchingTransactions: true,
      };

    case FETCH_TOTAL_TICKETS_PENDING:
      return {
        ...state,
        isFetchingTickets: true,
      };

    case FETCH_LINE_CHART_DATA_PENDING:
      return {
        ...state,
        isFetchingChartData: true,
        isChartDataVisible: false,
      };

    case FETCH_TOTAL_SALES_FULFILLED:
      return {
        ...state,
        isChartDataVisible: true,
        isFetchingTotalSales: false,
      };

    case FETCH_TOTAL_SALES_REJECTED:
      return {
        ...state,
        isFetchingTotalSales: false,
      };

    case FETCH_CARD_VOLUME_REJECTED:
      return {
        ...state,
        isChartDataVisible: false,
        isFetchingCardVolume: false,
      };

    case FETCH_CARD_VOLUME_FULFILLED:
      return {
        ...state,
        isChartDataVisible: true,
        isFetchingCardVolume: false,
      };

    case FETCH_GUEST_COUNT_REJECTED:
    case FETCH_GUEST_COUNT_FULFILLED:
      return {
        ...state,
        isFetchingGuests: false,
      };

    case FETCH_TOTAL_TICKETS_REJECTED:
    case FETCH_TOTAL_TICKETS_FULFILLED:
      return {
        ...state,
        isFetchingTickets: false,
      };

    case FETCH_LINE_CHART_DATA_FULFILLED:
      return {
        ...state,
        isChartDataVisible: true,
        isFetchingChartData: false,
      };

    case FETCH_LINE_CHART_DATA_REJECTED:
      return {
        ...state,
        isFetchingChartData: false,
      };

    case FETCH_TOTAL_TRANSACTION_REJECTED:
    case FETCH_TOTAL_TRANSACTION_FULFILLED:
      return {
        ...state,
        isFetchingTransactions: false,
      };

    default:
      return state;
  }
}
