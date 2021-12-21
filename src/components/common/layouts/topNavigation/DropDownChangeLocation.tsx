/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';
import { CheckCircleSVGIcon, InfoSVGIcon } from '@react-md/material-icons';

import useToggle from 'hooks/useToggle';
import AppState from 'domain/states/AppState';
import ImageLoader from 'components/common/imageLoader';
import { DEFAULT_LOCATION } from 'constants/appConstants';
import LocationDetails from 'components/locations/LocationDetails';
import LocationDropdownItem from 'domain/misc/common/NavbarDropdown';
import { ReactComponent as StoreIcon } from 'assets/icons/store.svg';
import { setSelectedLocation } from 'actions/location/selectLocation';

interface NavbarDropdownProps {
  items: LocationDropdownItem[];
}

interface DispatchedProps {
  setSelectedLocation: (location?: string) => void;
}

interface MappedProps {
  selectedLocationId: string;
}

type InjectedProps = NavbarDropdownProps & DispatchedProps & MappedProps;

/**
 * Location DropDown.
 *
 * @returns {React.ReactElement}
 */
const DropDownChangeLocation: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const { items, selectedLocationId } = props;

  const [listOpen, setListStatus] = React.useState<boolean>(false);

  const [locationId, setSelectedLocationId] = React.useState<string>('');

  const [showLocationDetails, toggleLocationDetails] = useToggle();

  const node = React.useRef<any>();

  const handleClickOutside = (e: any) => {
    if (node.current.contains(e.target)) return;
    setListStatus(false);
  };

  /**
   * Hides the dropdown menu when user clicks outside the div.
   */
  React.useEffect(() => {
    if (listOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [listOpen]);

  const toggleList = (): void => {
    setListStatus(!listOpen);
  };

  const handleOnClick = (item: LocationDropdownItem): void => {
    props.setSelectedLocation(item.id);
    setListStatus(!listOpen);
  };

  const onInfoIconClick = (event: React.MouseEvent, locationId: string): void => {
    event.stopPropagation();
    setSelectedLocationId(locationId);
    toggleList();
    toggleLocationDetails();
  };

  const isItemInSelection = (item: LocationDropdownItem): boolean => selectedLocationId === item.id;

  const locationItem = items.find((value) => value.id === selectedLocationId);

  const locationTitle = locationItem?.value || DEFAULT_LOCATION;

  return (
    <div className="dd-wrapper" ref={node}>
      <div className="dd-header text-ellipsis" onClick={toggleList} title={locationTitle}>
        <span className="menu__icon">
          <ImageLoader src={locationItem?.logo || ''} alt="logo" defaultComponent={<StoreIcon />} />
        </span>
        <span>{locationTitle}</span>
      </div>
      {listOpen && (
        <div className="dd-menu">
          <div className="text-bold helper color-gray-75 mb-1x ml-3x">Change location</div>
          {items &&
            items.length > 0 &&
            items.map((item: LocationDropdownItem) => {
              return (
                <div
                  key={item.id}
                  onClick={() => handleOnClick(item)}
                  className={`dd-menu__item ${isItemInSelection(item) && 'selected text-bold'}`}
                >
                  <span className="menu__icon">
                    <ImageLoader src={item.logo} alt="logo" defaultComponent={<StoreIcon className="rmd-icon" />} />
                  </span>
                  <span className="text text-ellipsis">{item.value}</span>
                  <span className="dd-menu__icon right">
                    {isItemInSelection(item) && <CheckCircleSVGIcon style={{ fill: '#1CA672' }} />}
                    {item.value !== DEFAULT_LOCATION ? (
                      <InfoSVGIcon className="info-icon ml-6x" onClick={(event) => onInfoIconClick(event, item.id)} />
                    ) : null}
                  </span>
                </div>
              );
            })}
        </div>
      )}
      <LocationDetails locationId={locationId} isShown={showLocationDetails} hide={toggleLocationDetails} />
    </div>
  );
};

const mapDispatchToProps = {
  setSelectedLocation,
};

const mapStateToProps = (state: AppState) => ({
  ticketPagination: state.data.tickets.ticketPagination,
  devicePagination: state.data.devices.devicePagination,
  selectedLocationId: state.data.locations.selectedLocationId,
  transactionPagination: state.data.transactions.transactionPagination,
});

export default connect(mapStateToProps, mapDispatchToProps)(DropDownChangeLocation);
