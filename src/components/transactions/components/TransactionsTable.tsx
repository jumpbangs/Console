import React from 'react';
import { connect } from 'react-redux';

import { GREEN } from 'constants/color';
import { masterCard } from 'assets/images';
import { formatDate } from 'utils/dateTime';
import Table from 'components/common/table';
import AppState from 'domain/states/AppState';
import { MONTH_DAY_TIME } from 'constants/date';
import RefundPayload from 'domain/request/Refund';
import RefundTransaction from './RefundTransaction';
import TransactionDetails from './TransactionDetails';
import { cardTypeToLogoMap } from 'maps/cardTypeToLogo';
import { convertToDecimalPrecision } from 'utils/helper';
import { formatTransactions } from 'services/transaction';
import { setTicketModalStatus } from 'actions/tickets/tickets';
import { TransactionResponse } from 'domain/response/Transaction';
import { currencyStringToSymbolMap } from 'maps/currencyToSymbol';
import { fetchTicketById } from 'actions/tickets/fetchTicketById';
import { TicketDetailsPayload } from 'domain/misc/tickets/Ticket';
import { DEFAULT_DECIMAL_PRECISION } from 'constants/appConstants';
import { statusToIndicatorColorMap } from 'maps/statusToIndicator';
import { setTicketDetails } from 'actions/tickets/setTicketDetails';
import TicketDetails from 'components/ticket/components/TicketDetails';
import { setTransactionModalStatus } from 'actions/transactions/transactions';
import { TransactionDetailsPayload } from 'domain/misc/transactions/Transactions';
import { setTransactionDetails } from 'actions/transactions/setTransactionDetails';
import { refundTransaction, setRefundModalStatus } from 'actions/transactions/refund';

interface TransactionTableProps {
  onNext?: () => void;
  hasMoreNext?: boolean;
  onPrevious?: () => void;
  hasMorePrevious?: boolean;
  isTicketModalActive: boolean;
  isFetchingTransactions: boolean;
  isTransactionModalActive: boolean;
  transactions: TransactionResponse;
  ticketDetailById: TicketDetailsPayload;
  transactionDetails: TransactionDetailsPayload;
}

interface DispatchedProps {
  fetchTicketById: (arg: string) => void;
  setRefundModalStatus: (arg: boolean) => void;
  setTicketModalStatus: (arg: boolean) => void;
  refundTransaction: (arg: RefundPayload) => void;
  setTransactionModalStatus: (arg: boolean) => void;
  setTicketDetails: (ticketData: TicketDetailsPayload) => void;
  setTransactionDetails: (transactionData: TransactionDetailsPayload) => void;
}

interface MappedProps {
  refundError: string;
  isRefundModalActive: boolean;
}

type InjectedProps = TransactionTableProps & DispatchedProps & MappedProps;

/**
 * Transaction table component.
 *
 * @param {InjectedProps} props
 *
 * @returns {React.ReactElement}
 */
const TransactionsTable: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const {
    onNext,
    onPrevious,
    hasMoreNext,
    refundError,
    transactions,
    hasMorePrevious,
    ticketDetailById,
    transactionDetails,
    isTicketModalActive,
    isRefundModalActive,
    isFetchingTransactions,
    isTransactionModalActive,
  } = props;

  const columns = [
    {
      Header: 'Amount',
      accessor: 'amount',
      width: 80,
      isVisible: true,
      Cell: (props: any) => {
        const {
          row: { original },
        } = props;

        const currencySymbol = currencyStringToSymbolMap[original.currency] || '';
        const currencyWithSymbol = `${currencySymbol}${convertToDecimalPrecision(
          original.amount,
          DEFAULT_DECIMAL_PRECISION
        )}`;

        return <span className="text-bold">{currencyWithSymbol}</span>;
      },
    },
    {
      Header: '',
      accessor: 'currency',
      width: 60,
      isVisible: true,
      Cell: (props: any) => {
        const {
          row: { original },
        } = props;

        return <span>{original.currency}</span>;
      },
    },
    {
      Header: '',
      accessor: 'status',
      isVisible: true,
      Cell: (props: any) => {
        const {
          row: { original },
        } = props;

        const statusColor = statusToIndicatorColorMap[original.status] || GREEN;

        return (
          <div className="d-flex align-items-center">
            <div className={`status-indicator status-indicator--${statusColor}`}>
              <div className="status-indicator__bulb" />
              <span className="status-indicator__label text-capitalized">{original.status}</span>
            </div>
          </div>
        );
      },
    },
    {
      Header: 'Ticket',
      accessor: 'ticket',
      width: 320,
      isVisible: true,
      Cell: (props: any) => {
        const {
          row: { original },
        } = props;

        return <span>{original.ticket}</span>;
      },
    },
    {
      Header: 'Payment method',
      accessor: 'paymentMethod',
      width: 180,
      isVisible: true,
      Cell: (props: any) => {
        const {
          row: { original },
        } = props;

        const cardLogo = cardTypeToLogoMap[original.cardType] || masterCard;

        return (
          <p className="card-type" title={original.cardType}>
            {original.paymentMethod ? (
              <>
                <img src={cardLogo} alt="paypal" className="mr-1x" />
                <span> •••• </span>
                {original.paymentMethod}
              </>
            ) : (
              ''
            )}
          </p>
        );
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

        const formattedDate = original.date && formatDate(original.date, MONTH_DAY_TIME);

        return <span>{formattedDate}</span>;
      },
    },
  ];

  const formattedTransactionsData = formatTransactions(transactions.data);

  const handleRowClick = async (data: any) => {
    try {
      const transactionData = data.original;

      await props.setTransactionDetails(transactionData);
      props.setTransactionModalStatus(true);
    } catch (error) {
      // Handle error here.
    }
  };

  const handleModalClose = async () => {
    props.setTransactionModalStatus(false);
    await props.setTransactionDetails(null);
  };

  const handleRefundModalClose = () => {
    props.setRefundModalStatus(false);
    props.setTransactionModalStatus(true);
  };

  const handleRefundTransaction = async (data: RefundPayload) => {
    try {
      await props.refundTransaction(data);

      await props.setRefundModalStatus(false);
      await props.setTransactionDetails(null);
    } catch (error) {
      // handle error case here.
    }
  };

  const fetchTicketDetailById = async (ticketId: string) => {
    try {
      await props.fetchTicketById(ticketId);
      await props.setTicketDetails(ticketDetailById);
      await props.setTransactionModalStatus(false);
      await props.setTicketModalStatus(true);
    } catch (error) {
      // [To-do] Handle error
    }
  };

  const handleTicketModalClose = async () => {
    props.setTicketModalStatus(false);
    await props.setTransactionModalStatus(true);
    await props.setTicketDetails(null);
  };

  return (
    <>
      <Table
        onNext={onNext}
        columns={columns}
        onPrevious={onPrevious}
        hasMoreNext={hasMoreNext}
        onRowClick={handleRowClick}
        data={formattedTransactionsData}
        hasMorePrevious={hasMorePrevious}
        isLoading={isFetchingTransactions}
      />
      {transactionDetails && (
        <TransactionDetails
          hide={handleModalClose}
          data={transactionDetails}
          fetchTicketById={fetchTicketDetailById}
          isModalActive={isTransactionModalActive}
          setRefundModalStatus={props.setRefundModalStatus}
          setTransactionModalStatus={props.setTransactionModalStatus}
        />
      )}
      {transactionDetails && isRefundModalActive && (
        <RefundTransaction
          refundError={refundError}
          data={transactionDetails}
          hide={handleRefundModalClose}
          refundTransaction={handleRefundTransaction}
        />
      )}
      {ticketDetailById && isTicketModalActive && (
        <TicketDetails
          data={ticketDetailById}
          hide={handleTicketModalClose}
          isTicketModalActive={isTicketModalActive}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  refundError: state.data.transactions.refunds.error,
  ticketDetailById: state.data.tickets.ticketDetailById,
  isTicketModalActive: state.ui.tickets.isTicketModalActive,
  isRefundModalActive: state.ui.transactions.isRefundModalActive,
});

const mapDispatchToProps = {
  fetchTicketById,
  setTicketDetails,
  refundTransaction,
  setTicketModalStatus,
  setRefundModalStatus,
  setTransactionDetails,
  setTransactionModalStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsTable);
