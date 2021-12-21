import React from 'react';
import { connect } from 'react-redux';

import { formatDate } from 'utils/dateTime';
import Table from 'components/common/table';
import TicketDetails from './TicketDetails';
import { MONTH_DAY_TIME } from 'constants/date';
import { convertToDecimalPrecision } from 'utils/helper';
import { setTicketModalStatus } from 'actions/tickets/tickets';
import { currencyStringToSymbolMap } from 'maps/currencyToSymbol';
import { DEFAULT_DECIMAL_PRECISION } from 'constants/appConstants';
import { setTicketDetails } from 'actions/tickets/setTicketDetails';
import { TicketDetailsPayload, TicketSelectorProps } from 'domain/misc/tickets/Ticket';

interface TicketTableProps {
  onNext?: () => void;
  hasMoreNext?: boolean;
  onPrevious?: () => void;
  hasMorePrevious?: boolean;
  isFetchingTickets: boolean;
  tickets: TicketSelectorProps;
  isTicketModalActive: boolean;
  ticketDetails: TicketDetailsPayload;
}

interface DispatchedProps {
  setTicketModalStatus: (arg: boolean) => void;
  setTicketDetails: (ticketData: TicketDetailsPayload) => void;
}

type InjectedProps = TicketTableProps & DispatchedProps;

/**
 * Ticket table component.
 *
 * @returns {React.ReactElement}
 */
const TicketTable: React.FC<InjectedProps> = (props: InjectedProps) => {
  const { onNext, onPrevious, hasMoreNext, hasMorePrevious, isTicketModalActive } = props;

  const columns = [
    {
      Header: 'Reference',
      accessor: 'reference',
      width: 180,
      isVisible: true,
      Cell: (props: any) => {
        const {
          row: { original },
        } = props;

        return <span>{original.reference}</span>;
      },
    },
    {
      Header: 'Total',
      accessor: 'total',
      isVisible: true,
      Cell: (props: any) => {
        const {
          row: { original },
        } = props;

        const currentCurrency = currencyStringToSymbolMap[original.currency] || '';
        const currentTotal = `${currentCurrency}${convertToDecimalPrecision(
          original.total,
          DEFAULT_DECIMAL_PRECISION
        )}`;

        return <span className="text-bold">{currentTotal}</span>;
      },
    },
    {
      Header: 'Location',
      accessor: 'location',
      width: 250,
      isVisible: true,
      Cell: (props: any) => {
        const {
          row: { original },
        } = props;

        const locationData = original?.location?.display_name ? original.location.display_name : '';

        return <span>{locationData}</span>;
      },
    },
    {
      Header: 'Date',
      accessor: 'date',
      isVisible: true,
      Cell: (props: any) => {
        const {
          row: { original },
        } = props;

        const formattedDate = (original.dob && formatDate(original.dob, MONTH_DAY_TIME)) || '';

        return <span>{formattedDate}</span>;
      },
    },
  ];

  const { tickets, isFetchingTickets, ticketDetails } = props;

  const handleRowClick = async (data: { original: TicketDetailsPayload }) => {
    try {
      const ticketData = data.original;

      await props.setTicketDetails(ticketData);
      await props.setTicketModalStatus(true);
    } catch (error) {
      // Handle error here.
    }
  };

  const handleModalClose = async () => {
    props.setTicketModalStatus(false);
    await props.setTicketDetails(null);
  };

  return (
    <>
      <Table
        data={tickets}
        onNext={onNext}
        columns={columns}
        onPrevious={onPrevious}
        hasMoreNext={hasMoreNext}
        onRowClick={handleRowClick}
        isLoading={isFetchingTickets}
        hasMorePrevious={hasMorePrevious}
      />

      {ticketDetails && (
        <TicketDetails data={ticketDetails} hide={handleModalClose} isTicketModalActive={isTicketModalActive} />
      )}
    </>
  );
};

const mapDispatchToProps = {
  setTicketDetails,
  setTicketModalStatus,
};

export default connect(null, mapDispatchToProps)(TicketTable);
