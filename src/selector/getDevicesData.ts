import AppState from 'domain/states/AppState';
import { DeviceSelectorProps } from 'domain/misc/devices/Devices';

/**
 * Get formatted devices data from redux store.
 *
 * @param {AppState} state
 *
 * @returns {DeviceSelectorProps}
 */
export const getDevicesData = (state: AppState): DeviceSelectorProps => {
  const { devices } = state.data.devices;
  const locations = state.data.locations.locations;

  if (!devices.data.length) {
    return [];
  }

  if (!locations.length) {
    return devices.data;
  }

  if (!locations.length || !devices.data.length) {
    return [];
  }

  return devices.data.map((device) => {
    const locationId = device.location;

    return {
      ...device,
      location: locations.find((location) => location.id === locationId) || locationId || '',
    };
  });
};
