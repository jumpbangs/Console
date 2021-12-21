import classnames from 'classnames';

import http from 'utils/http';
import config from 'config/config';
import ChartIds from 'enums/ChartIds';
import { sortArray } from 'utils/sort';
import { stringify } from 'utils/query';
import { RightFilter } from 'enums/ChartFilter';
import TabState from 'domain/misc/home/TabState';
import { ChartResponse } from 'domain/response/Chart';
import { ChartParams } from 'domain/request/ChartParams';
import { formatDate, differenceIn } from 'utils/dateTime';
import { CONVERT_TO_DOLLAR } from 'constants/appConstants';
import FormattedLocations from 'domain/misc/home/TopLocation';
import TopLocationsResponse from 'domain/response/TopLocations';
import TopLocationParam, { TopLocationPayload } from 'domain/request/TopLocations';
import { TOOLTIP_MONTH_DAY_YEAR, MONTH_DAY_YEAR_TIME, TOOLTIP_DAY_AND_TIME, TOOLTIP_MONTH_DAY } from 'constants/date';

/**
 *  Fetches chart data with the given ID.
 *
 *  @param {ChartParams} params
 *  @param {String} location
 *
 *  @returns {Promise<ChartResponse>}
 */
export const fetchChartData = async (params: ChartParams, location: string): Promise<ChartResponse> => {
  const fetchTotalSalesQuery = {
    location,
    unit: params.unit,
    end_time: params.end_time,
    start_time: params.start_time,
  };

  const url = config.endpoints.charts.getChartData.replace(':id', params.id).concat(stringify(fetchTotalSalesQuery));

  const { data } = await http.get(url);

  return data;
};

/**
 *  Fetch top locations data.
 *
 * @param {TopLocationParam} payload
 * @param {FormattedLocations[]} locations
 *  @returns {Promise<TopLocationsResponse[]>}
 */
export const fetchTopLocations = async (
  payload: TopLocationParam,
  locations: FormattedLocations[]
): Promise<TopLocationsResponse[]> => {
  try {
    if (!locations.length) {
      return Promise.resolve([]);
    }

    const results: TopLocationsResponse[] = [];

    let fetchTotalSalesQuery: TopLocationPayload = {
      unit: payload.unit,
      end_time: payload.end_time,
      start_time: payload.start_time,
    };

    for (const payloadData of locations) {
      fetchTotalSalesQuery = { ...fetchTotalSalesQuery, location: payloadData.locId };

      const url = config.endpoints.charts.getChartData
        .replace(':id', ChartIds.TOTAL_SALES)
        .concat(stringify(fetchTotalSalesQuery));

      const response = await http.get(url);

      const reqPayload = {
        location: payloadData?.displayName,
        totalSales: response?.data?.total / CONVERT_TO_DOLLAR,
      };

      results.push(reqPayload);
    }

    await sortArray(results, 'totalSales', -1);

    return Promise.resolve(results);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Disable tab according to given start & end date.
 *
 * @param {number} startDate
 * @param {number} endDate
 *
 * @returns {object}
 */
export const TabSelector = (startDate: number, endDate: number): TabState => {
  const dayDifference = differenceIn(endDate, startDate, 'day');
  const weekDifference = differenceIn(endDate, startDate, 'week');
  const monthDifference = differenceIn(endDate, startDate, 'month');

  const disableTab = {
    daily: false,
    hourly: false,
    weekly: false,
    monthly: false,
    min: RightFilter.HOURLY,
  };

  switch (startDate !== null && endDate !== null) {
    case dayDifference === 0:
      return {
        ...disableTab,
        hourly: true,
        min: RightFilter.HOURLY,
      };

    case dayDifference <= 14 && weekDifference <= 2:
      return {
        ...disableTab,
        hourly: true,
        daily: true,
        min: RightFilter.HOURLY,
      };

    case weekDifference > 1 && monthDifference <= 1:
      return {
        ...disableTab,
        daily: true,
        weekly: true,
        min: RightFilter.DAILY,
      };

    case monthDifference >= 2 && monthDifference < 3:
      return {
        ...disableTab,
        daily: true,
        weekly: true,
        monthly: true,
        min: RightFilter.DAILY,
      };

    case monthDifference >= 3:
      return {
        ...disableTab,
        weekly: true,
        monthly: true,
        min: RightFilter.WEEKLY,
      };

    default:
      return disableTab;
  }
};

/**
 * Format line chart data according to the selected chart filter.
 *
 * @param {Date} x
 * @param {string} selectedFilter
 *
 * @returns {string}
 */
export const getFormattedChartData = (x: Date, selectedFilter: string): number | string => {
  switch (selectedFilter) {
    case RightFilter.HOURLY:
      return formatDate(x, TOOLTIP_DAY_AND_TIME);

    case RightFilter.MONTHLY:
      return formatDate(x, TOOLTIP_MONTH_DAY_YEAR);

    case RightFilter.DAILY:
      return formatDate(x, TOOLTIP_MONTH_DAY);

    case RightFilter.WEEKLY:
      return formatDate(x, TOOLTIP_MONTH_DAY);

    default:
      return formatDate(x, TOOLTIP_DAY_AND_TIME);
  }
};

/**
 * Get tooltip data.
 *
 * @param x
 * @param {string | number}selectedFilter
 *
 * @returns {string}
 */
export const getToolTipData = (x: Date, selectedFilter: string): string => {
  switch (selectedFilter) {
    case RightFilter.MONTHLY:
      return formatDate(x, TOOLTIP_MONTH_DAY_YEAR);

    case RightFilter.DAILY:
      return formatDate(x, TOOLTIP_MONTH_DAY_YEAR);

    case RightFilter.WEEKLY:
      return formatDate(x, TOOLTIP_MONTH_DAY_YEAR);

    case RightFilter.HOURLY:
      return formatDate(x, MONTH_DAY_YEAR_TIME);

    default:
      return formatDate(x, TOOLTIP_MONTH_DAY_YEAR);
  }
};

/**
 * Return active tab class name.
 *
 * @param {string} activeTab
 * @param {string} currentTab
 *
 * @returns {string}
 */
export const getActiveClassName = (activeTab: string, currentTab: string, isEnabled: boolean = true): string => {
  const isActive = activeTab === currentTab;

  return classnames('pill-tab__node', {
    'pill-tab__node--active': isActive,
    'pill-tab__node--disabled': !isEnabled,
  });
};
