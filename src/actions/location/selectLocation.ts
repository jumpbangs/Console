import { createAction } from 'redux-actions';

import { ActionWithPayload } from 'domain/base';

export const SET_SELECTED_LOCATION = 'SET_SELECTED_LOCATION';
export type SET_SELECTED_LOCATION = typeof SET_SELECTED_LOCATION;

export type SetSelectedLocation = ActionWithPayload<SET_SELECTED_LOCATION, string>;

export type SelectedLocationActions = SetSelectedLocation;

export const setSelectedLocation = createAction(SET_SELECTED_LOCATION);
