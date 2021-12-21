import { RefundActions } from './refund';
import { FetchTransactionsActions } from './fetchTransactions';
import { SetTransactionDetailsAction } from './setTransactionDetails';
import { SetTransactionPaginationActions } from './transactionPagination';
import { TransactionActions as TransactionDefaultActions } from './transactions';

type TransactionActions =
  | RefundActions
  | FetchTransactionsActions
  | TransactionDefaultActions
  | SetTransactionDetailsAction
  | SetTransactionPaginationActions;

export default TransactionActions;
