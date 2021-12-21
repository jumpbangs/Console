import { createAction } from 'redux-actions';

import * as locationService from 'services/location';
import LocationResponse from 'domain/response/Location';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

// Delete Location
export const DELETE_LOCATION = 'DELETE_LOCATION';
export type DELETE_LOCATION_ = typeof DELETE_LOCATION;

export const DELETE_LOCATION_PENDING = 'DELETE_LOCATION_PENDING';
export type DELETE_LOCATION_PENDING = typeof DELETE_LOCATION_PENDING;

export const DELETE_LOCATION_REJECTED = 'DELETE_LOCATION_REJECTED';
export type DELETE_LOCATION_REJECTED = typeof DELETE_LOCATION_REJECTED;

export const DELETE_LOCATION_FULFILLED = 'DELETE_LOCATION_FULFILLED';
export type DELETE_LOCATION_FULFILLED = typeof DELETE_LOCATION_FULFILLED;

// Types for action.
export type DeleteLocationPending = Action<DELETE_LOCATION_PENDING>;
export type DeleteLocationRejected = ActionWithError<DELETE_LOCATION_REJECTED, any>;
export type DeleteLocationFulfilled = ActionWithPayload<DELETE_LOCATION_FULFILLED, LocationResponse[]>;

export type DeleteLocationActions = DeleteLocationPending | DeleteLocationRejected | DeleteLocationFulfilled;

// Action creators.
export const deleteLocation = createAction(DELETE_LOCATION, locationService.deleteLocation);
