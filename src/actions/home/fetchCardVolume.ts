import { createAction } from 'redux-actions';

import * as homeService from 'services/home';
import { ChartResponse } from 'domain/response/Chart';
import { Action, ActionWithPayload, ActionWithError } from 'domain/base';

export const FETCH_CARD_VOLUME = 'FETCH_CARD_VOLUME';
export type FETCH_CARD_VOLUME_ = typeof FETCH_CARD_VOLUME;

export const FETCH_CARD_VOLUME_PENDING = 'FETCH_CARD_VOLUME_PENDING';
export type FETCH_CARD_VOLUME_PENDING = typeof FETCH_CARD_VOLUME_PENDING;

export const FETCH_CARD_VOLUME_REJECTED = 'FETCH_CARD_VOLUME_REJECTED';
export type FETCH_CARD_VOLUME_REJECTED = typeof FETCH_CARD_VOLUME_REJECTED;

export const FETCH_CARD_VOLUME_FULFILLED = 'FETCH_CARD_VOLUME_FULFILLED';
export type FETCH_CARD_VOLUME_FULFILLED = typeof FETCH_CARD_VOLUME_FULFILLED;

export type FetchCardVolumePending = Action<FETCH_CARD_VOLUME_PENDING>;
export type FetchCardVolumeRejected = ActionWithError<FETCH_CARD_VOLUME_REJECTED, any>;
export type FetchCardVolumeFulfilled = ActionWithPayload<FETCH_CARD_VOLUME_FULFILLED, ChartResponse>;

export type FetchCardVolumeActions = FetchCardVolumePending | FetchCardVolumeRejected | FetchCardVolumeFulfilled;

export const fetchCardVolume = createAction(FETCH_CARD_VOLUME, homeService.fetchChartData);
