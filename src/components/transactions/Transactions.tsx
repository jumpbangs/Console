/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';

import keyboard from 'constants/keyboard';
import AppState from 'domain/states/AppState';
import SearchBar from 'components/common/searchBar';
import ReactSelect from 'components/common/reactSelect';
import { DateRange } from 'domain/misc/common/DateRange';
import { PaginationOptions } from 'domain/request/Pagination';
import TransactionsTable from './components/TransactionsTable';
import { TransactionResponse } from 'domain/response/Transaction';
import TimePeriodSelection from 'components/common/dateRangePicker';
import { PaginationRowOptions } from 'constants/paginationRowOptions';
import { fetchTransactions } from 'actions/transactions/fetchTransactions';
import { TransactionDetailsPayload } from 'domain/misc/transactions/Transactions';
import { setTransactionPagination } from 'actions/transactions/transactionPagination';
import { DEFAULT_COUNTER_COUNT, DEFAULT_PAGINATION_LIMIT } from 'constants/appConstants';

interface MappedProps {
  dateRange: DateRange;
  selectedLocationId: string;
  pagination: PaginationOptions;
  isFetchingTransactions: boolean;
  isTransactionModalActive: boolean;
  transactions: TransactionResponse;
  transactionDetails: TransactionDetailsPayload;
}

interface DispatchedProps {
  setTransactionPagination: (options: PaginationOptions) => void;
  fetchTransactions: (
    endDate: number | null,
    startDate: number | null,
    pagination: PaginationOptions,
    search?: string,
    selectedLocationId?: string
  ) => void;
}

type InjectedProps = MappedProps & DispatchedProps;

/**
 * Transaction component.
 *
 * @param {InjectedProps} props
 *
 * @returns {React.ReactElement}
 */
const Transactions: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const {
    pagination,
    transactions,
    selectedLocationId,
    transactionDetails,
    isFetchingTransactions,
    isTransactionModalActive,
    dateRange: { startDate, endDate },
  } = props;

  const [search, setSearch] = React.useState('');

  const fetchTransactionData = React.useCallback(async () => {
    try {
      await props.fetchTransactions(endDate, startDate, pagination, selectedLocationId, search);
    } catch (error) {
      // [TODO] handle error
    }
  }, [pagination, selectedLocationId, search, startDate, endDate]);

  const updateTransactionPagination = React.useCallback(() => {
    props.setTransactionPagination({
      ...pagination,
      ending_before: '',
      starting_after: '',
      counter: DEFAULT_COUNTER_COUNT,
    });
  }, [selectedLocationId]);

  React.useEffect(() => {
    fetchTransactionData();
  }, [fetchTransactionData]);

  React.useEffect(() => {
    updateTransactionPagination();
  }, [updateTransactionPagination]);

  React.useEffect(() => {
    return () => {
      props.setTransactionPagination({
        ending_before: '',
        starting_after: '',
        counter: DEFAULT_COUNTER_COUNT,
        limit: DEFAULT_PAGINATION_LIMIT,
      });
    };
  }, []);

  const defaultRowOption = PaginationRowOptions.find((item) => item.value === pagination.limit);

  const nextHandler = async () => {
    const nextId = transactions.data[transactions.data.length - 1].id;
    await props.setTransactionPagination({
      ...pagination,
      ending_before: '',
      starting_after: nextId,
      counter: pagination.counter + 1,
    });
  };

  const previousHandler = async () => {
    const previousId = transactions.data[0].id;
    await props.setTransactionPagination({
      ...pagination,
      starting_after: '',
      ending_before: previousId,
      counter: pagination.counter - 1,
    });
  };

  const hasPrevious = pagination.counter > 0;
  const hasMoreNext =
    (transactions.has_more || pagination.counter === 0) && transactions.data.length >= pagination.limit;
  const selectRowOption = (options: any) => {
    props.setTransactionPagination({
      ...pagination,
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
      <h1 className="title">Transactions</h1>
      <div className="filter-section mb-5x">
        <div className="filter-section__left">
          <SearchBar
            className="mr-2x"
            onClear={_handleOnClear}
            onKeyDown={_handleKeyDown}
            placeholder="Search by last 4 digits of card"
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
      <TransactionsTable
        onNext={nextHandler}
        hasMoreNext={hasMoreNext}
        transactions={transactions}
        onPrevious={previousHandler}
        hasMorePrevious={hasPrevious}
        transactionDetails={transactionDetails}
        isFetchingTransactions={isFetchingTransactions}
        isTransactionModalActive={isTransactionModalActive}
      />
    </div>
  );
};

const mapDispatchToProps = {
  fetchTransactions,
  setTransactionPagination,
};

const mapStateToProps = (state: AppState) => ({
  dateRange: state.data.dateRange,
  transactions: state.data.transactions.transactions,
  pagination: state.data.transactions.transactionPagination,
  selectedLocationId: state.data.locations.selectedLocationId,
  transactionDetails: state.data.transactions.transactionDetails,
  isFetchingTransactions: state.ui.transactions.isFetchingTransactions,
  isTransactionModalActive: state.ui.transactions.isTransactionModalActive,
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
