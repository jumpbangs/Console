import React from 'react';

import Modal from 'components/common/modal';
import { formatDate } from 'utils/dateTime';
import { MONTH_DAY_TIME } from 'constants/date';
import LocationResponse from 'domain/response/Location';
import { convertToDecimalPrecision } from 'utils/helper';
import { currencyStringToSymbolMap } from 'maps/currencyToSymbol';
import { DEFAULT_DECIMAL_PRECISION } from 'constants/appConstants';
import { TicketsSelectorPayload } from 'domain/misc/tickets/Ticket';

interface TicketDetailsProps {
  hide?: () => void;
  isTicketModalActive: boolean;
  data: TicketsSelectorPayload;
}

/**
 * Ticket details component
 *
 * @returns {React.ReactElement}
 */
const TicketDetails: React.FC<TicketDetailsProps> = (props: TicketDetailsProps): React.ReactElement => {
  const { hide, data, isTicketModalActive } = props;

  const { id, dob, reference, location, server, total, currency, name, guests } = data;
  const {
    address: { line1 },
  } = location as LocationResponse;

  const currencySymbol = currencyStringToSymbolMap[currency] || '';
  const totalAmount = `${currencySymbol}${convertToDecimalPrecision(total, DEFAULT_DECIMAL_PRECISION)}`;

  return (
    <Modal headerText="Ticket details" isShown={isTicketModalActive} hide={hide}>
      <div className="ticket-details">
        <p className="mb-9x text-bold">{id}</p>
        <div className="row">
          <div className="col col-6">
            <div className="list-card">
              <div className="list-card__label">Date</div>
              <div className="list-card__text">{formatDate(dob, MONTH_DAY_TIME)}</div>
            </div>
          </div>
          <div className="col col-6">
            <div className="list-card">
              <div className="list-card__label">Reference</div>
              <div className="list-card__text">{reference}</div>
            </div>
          </div>
          <div className="col col-6">
            <div className="list-card">
              <div className="list-card__label">Location</div>
              <div className="list-card__text">
                <div>{line1}</div>
              </div>
            </div>
          </div>
          <div className="col col-6">
            <div className="list-card">
              <div className="list-card__label">Name</div>
              <div className="list-card__text">{name}</div>
            </div>
          </div>
          <div className="col col-6">
            <div className="list-card">
              <div className="list-card__label">Guests</div>
              <div className="list-card__text">{guests}</div>
            </div>
          </div>
          <div className="col col-6">
            <div className="list-card">
              <div className="list-card__label">Server</div>
              <div className="list-card__text">{server}</div>
            </div>
          </div>
          <div className="col col-6">
            <div className="list-card mb-1x">
              <div className="list-card__label">Total</div>
              <div className="list-card__text">
                <p className="sub-title text-bold">{totalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TicketDetails;
