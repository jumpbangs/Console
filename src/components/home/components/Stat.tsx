import React from 'react';

import ChartState from 'domain/states/data/home/Chart';
import { CONVERT_TO_DOLLAR } from 'constants/appConstants';

interface StatProps {
  statData: ChartState;
}

/**
 * Overview Stat Component
 *
 * @returns {React.ReactElement}
 */
const Stat: React.FC<StatProps> = (props: StatProps): React.ReactElement => {
  const {
    statData: {
      overview: { totalSales, cardVolume, guestCounts, totalTickets, totalTransactions },
    },
  } = props;

  const totalSalesData = `$${totalSales / CONVERT_TO_DOLLAR}` || 0;
  const cardVolumeData = `$${cardVolume / CONVERT_TO_DOLLAR}` || 0;

  return (
    <div className="card-section">
      <div className="stat-card">
        <div className="stat-card__title">Tickets</div>
        <div className="stat-card__value">{totalTickets}</div>
      </div>
      <div className="stat-card">
        <div className="stat-card__title">Total sales</div>
        <div className="stat-card__value">{totalSalesData}</div>
      </div>
      <div className="stat-card">
        <div className="stat-card__title">Guests</div>
        <div className="stat-card__value">{guestCounts}</div>
      </div>
      <div className="stat-card">
        <div className="stat-card__title">Transactions</div>
        <div className="stat-card__value">{totalTransactions}</div>
      </div>
      <div className="stat-card">
        <div className="stat-card__title">Card volume</div>
        <div className="stat-card__value">{cardVolumeData}</div>
      </div>
    </div>
  );
};

export default Stat;
