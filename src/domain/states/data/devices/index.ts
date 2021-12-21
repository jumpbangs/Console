import { Devices } from './Devices';
import { DeviceDetails } from './DeviceDetails';
import { DevicePagination } from './DevicePagination';
import { RegisterDeviceResponse } from './DeviceRegister';

interface DeviceState {
  readonly devices: Devices;
  readonly deviceDetails: DeviceDetails;
  readonly devicePagination: DevicePagination;
  readonly deviceRegisterResponse: RegisterDeviceResponse;
}

export default DeviceState;
