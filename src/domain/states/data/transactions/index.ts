import { Refunds } from './Refund';
import { Transactions } from './Transactions';
import { TransactionDetails } from './TransactionDetails';
import { TransactionPagination } from './TransactionPagination';

interface TransactionState {
  readonly refunds: Refunds;
  readonly transactions: Transactions;
  readonly transactionDetails: TransactionDetails;
  readonly transactionPagination: TransactionPagination;
}

export default TransactionState;
