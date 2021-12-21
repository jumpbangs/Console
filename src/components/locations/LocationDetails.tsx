import React from 'react';
import { connect } from 'react-redux';
import { EditSVGIcon, LinkSVGIcon } from '@react-md/material-icons';

import useToggle from 'hooks/useToggle';
import EditLocation from './editLocation';
import Modal from 'components/common/modal';
import { getMapStaticUrl } from 'utils/map';
import AppState from 'domain/states/AppState';
import { formatAddress } from 'utils/address';
import storeIcon from 'assets/icons/store.svg';
import { formatPhoneNumber } from 'utils/phoneNumber';
import ImageLoader from 'components/common/imageLoader';
import LocationResponse from 'domain/response/Location';
import { getLocationInitialData } from 'services/location';

interface LocationDetailsProps {
  isShown: boolean;
  hide?: () => void;
  locationId: string;
}

interface MappedProps {
  locations: LocationResponse[];
}

type InjectedProps = LocationDetailsProps & MappedProps;

/**
 * Location details component
 *
 * @param {InjectedProps} props
 *
 * @returns {React.ReactElement}
 */
const LocationDetails: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const { locationId, isShown, hide } = props;

  const location = props.locations.find((value) => value.id === locationId) || getLocationInitialData();

  const { address, phone, website, display_name, logo } = location;

  const formattedAddress = formatAddress(address);

  const addressString = formattedAddress.reduce((result, value) => {
    return `${result} ${value.join(' ')}`;
  }, '');

  const fullAddress = formattedAddress.map((value, index) => <span key={index}>{value.join(' ')}&nbsp;</span>);

  const [showEditLocation, toggleEditLocation] = useToggle();

  return (
    <>
      <Modal headerText={display_name || ''} isShown={isShown} hide={hide}>
        <div className="location-details">
          <div className="location__info d-flex">
            <div className="location__image nametag nametag--location">
              <ImageLoader src={logo || storeIcon} defaultSrc={storeIcon} alt="LOGO" />
            </div>
            <div className="ml-4x">
              <div className="list-card list-card--full-width mb-4x">
                <div className="list-card__label">Address</div>
                <div className="list-card__text">{fullAddress}</div>
              </div>
              {phone && (
                <div className="list-card list-card--full-width mb-4x">
                  <div className="list-card__label">Phone number</div>
                  <div className="list-card__text">{formatPhoneNumber(phone)}</div>
                </div>
              )}
              {website && (
                <div className="list-card list-card--full-width mb-5x">
                  <div className="list-card__label">Website</div>
                  <div className="list-card__text">
                    <a href={website} target="_blank" rel="noopener noreferrer" className="text-bold link">
                      {website}
                      <LinkSVGIcon className="ml-2x" style={{ fill: '#CFD7DF' }} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="location__map mb-4x">
            <img src={getMapStaticUrl(addressString)} alt={addressString} />
          </div>
          <button className="btn btn--gray-light btn--block btn--with-icon" onClick={toggleEditLocation}>
            <EditSVGIcon className="btn__icon btn__icon--left" /> <span className="btn__label">Edit</span>
          </button>
        </div>
      </Modal>
      {isShown && <EditLocation isShown={showEditLocation} hide={toggleEditLocation} location={location} />}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  locations: state.data.locations.locations,
});

export default connect(mapStateToProps)(LocationDetails);
