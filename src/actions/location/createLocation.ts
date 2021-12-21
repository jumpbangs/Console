import { createAction } from 'redux-actions';

import * as locationService from 'services/location';
import LocationResponse from 'domain/response/Location';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

// Create a location object.
export const CREATE_LOCATION = 'CREATE_LOCATION';
export type CREATE_LOCATION_ = typeof CREATE_LOCATION;

export const CREATE_LOCATION_PENDING = 'CREATE_LOCATION_PENDING';
export type CREATE_LOCATION_PENDING = typeof CREATE_LOCATION_PENDING;

export const CREATE_LOCATION_REJECTED = 'CREATE_LOCATION_REJECTED';
export type CREATE_LOCATION_REJECTED = typeof CREATE_LOCATION_REJECTED;

export const CREATE_LOCATION_FULFILLED = 'CREATE_LOCATION_FULFILLED';
export type CREATE_LOCATION_FULFILLED = typeof CREATE_LOCATION_FULFILLED;

// Types for action.
export type CreateLocationPending = Action<CREATE_LOCATION_PENDING>;
export type CreateLocationRejected = ActionWithError<CREATE_LOCATION_REJECTED, any>;
export type CreateLocationFulfilled = ActionWithPayload<CREATE_LOCATION_FULFILLED, LocationResponse[]>;

export type CreateLocationActions = CreateLocationPending | CreateLocationRejected | CreateLocationFulfilled;

// Action Creators.
export const createLocation = createAction(CREATE_LOCATION, locationService.createLocation);
