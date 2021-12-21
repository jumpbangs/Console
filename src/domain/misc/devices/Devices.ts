import LocationResponse from 'domain/response/Location';
import { DeviceResponseData } from 'domain/response/Devices';

export interface DeviceSelectorPayload {
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

export type DeviceSelectorProps = DeviceSelectorPayload[] | DeviceResponseData[] | [];

export type DeviceDetailPayload = DeviceResponseData | null;
