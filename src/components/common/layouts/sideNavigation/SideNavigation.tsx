import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReceiptSVGIcon, DevicesOtherSVGIcon, SettingsSVGIcon, HomeSVGIcon } from '@react-md/material-icons';

import routes from 'constants/routes';
import { ReactComponent as PaymentIcon } from 'assets/icons/payment.svg';

/**
 * Side Navigation.
 *
 * @returns {React.ReactElement}
 */
const SideNavigation: React.FC = (): React.ReactElement => {
  return (
    <nav className="side-nav">
      <ul className="side-nav__menu">
        <li className="side-nav__item">
          <NavLink exact to={routes.ROOT} activeClassName="side-nav__link--active" className="side-nav__link ">
            <span className="menu__icon">
              <HomeSVGIcon />
            </span>
            Home
          </NavLink>
        </li>
        <li className="side-nav__item">
          <NavLink exact to={routes.TICKETS} activeClassName="side-nav__link--active" className="side-nav__link ">
            <span className="menu__icon">
              <ReceiptSVGIcon />
            </span>
            Tickets
          </NavLink>
        </li>
        <li className="side-nav__item">
          <NavLink exact to={routes.TRANSACTIONS} activeClassName="side-nav__link--active" className="side-nav__link ">
            <span className="menu__icon">
              <PaymentIcon />
            </span>
            Transactions
          </NavLink>
        </li>
        <li className="side-nav__item">
          <NavLink exact to={routes.DEVICES} activeClassName="side-nav__link--active" className="side-nav__link ">
            <span className="menu__icon">
              <DevicesOtherSVGIcon />
            </span>
            Devices
          </NavLink>
        </li>
        <li className="side-nav__item">
          <NavLink exact to={routes.SETTINGS} activeClassName="side-nav__link--active" className="side-nav__link ">
            <span className="menu__icon">
              <SettingsSVGIcon />
            </span>
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
