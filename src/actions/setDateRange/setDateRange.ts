import { createAction } from 'redux-actions';

import { ActionWithPayload } from 'domain/base';
import { DateRange } from 'domain/misc/common/DateRange';

export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export type SET_DATE_RANGE = typeof SET_DATE_RANGE;

export type SetDateRangeAction = ActionWithPayload<SET_DATE_RANGE, DateRange>;

export const setDateRange = createAction(SET_DATE_RANGE);
