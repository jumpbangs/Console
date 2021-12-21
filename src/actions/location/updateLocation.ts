import { createAction } from 'redux-actions';

import * as locationService from 'services/location';
import LocationResponse from 'domain/response/Location';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

// Update Location
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export type UPDATE_LOCATION_ = typeof UPDATE_LOCATION;

export const UPDATE_LOCATION_PENDING = 'UPDATE_LOCATION_PENDING';
export type UPDATE_LOCATION_PENDING = typeof UPDATE_LOCATION_PENDING;

export const UPDATE_LOCATION_REJECTED = 'UPDATE_LOCATION_REJECTED';
export type UPDATE_LOCATION_REJECTED = typeof UPDATE_LOCATION_REJECTED;

export const UPDATE_LOCATION_FULFILLED = 'UPDATE_LOCATION_FULFILLED';
export type UPDATE_LOCATION_FULFILLED = typeof UPDATE_LOCATION_FULFILLED;

// Types for action.
export type UpdateLocationPending = Action<UPDATE_LOCATION_PENDING>;
export type UpdateLocationRejected = ActionWithError<UPDATE_LOCATION_REJECTED, any>;
export type UpdateLocationFulfilled = ActionWithPayload<UPDATE_LOCATION_FULFILLED, LocationResponse>;

export type UpdateLocationActions = UpdateLocationPending | UpdateLocationRejected | UpdateLocationFulfilled;

// Action creators.
export const updateLocation = createAction(UPDATE_LOCATION, locationService.updateLocation);
