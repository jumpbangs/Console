import React from 'react';
import { AddSVGIcon } from '@react-md/material-icons';

import SearchBar from '../common/searchBar';
import LocationTable from './LocationTable';

/**
 * Location component.
 *
 * @returns {React.ReactElement}
 */
const Locations: React.FC = (): React.ReactElement => {
  return (
    <div>
      <h1 className="title">Locations</h1>
      <div className="filter-section mb-5x">
        <div className="filter-section__left">
          <SearchBar className="mr-2x" placeholder="Search..." />
        </div>
        <div className="filter-section__right">
          <button className="btn btn--primary btn--with-icon">
            <AddSVGIcon className="btn__icon btn__icon--left" />
            New
          </button>
        </div>
      </div>
      <LocationTable />
    </div>
  );
};

export default Locations;
