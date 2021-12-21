import { getDeviceDetail } from 'utils/testUtils';
import AppActions from 'domain/actions/AppActions';
import { SET_DEVICE_DETAILS } from 'actions/device/deviceDetails';
import deviceDetailsReducer, { INITIAL_STATE } from 'reducers/data/devices/deviceDetails';

describe('REDUCERS: data/transaction', () => {
  it('Should return initial state or undefined', () => {
    expect(deviceDetailsReducer(undefined, { type: undefined } as any)).toEqual(INITIAL_STATE);
  });

  it('Should correctly reduce state for SET_DEVICE_DETAILS action', () => {
    const deviceDetails = getDeviceDetail();

    const action: AppActions = {
      meta: {},
      type: SET_DEVICE_DETAILS,
      payload: deviceDetails,
    };

    const expectedState = action.payload;

    expect(deviceDetailsReducer(undefined, action)).toEqual(expectedState);
  });
});
