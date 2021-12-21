import { createAction } from 'redux-actions';

import * as locationService from 'services/location';
import LocationResponse from 'domain/response/Location';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

// Fetch Location by Id
export const FETCH_LOCATION_BY_ID = 'FETCH_LOCATION_BY_ID';
export type FETCH_LOCATION_BY_ID_ = typeof FETCH_LOCATION_BY_ID;

export const FETCH_LOCATION_BY_ID_PENDING = 'FETCH_LOCATION_BY_ID_PENDING';
export type FETCH_LOCATION_BY_ID_PENDING = typeof FETCH_LOCATION_BY_ID_PENDING;

export const FETCH_LOCATION_BY_ID_REJECTED = 'FETCH_LOCATION_BY_ID_REJECTED';
export type FETCH_LOCATION_BY_ID_REJECTED = typeof FETCH_LOCATION_BY_ID_REJECTED;

export const FETCH_LOCATION_BY_ID_FULFILLED = 'FETCH_LOCATION_BY_ID_FULFILLED';
export type FETCH_LOCATION_BY_ID_FULFILLED = typeof FETCH_LOCATION_BY_ID_FULFILLED;

// Types for action.
export type FetchLocationByIdPending = Action<FETCH_LOCATION_BY_ID_PENDING>;
export type FetchLocationByIdRejected = ActionWithError<FETCH_LOCATION_BY_ID_REJECTED, any>;
export type FetchLocationByIdFulfilled = ActionWithPayload<FETCH_LOCATION_BY_ID_FULFILLED, LocationResponse[]>;

export type FetchLocationByIdActions =
  | FetchLocationByIdPending
  | FetchLocationByIdRejected
  | FetchLocationByIdFulfilled;

// Action creators.
export const fetchLocationById = createAction(FETCH_LOCATION_BY_ID, locationService.fetchLocationById);
