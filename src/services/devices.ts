import http from 'utils/http';
import config from 'config/config';
import { stringify } from 'utils/query';
import { DevicePaginationOptions } from 'domain/request/Pagination';
import { DeviceResponseData, DevicesResponseData } from 'domain/response/Devices';
import { RegisterDeviceParams, UpdateDeviceParams } from 'domain/request/Devices';

/**
 *  Creates a new device object with the given payload.
 *
 *  @param {RegisterDeviceParams} payload
 *
 *  @returns {Promise<DeviceResponse>}
 */
export const registerDevice = async (payload: RegisterDeviceParams): Promise<DeviceResponseData> => {
  const registerPayload = {
    ...payload,
    location: payload.location?.value,
  };

  const url = config.endpoints.device.createDevice;
  const { data } = await http.post(url, stringify(registerPayload, { addQueryPrefix: false }));

  return data;
};

/**
 *  Retrieves a device object.
 *
 * @param {String} deviceId
 *
 * @returns {Promise<DeviceResponseData>}
 */
export const fetchDeviceById = async (deviceId: string): Promise<DeviceResponseData> => {
  const url = config.endpoints.device.retrieveADevice.replace(':deviceId', deviceId);
  const { data } = await http.get(url);

  return data;
};

/**
 *  Updates a device object.
 *
 * @param {String} deviceId
 * @param {UpdateDeviceParams} payload
 *
 * @returns {Promise<DeviceResponseData>}
 */
export const updateDevice = async (deviceId: string, payload: UpdateDeviceParams): Promise<DeviceResponseData[]> => {
  const url = config.endpoints.device.updateDevice.replace(':deviceId', deviceId);
  const { data } = await http.post(url, payload);

  return data;
};

/**
 *  Deletes a device object.
 *
 * @param {String} deviceId
 *
 * @returns {Promise}
 */
export const deleteDevice = async (deviceId: string) => {
  const url = config.endpoints.device.deleteDevice.replace(':deviceId', deviceId);
  const { data } = await http.delete(url);

  return data;
};

/**
 *  Fetches a list of device objects.
 *
 * @param {String} locationId
 * @param {DeviceFilters} payload
 *
 * @returns {Promise<DevicesResponseData>}
 */
export const fetchAllDevices = async (
  pagination: DevicePaginationOptions,
  locationId?: string
): Promise<DevicesResponseData> => {
  const queryObject = {
    location: locationId,
    limit: pagination.limit,
    status: pagination.status,
    device_type: pagination.device_type,
    ending_before: pagination?.ending_before,
    starting_after: pagination?.starting_after,
  };
  const fetchDevicesURL = config.endpoints.device.fetchAllDevices;
  const URL = fetchDevicesURL.concat(stringify(queryObject));

  const { data } = await http.get(URL);

  const deviceData = !!pagination.ending_before ? data.data.reverse() : data.data;

  return { data: deviceData, has_more: data.has_more };
};
