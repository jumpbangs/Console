import AppActions from 'domain/actions/AppActions';
import { getDeviceDetails } from 'utils/testUtils';
import deviceReducer, { INITIAL_STATE } from 'reducers/data/devices/devices';
import {
  FETCH_ALL_DEVICES_PENDING,
  FETCH_ALL_DEVICES_REJECTED,
  FETCH_ALL_DEVICES_FULFILLED,
} from 'actions/device/fetchAllDevices';

describe('REDUCERS: data/transaction', () => {
  it('Should return initial state or undefined', () => {
    expect(deviceReducer(undefined, { type: undefined } as any)).toEqual(INITIAL_STATE);
  });

  it('Should correctly reduce state for FETCH_ALL_DEVICES_FULFILLED action', () => {
    const deviceDetails = getDeviceDetails();

    const action: AppActions = {
      meta: {},
      payload: deviceDetails,
      type: FETCH_ALL_DEVICES_FULFILLED,
    };

    const expectedState = action.payload;

    expect(deviceReducer(undefined, action)).toEqual(expectedState);
  });

  it('Should correctly reduce state for FETCH_ALL_DEVICES_PENDING and FETCH_ALL_DEVICES_REJECTED action', () => {
    const pendingAction: AppActions = {
      meta: {},
      payload: INITIAL_STATE,
      type: FETCH_ALL_DEVICES_PENDING,
    };

    const rejectedAction: AppActions = {
      meta: {},
      payload: INITIAL_STATE,
      type: FETCH_ALL_DEVICES_REJECTED,
      error: true,
    };
    const expectedState = INITIAL_STATE;

    expect(deviceReducer(undefined, pendingAction)).toEqual(expectedState);

    expect(deviceReducer(undefined, rejectedAction)).toEqual(expectedState);
  });
});
