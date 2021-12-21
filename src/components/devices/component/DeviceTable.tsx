/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';
import { UseTableRowProps } from 'react-table';
import { AddSVGIcon } from '@react-md/material-icons';

import Table from 'components/common/table';
import DeviceDetails from './DeviceDetails';
import AppState from 'domain/states/AppState';
import RegisterDevice from './RegisterDevice';
import { MONTH_DAY_YEAR_TIME } from 'constants/date';
import ReactSelect from 'components/common/reactSelect';
import { lastSeenTime, formatDate } from 'utils/dateTime';
import { deviceTypeToNameMap } from 'maps/deviceTypeToName';
import { deviceTypeToIconMap } from 'maps/deviceTypeToIcon';
import { setDeviceDetails } from 'actions/device/deviceDetails';
import { DevicePaginationOptions } from 'domain/request/Pagination';
import { PaginationRowOptions } from 'constants/paginationRowOptions';
import { setDevicePagination } from 'actions/device/devicePagination';
import { DeviceSelectorProps, DeviceDetailPayload } from 'domain/misc/devices/Devices';
import { DEFAULT_COUNTER_COUNT, DEFAULT_PAGINATION_LIMIT } from 'constants/appConstants';
import { setDeviceDetailModalStatus, setDeviceRegistrationModalStatus } from 'actions/device/device';

interface DeviceTableProps {
  hasMore: boolean;
  selectedLocation: string;
  isFetchingDevices: boolean;
  devices: DeviceSelectorProps;
  isDeviceDetailModalActive: boolean;
  deviceDetails: DeviceDetailPayload;
  isDeviceRegistrationModalActive: boolean;
  devicePagination: DevicePaginationOptions;
}

interface DispatchProps {
  setDeviceDetailModalStatus: (status: boolean) => void;
  setDeviceDetails: (data: DeviceDetailPayload) => void;
  setDeviceRegistrationModalStatus: (status: boolean) => void;
  setDevicePagination: (options: DevicePaginationOptions) => void;
}

type InjectedProps = DeviceTableProps & DispatchProps;

/**
 * Device table component.
 *
 * @param {InjectedProps} props
 *
 * @returns {React.ReactElement}
 */
const DeviceTable: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const {
    devices,
    hasMore,
    deviceDetails,
    devicePagination,
    selectedLocation,
    isFetchingDevices,
    isDeviceDetailModalActive,
    isDeviceRegistrationModalActive,
  } = props;

  React.useEffect(() => {
    return () => {
      props.setDevicePagination({
        ending_before: '',
        starting_after: '',
        counter: DEFAULT_COUNTER_COUNT,
        limit: DEFAULT_PAGINATION_LIMIT,
      });
    };
  }, []);

  const allTypes = { value: '', label: 'All types' };
  const devicesTypes = Object.keys(deviceTypeToNameMap).map((key) => {
    return { value: key, label: deviceTypeToNameMap[key] };
  });

  const typeOptions = [allTypes, ...devicesTypes];

  const statusOptions = [
    { value: '', label: 'Any status' },
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
  ];

  const deviceType = typeOptions.find((item) => item.value === devicePagination.device_type);
  const deviceStatus = statusOptions.find((item) => item.value === devicePagination.status);
  const defaultRowOptions = PaginationRowOptions.find((item) => item.value === devicePagination.limit);

  const handleRowClick = async (data: UseTableRowProps<any>) => {
    try {
      await props.setDeviceDetails(data.original);
      props.setDeviceDetailModalStatus(true);
    } catch (error) {
      // [TODO] Log error
    }
  };

  const handleModalClose = async () => {
    props.setDeviceDetailModalStatus(false);
    await props.setDeviceDetails(null);
  };

  const nextHandler = async () => {
    const nextId = devices[devices.length - 1].id;
    await props.setDevicePagination({
      ...devicePagination,
      ending_before: '',
      starting_after: nextId,
      counter: devicePagination.counter + 1,
    });
  };

  const previousHandler = async () => {
    const previousId = devices[0].id;
    await props.setDevicePagination({
      ...devicePagination,
      starting_after: '',
      ending_before: previousId,
      counter: devicePagination.counter - 1,
    });
  };

  const handleRegistrationModalOpen = () => {
    props.setDeviceRegistrationModalStatus(true);
  };

  const handleRegistrationModalClose = () => {
    props.setDeviceRegistrationModalStatus(false);
  };

  const columns = [
    {
      Header: '',
      width: 30,
      accessor: 'deviceType',
      isVisible: true,
      id: 'deviceIcon',
      Cell: (values: any) => {
        const {
          row: { original },
        } = values;

        return deviceTypeToIconMap[original.device_type] || '';
      },
    },
    {
      width: 100,
      Header: 'Label',
      isVisible: true,
      accessor: 'label',
      Cell: (labelValues: any) => {
        const {
          row: { original },
        } = labelValues;
        const deviceLabel = original.label ? `${original.label}` : '';

        return (
          <span className="text-capitalized text-ellipsis" title={deviceLabel}>
            {deviceLabel}
          </span>
        );
      },
    },
    {
      Header: 'types',
      isVisible: false,
      accessor: 'device_type',
    },
    {
      Header: '',
      width: 100,
      isVisible: true,
      accessor: 'status',
      Cell: (statusValues: any) => {
        const {
          row: { original },
        } = statusValues;

        return (
          <div className={`status-indicator status-indicator--${original.status === 'online' ? 'green' : 'gray'}`}>
            <div className="status-indicator__bulb" />
            <span className="status-indicator__label text-capitalized">{original.status}</span>
          </div>
        );
      },
    },
    {
      isVisible: true,
      Header: 'Serial number',
      accessor: 'serialNumber',
      Cell: (serialNumberValues: any) => {
        const {
          row: { original },
        } = serialNumberValues;

        return <span>{original.serial_number}</span>;
      },
    },
    {
      isVisible: true,
      Header: 'Location',
      accessor: 'location',
      width: 200,
      Cell: (locationValues: any) => {
        const {
          row: { original },
        } = locationValues;

        const deviceLocation = original?.location?.display_name ? `${original.location.display_name}` : '';

        return <span className="text-ellipsis">{deviceLocation}</span>;
      },
    },
    {
      isVisible: true,
      Header: 'last seen',
      accessor: 'lastSeen',
      Cell: (lastSeenValues: any) => {
        const {
          row: { original },
        } = lastSeenValues;
        const deviceSeenTime = lastSeenTime(original.last_seen);
        const deviceLastSeen = original.last_seen ? `${deviceSeenTime} ago` : ' ';

        return <span title={formatDate(original.last_seen, MONTH_DAY_YEAR_TIME)}>{deviceLastSeen}</span>;
      },
    },
  ];

  const handleDropDownChange = (options: any, filterType: string) => {
    props.setDevicePagination({
      ...devicePagination,
      ending_before: '',
      starting_after: '',
      [filterType]: options.value,
      counter: DEFAULT_COUNTER_COUNT,
    });
  };

  const hasPrevious = devicePagination.counter > 0;
  const hasMoreNext = (hasMore || devicePagination.counter === 0) && devices.length >= devicePagination.limit;
  const selectRowOption = (options: any) => {
    props.setDevicePagination({
      ...devicePagination,
      ending_before: '',
      starting_after: '',
      limit: options.value,
      counter: DEFAULT_COUNTER_COUNT,
    });
  };

  return (
    <>
      <h1 className="title">Devices</h1>
      <div className="filter-section mb-5x">
        <div className="filter-section__left">
          <div className="filter-section__dropdown mr-2x">
            <ReactSelect
              isSearchable={false}
              options={typeOptions}
              defaultValue={deviceType}
              onChange={(options) => handleDropDownChange(options, 'device_type')}
            />
          </div>
          <div className="filter-section__dropdown mr-2x">
            <ReactSelect
              isSearchable={false}
              options={statusOptions}
              defaultValue={deviceStatus}
              onChange={(options) => handleDropDownChange(options, 'status')}
            />
          </div>
          <div className="filter-section__dropdown">
            <ReactSelect
              options={PaginationRowOptions}
              defaultValue={defaultRowOptions}
              isSearchable={false}
              onChange={(options) => selectRowOption(options)}
            />
          </div>
        </div>
        <div className="filter-section__right">
          <button className="btn btn--primary btn--with-icon" onClick={handleRegistrationModalOpen}>
            <AddSVGIcon className="btn__icon btn__icon--left" />
            New
          </button>
        </div>
      </div>
      {devices && (
        <Table
          data={devices}
          columns={columns}
          onNext={nextHandler}
          isFilterVisible={true}
          hasMoreNext={hasMoreNext}
          onRowClick={handleRowClick}
          onPrevious={previousHandler}
          isLoading={isFetchingDevices}
          hasMorePrevious={hasPrevious}
        />
      )}

      <RegisterDevice
        selectedLocation={selectedLocation}
        closeModal={handleRegistrationModalClose}
        isModalVisible={isDeviceRegistrationModalActive}
      />

      {deviceDetails && (
        <DeviceDetails
          deviceDetails={deviceDetails}
          closeModal={handleModalClose}
          isModalVisible={isDeviceDetailModalActive}
        />
      )}
    </>
  );
};

const mapDispatchToProps = {
  setDeviceDetails,
  setDevicePagination,
  setDeviceDetailModalStatus,
  setDeviceRegistrationModalStatus,
};

const mapStateToProps = (state: AppState) => ({
  hasMore: state.data.devices.devices.has_more,
  selectedLocation: state.data.locations.selectedLocationId,
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceTable);
