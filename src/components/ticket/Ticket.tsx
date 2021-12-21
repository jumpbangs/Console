// [TODO] This will get removed once we changed the tslint rules.
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';

import keyboard from 'constants/keyboard';
import SearchBar from '../common/searchBar';
import AppState from 'domain/states/AppState';
import TicketTable from './components/TicketTable';
import ReactSelect from 'components/common/reactSelect';
import { getTicketsData } from 'selector/getTicketsData';
import { DateRange } from 'domain/misc/common/DateRange';
import { fetchTickets } from 'actions/tickets/fetchTickets';
import { PaginationOptions } from 'domain/request/Pagination';
import TimePeriodSelection from 'components/common/dateRangePicker';
import { PaginationRowOptions } from 'constants/paginationRowOptions';
import { setTicketPagination } from 'actions/tickets/ticketPagination';
import { TicketDetailsPayload, TicketSelectorProps } from 'domain/misc/tickets/Ticket';
import { DEFAULT_COUNTER_COUNT, DEFAULT_PAGINATION_LIMIT } from 'constants/appConstants';

interface MappedProps {
  hasMore: boolean;
  dateRange: DateRange;
  selectedLocationId: string;
  isFetchingTickets: boolean;
  tickets: TicketSelectorProps;
  isTicketModalActive: boolean;
  ticketPagination: PaginationOptions;
  ticketDetails: TicketDetailsPayload;
}

interface DispatchedProps {
  setTicketPagination: (options: PaginationOptions) => void;
  fetchTickets: (
    endDate: number | null,
    startDate: number | null,
    pagination: PaginationOptions,
    selectedLocationId?: string,
    search?: string
  ) => void;
}

type InjectedProps = MappedProps & DispatchedProps;

/**
 * Ticket component.
 *
 * @param {InjectedProps} props
 *
 * @returns {React.ReactElement}
 */
const Ticket: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const {
    tickets,
    hasMore,
    ticketDetails,
    ticketPagination,
    isFetchingTickets,
    selectedLocationId,
    isTicketModalActive,
    dateRange: { startDate, endDate },
  } = props;

  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    return () => {
      props.setTicketPagination({
        ending_before: '',
        starting_after: '',
        counter: DEFAULT_COUNTER_COUNT,
        limit: DEFAULT_PAGINATION_LIMIT,
      });
    };
  }, []);

  const fetchTicketsData = React.useCallback(async () => {
    try {
      await props.fetchTickets(endDate, startDate, ticketPagination, selectedLocationId, search);
    } catch (error) {
      // [TODO] handle error
    }
  }, [ticketPagination, selectedLocationId, search, startDate, endDate]);

  const updateTicketPagination = React.useCallback(async () => {
    await props.setTicketPagination({
      ...ticketPagination,
      ending_before: '',
      starting_after: '',
      counter: DEFAULT_COUNTER_COUNT,
    });
  }, [selectedLocationId]);

  React.useEffect(() => {
    fetchTicketsData();
  }, [fetchTicketsData]);

  React.useEffect(() => {
    updateTicketPagination();
  }, [updateTicketPagination]);

  const defaultRowOption = PaginationRowOptions.find((item) => item.value === ticketPagination.limit);

  const nextHandler = async () => {
    const nextId = tickets[tickets.length - 1].id;
    await props.setTicketPagination({
      ...ticketPagination,
      ending_before: '',
      starting_after: nextId,
      counter: ticketPagination.counter + 1,
    });
  };

  const previousHandler = async () => {
    const previousId = tickets[0].id;
    await props.setTicketPagination({
      ...ticketPagination,
      starting_after: '',
      ending_before: previousId,
      counter: ticketPagination.counter - 1,
    });
  };

  const hasPrevious = ticketPagination.counter > 0;
  const hasMoreNext = (hasMore || ticketPagination.counter === 0) && tickets.length >= ticketPagination.limit;
  const selectRowOption = (options: any) => {
    props.setTicketPagination({
      ...ticketPagination,
      ending_before: '',
      starting_after: '',
      limit: options.value,
      counter: DEFAULT_COUNTER_COUNT,
    });
  };

  const _handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === keyboard.ENTER) {
      const target = event.target as HTMLInputElement;
      const value = target.value;
      setSearch(value);
    }
  };

  const _handleOnClear = () => {
    setSearch('');
  };

  return (
    <div>
      <h1 className="title">Tickets</h1>
      <div className="filter-section mb-5x">
        <div className="filter-section__left">
          <SearchBar
            className="mr-2x"
            onClear={_handleOnClear}
            onKeyDown={_handleKeyDown}
            placeholder="Search by reference"
          />
          <div className="filter-section__dropdown">
            <ReactSelect
              options={PaginationRowOptions}
              defaultValue={defaultRowOption}
              onChange={(options) => selectRowOption(options)}
            />
          </div>
        </div>
        <div className="filter-section__right">
          <TimePeriodSelection />
        </div>
      </div>
      <TicketTable
        tickets={tickets}
        onNext={nextHandler}
        hasMoreNext={hasMoreNext}
        onPrevious={previousHandler}
        ticketDetails={ticketDetails}
        hasMorePrevious={hasPrevious}
        isFetchingTickets={isFetchingTickets}
        isTicketModalActive={isTicketModalActive}
      />
    </div>
  );
};

const mapDispatchToProps = {
  fetchTickets,
  setTicketPagination,
};

const mapStateToProps = (state: AppState) => ({
  tickets: getTicketsData(state),
  dateRange: state.data.dateRange,
  hasMore: state.data.tickets.tickets.has_more,
  ticketDetails: state.data.tickets.ticketDetails,
  isFetchingTickets: state.ui.tickets.isFetchingTickets,
  ticketPagination: state.data.tickets.ticketPagination,
  isTicketModalActive: state.ui.tickets.isTicketModalActive,
  selectedLocationId: state.data.locations.selectedLocationId,
});

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
