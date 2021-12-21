import LocationResponse from 'domain/response/Location';

/**
 *  Device Response
 */
export interface DeviceResponseData {
  id: string;
  label: string;
  status: string;
  object?: string;
  enabled: boolean;
  last_seen: string;
  ip_address: string;
  device_type: string;
  serial_number: string;
  device_sw_version: string;
  metadata: Map<string, any> | {};
  location: LocationResponse | string;
}

export interface DevicesResponseData {
  data: DeviceResponseData[];
  has_more: boolean;
}
