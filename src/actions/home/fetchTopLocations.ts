import { createAction } from 'redux-actions';

import * as homeService from 'services/home';
import TopLocationsResponse from 'domain/response/TopLocations';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const FETCH_TOP_LOCATIONS = 'FETCH_TOP_LOCATIONS';
export type FETCH_TOP_LOCATIONS_ = typeof FETCH_TOP_LOCATIONS;

export const FETCH_TOP_LOCATIONS_PENDING = 'FETCH_TOP_LOCATIONS_PENDING';
export type FETCH_TOP_LOCATIONS_PENDING = typeof FETCH_TOP_LOCATIONS_PENDING;

export const FETCH_TOP_LOCATIONS_REJECTED = 'FETCH_TOP_LOCATIONS_REJECTED';
export type FETCH_TOP_LOCATIONS_REJECTED = typeof FETCH_TOP_LOCATIONS_REJECTED;

export const FETCH_TOP_LOCATIONS_FULFILLED = 'FETCH_TOP_LOCATIONS_FULFILLED';
export type FETCH_TOP_LOCATIONS_FULFILLED = typeof FETCH_TOP_LOCATIONS_FULFILLED;

export type FetchTopLocationsPending = Action<FETCH_TOP_LOCATIONS_PENDING>;
export type FetchTopLocationsRejected = ActionWithError<FETCH_TOP_LOCATIONS_REJECTED, any>;
export type FetchTopLocationsFulfilled = ActionWithPayload<FETCH_TOP_LOCATIONS_FULFILLED, TopLocationsResponse[]>;

export type FetchTopLocationsActions =
  | FetchTopLocationsPending
  | FetchTopLocationsRejected
  | FetchTopLocationsFulfilled;

export const fetchTopLocations = createAction(FETCH_TOP_LOCATIONS, homeService.fetchTopLocations);
