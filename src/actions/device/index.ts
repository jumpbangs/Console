import { DeviceModalActions } from './device';
import { UpdateDeviceActions } from './updateDevice';
import { DeleteDeviceActions } from './deleteDevice';
import { RegisterDeviceActions } from './registerDevice';
import { FetchAllDeviceActions } from './fetchAllDevices';
import { SetDeviceDetailsActions } from './deviceDetails';
import { FetchDeviceByIdActions } from './fetchDeviceById';
import { SetDevicePaginationActions } from './devicePagination';

type DeviceActions =
  | DeviceModalActions
  | UpdateDeviceActions
  | DeleteDeviceActions
  | RegisterDeviceActions
  | FetchAllDeviceActions
  | FetchDeviceByIdActions
  | SetDeviceDetailsActions
  | SetDevicePaginationActions;

export default DeviceActions;
