import AppActions from 'domain/actions/AppActions';
import ChartState from 'domain/states/data/home/Chart';
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

export const INITIAL_STATE: ChartState = {
  overview: {
    totalSales: 0,
    cardVolume: 0,
    guestCounts: 0,
    totalTickets: 0,
    totalTransactions: 0,
  },
  lineChart: {
    data: [],
  },
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
    case FETCH_GUEST_COUNT_FULFILLED:
      return {
        ...state,
        overview: {
          ...state.overview,
          guestCounts: action.payload.total,
        },
      };

    case FETCH_CARD_VOLUME_FULFILLED:
      return {
        ...state,
        overview: {
          ...state.overview,
          cardVolume: action.payload.total,
        },
      };

    case FETCH_TOTAL_SALES_FULFILLED:
      return {
        ...state,
        overview: {
          ...state.overview,
          totalSales: action.payload.total,
        },
        lineChart: {
          data: action.payload.data,
        },
      };

    case FETCH_TOTAL_TRANSACTION_FULFILLED:
      return {
        ...state,
        overview: {
          ...state.overview,
          totalTransactions: action.payload.total,
        },
      };

    case FETCH_TOTAL_TICKETS_FULFILLED:
      return {
        ...state,
        overview: {
          ...state.overview,
          totalTickets: action.payload.total,
        },
      };

    case FETCH_LINE_CHART_DATA_FULFILLED:
      return {
        ...state,
        lineChart: {
          data: action.payload.data,
        },
      };

    case FETCH_TOTAL_SALES_PENDING:
    case FETCH_CARD_VOLUME_PENDING:
    case FETCH_GUEST_COUNT_PENDING:
    case FETCH_TOTAL_SALES_REJECTED:
    case FETCH_CARD_VOLUME_REJECTED:
    case FETCH_GUEST_COUNT_REJECTED:
    case FETCH_TOTAL_TICKETS_PENDING:
    case FETCH_TOTAL_TICKETS_REJECTED:
    case FETCH_LINE_CHART_DATA_PENDING:
    case FETCH_LINE_CHART_DATA_REJECTED:
    case FETCH_TOTAL_TRANSACTION_PENDING:
    case FETCH_TOTAL_TRANSACTION_REJECTED:
      return state;

    default:
      return state;
  }
}
