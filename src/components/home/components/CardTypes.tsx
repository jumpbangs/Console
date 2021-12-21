import React from 'react';

import { cardTypesData } from './data';
import DonughtChart from './donughtChart';

/**
 * Card types component.
 *
 * @returns {React.ReactElement}
 */
const CardTypes: React.FC = (): React.ReactElement => {
  return (
    <div className="card-types-section right pb-8x">
      <h3 className="mt-6x mb-5x">Card types</h3>
      <div className="pie-chart">
        <DonughtChart data={cardTypesData} />
      </div>
    </div>
  );
};

export default CardTypes;
