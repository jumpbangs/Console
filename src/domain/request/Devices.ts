interface SelectOption {
  value: string;
  label: string;
}

export interface RegisterDeviceParams {
  label?: string;
  registration_code: string;
  metadata?: Map<string, any>;
  location?: SelectOption | null;
}

export interface UpdateDeviceParams {
  label?: string;
  metadata?: string;
}

export interface ListAllDevicesParams {
  limit: number;
  status: string;
  location: string;
  device_type: string;
  ending_before: number;
  starting_after: number;
}

export interface DeviceFilters {
  status?: string;
  rowLimit?: string;
  location?: string;
  device_type?: string;
}
