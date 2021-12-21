import { createAction } from 'redux-actions';

import { ActionWithPayload } from 'domain/base';

export const SET_CHART_FILTER = 'SET_CHART_FILTER';
export type SET_CHART_FILTER = typeof SET_CHART_FILTER;

export const SET_LINE_CHART_TIME_FILTER = 'SET_LINE_CHART_TIME_FILTER';
export type SET_LINE_CHART_TIME_FILTER = typeof SET_LINE_CHART_TIME_FILTER;

export type ChartFilterWithPayload = ActionWithPayload<SET_CHART_FILTER, string>;
export type ChartTimeFilter = ActionWithPayload<SET_LINE_CHART_TIME_FILTER, string>;

export type ChartFilterActions = ChartFilterWithPayload | ChartTimeFilter;

export const setChartFilter = createAction(SET_CHART_FILTER);

export const setChartTimeFilter = createAction(SET_LINE_CHART_TIME_FILTER);
