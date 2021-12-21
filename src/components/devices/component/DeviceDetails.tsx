import React from 'react';

import Modal from 'components/common/modal';
import { lastSeenTime } from 'utils/dateTime';
import LocationResponse from 'domain/response/Location';
import { deviceTypeToNameMap } from 'maps/deviceTypeToName';
import { DeviceResponseData } from 'domain/response/Devices';

interface DeviceDetailProps {
  closeModal: () => void;
  isModalVisible: boolean;
  deviceDetails: DeviceResponseData;
}

/**
 * Device details component
 *
 * @returns {React.ReactElement}
 */
const DeviceDetails: React.FC<DeviceDetailProps> = (props: DeviceDetailProps): React.ReactElement => {
  const { closeModal, isModalVisible, deviceDetails } = props;
  const {
    label,
    status,
    location,
    last_seen,
    ip_address,
    device_type,
    serial_number,
    device_sw_version,
  } = deviceDetails;

  const { display_name } = location as LocationResponse;

  const deviceStatus = `${status === 'online' ? 'green' : 'gray'}`;

  return (
    <Modal headerText="Device details" isShown={isModalVisible} hide={closeModal}>
      <div className="device-details">
        <p className="text-bold">{label}</p>
        <div className={`status-indicator status-indicator--${deviceStatus}-text my-6x`}>
          <div className="status-indicator__bulb" />
          <span className="status-indicator__label text-bold text-capitalized">{status}</span>
        </div>
        <div className="row">
          <div className="col col-6">
            <div className="list-card">
              <div className="list-card__label">Type</div>
              <div className="list-card__text">{deviceTypeToNameMap[device_type] || ''}</div>
            </div>
          </div>
          <div className="col col-6">
            <div className="list-card">
              <div className="list-card__label">Serial number</div>
              <div className="list-card__text">{serial_number}</div>
            </div>
          </div>
          <div className="col col-6">
            <div className="list-card">
              <div className="list-card__label">Location</div>
              <div className="list-card__text">
                <div>{display_name}</div>
              </div>
            </div>
          </div>
          <div className="col col-6">
            <div className="list-card">
              <div className="list-card__label">Last seen</div>
              <div className="list-card__text">{lastSeenTime(last_seen)}</div>
            </div>
          </div>
          <div className="col col-6">
            <div className="list-card">
              <div className="list-card__label">Software version</div>
              <div className="list-card__text">{device_sw_version}</div>
            </div>
          </div>
          <div className="col col-6">
            <div className="list-card">
              <div className="list-card__label">IP address</div>
              <div className="list-card__text">{ip_address}</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeviceDetails;
