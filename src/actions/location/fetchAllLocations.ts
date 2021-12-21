import { createAction } from 'redux-actions';

import * as locationService from 'services/location';
import LocationResponse from 'domain/response/Location';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

// Fetch Location
export const FETCH_ALL_LOCATIONS = 'FETCH_ALL_LOCATIONS';
export type FETCH_ALL_LOCATIONS_ = typeof FETCH_ALL_LOCATIONS;

export const FETCH_ALL_LOCATIONS_PENDING = 'FETCH_ALL_LOCATIONS_PENDING';
export type FETCH_ALL_LOCATIONS_PENDING = typeof FETCH_ALL_LOCATIONS_PENDING;

export const FETCH_ALL_LOCATIONS_REJECTED = 'FETCH_ALL_LOCATIONS_REJECTED';
export type FETCH_ALL_LOCATIONS_REJECTED = typeof FETCH_ALL_LOCATIONS_REJECTED;

export const FETCH_ALL_LOCATIONS_FULFILLED = 'FETCH_ALL_LOCATIONS_FULFILLED';
export type FETCH_ALL_LOCATIONS_FULFILLED = typeof FETCH_ALL_LOCATIONS_FULFILLED;

// Types for action.
export type FetchAllLocationPending = Action<FETCH_ALL_LOCATIONS_PENDING>;
export type FetchAllLocationRejected = ActionWithError<FETCH_ALL_LOCATIONS_REJECTED, any>;
export type FetchAllLocationFulfilled = ActionWithPayload<FETCH_ALL_LOCATIONS_FULFILLED, LocationResponse[]>;

export type FetchAllLocationActions = FetchAllLocationPending | FetchAllLocationRejected | FetchAllLocationFulfilled;

// Action creators.
export const fetchAllLocations = createAction(FETCH_ALL_LOCATIONS, locationService.fetchAllLocation);
