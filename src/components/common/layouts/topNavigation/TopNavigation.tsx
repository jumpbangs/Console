/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DEFAULT_LOCATION } from 'constants/appConstants';
import { ChevronRightSVGIcon, PersonSVGIcon, StoreMallDirectorySVGIcon } from '@react-md/material-icons';

import { logo } from 'assets/images';
import routes from 'constants/routes';
import { decodeToken } from 'utils/jwt';
import AppState from 'domain/states/AppState';
import { User } from 'domain/states/data/Auth';
import LocationResponse from 'domain/response/Location';
import DropDownChangeLocation from './DropDownChangeLocation';
import { fetchAccountById } from 'actions/account/fetchAccountById';
import LocationDropdownItem from 'domain/misc/common/NavbarDropdown';
import { fetchAllLocations } from 'actions/location/fetchAllLocations';

interface MappedProps {
  userInfo: User;
  idToken: string;
  merchantName: string;
  locations: LocationResponse[];
}

interface DispatchedProps {
  fetchAllLocations: () => void;
  fetchAccountById: (accountId: string) => void;
}

type InjectedProps = MappedProps & DispatchedProps;

/**
 * Top nav bar.
 *
 * @returns {React.ReactElement}
 */
const TopNavigation: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const { locations, merchantName, userInfo } = props;

  const allLocation: LocationDropdownItem = { id: '', value: DEFAULT_LOCATION, logo: '' };

  const locationData: LocationDropdownItem[] = locations.map((value) => {
    return { id: value.id, value: value?.display_name || '', logo: value?.logo || '' };
  });

  const locationOptions: LocationDropdownItem[] = [allLocation, ...locationData];

  const fetchProfileData = React.useCallback(async () => {
    try {
      const { account } = decodeToken(props.idToken);
      await props.fetchAccountById(account);
      await props.fetchAllLocations();
    } catch (error) {
      // [TODO] handle error
    }
  }, [props.fetchAccountById, props.fetchAllLocations]);

  React.useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  return (
    <header>
      <div className="header d-flex justify-content-between full-width">
        <div className="header-left d-flex left">
          <div className="logo-wrapper">
            <NavLink to={routes.ROOT}>
              <img src={logo} alt="copper" />
            </NavLink>
          </div>
          <div className="header-left__menu menu menu--header">
            <span className="menu__item" title={merchantName}>
              <span className="menu__icon">
                <StoreMallDirectorySVGIcon />
              </span>
              <span className="text-ellipsis">{merchantName}</span>
            </span>
            <ChevronRightSVGIcon style={{ fill: '#CFD7DF' }} />
            <DropDownChangeLocation items={locationOptions} />
          </div>
        </div>
        <div className="header-right right">
          <div className="header-right__menu">
            {/* <a href="#" className="header-right__item">
              <NotificationsSVGIcon className="rmd-icon--large" />
            </a> */}
            {/* eslint-disable-next-line */}
            <NavLink exact to={routes.PROFILE} className="header-right__item user" title={userInfo.name}>
              <PersonSVGIcon className="rmd-icon--large mr-2x" />
              <span className="user__name">{userInfo.name}</span>
            </NavLink>
            {/* <a href="#" className="header-right__item">
              <HelpSVGIcon className="rmd-icon--large" style={{ fill: '#CFD7DF' }} />
            </a> */}
          </div>
        </div>
      </div>
    </header>
  );
};

const mapDispatchToProps = {
  fetchAccountById,
  fetchAllLocations,
};

const mapStateToProps = (state: AppState) => ({
  idToken: state.data.auth.idToken,
  userInfo: state.data.auth.userInfo,
  locations: state.data.locations.locations,
  merchantName: state.data.accounts.account.name,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigation);
