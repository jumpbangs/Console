/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';

import AppState from 'domain/states/AppState';
import DeviceTable from './component/DeviceTable';
import { getDevicesData } from 'selector/getDevicesData';
import { DEFAULT_COUNTER_COUNT } from 'constants/appConstants';
import { fetchAllDevices } from 'actions/device/fetchAllDevices';
import { DevicePaginationOptions } from 'domain/request/Pagination';
import { setDevicePagination } from 'actions/device/devicePagination';
import { DeviceSelectorProps, DeviceDetailPayload } from 'domain/misc/devices/Devices';
interface MappedProps {
  isFetchingDevices: boolean;
  selectedLocationId: string;
  devices: DeviceSelectorProps;
  deviceDetails: DeviceDetailPayload;
  isDeviceDetailModalActive: boolean;
  isDeviceRegistrationModalActive: boolean;
  devicePagination: DevicePaginationOptions;
}

interface DispatchedProps {
  setDevicePagination: (options: DevicePaginationOptions) => void;
  fetchAllDevices: (pagination: DevicePaginationOptions, locationId?: string) => void;
}

type InjectedProps = DispatchedProps & MappedProps;

/**
 * Device component.
 *
 * @param {InjectedProps} props
 *
 * @returns {React.ReactElement}
 */
const Devices: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const {
    devices,
    deviceDetails,
    devicePagination,
    isFetchingDevices,
    selectedLocationId,
    isDeviceDetailModalActive,
    isDeviceRegistrationModalActive,
  } = props;

  const fetchDeviceData = React.useCallback(async () => {
    try {
      await props.fetchAllDevices(devicePagination, selectedLocationId);
    } catch (error) {
      // [TODO] handle error
    }
  }, [selectedLocationId, devicePagination]);

  const updateDevicePagination = React.useCallback(() => {
    props.setDevicePagination({
      ...devicePagination,
      ending_before: '',
      starting_after: '',
      counter: DEFAULT_COUNTER_COUNT,
    });
  }, [selectedLocationId]);

  React.useEffect(() => {
    fetchDeviceData();
  }, [fetchDeviceData]);

  React.useEffect(() => {
    updateDevicePagination();
  }, [updateDevicePagination]);

  return (
    <div>
      <DeviceTable
        devices={devices}
        deviceDetails={deviceDetails}
        devicePagination={devicePagination}
        isFetchingDevices={isFetchingDevices}
        isDeviceDetailModalActive={isDeviceDetailModalActive}
        isDeviceRegistrationModalActive={isDeviceRegistrationModalActive}
      />
    </div>
  );
};

const mapDispatchToProps = {
  fetchAllDevices,
  setDevicePagination,
};

const mapStateToProps = (state: AppState) => ({
  devices: getDevicesData(state),
  deviceDetails: state.data.devices.deviceDetails,
  devicePagination: state.data.devices.devicePagination,
  isFetchingDevices: state.ui.devices.isFetchingDevices,
  selectedLocationId: state.data.locations.selectedLocationId,
  isDeviceDetailModalActive: state.ui.devices.isDeviceDetailModalActive,
  isDeviceRegistrationModalActive: state.ui.devices.isDeviceRegistrationModalActive,
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
