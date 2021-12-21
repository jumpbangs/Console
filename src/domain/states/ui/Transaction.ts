/**
 * Tickets interface.
 */
interface TransactionState {
  isRefundModalActive: boolean;
  isFetchingTransactions: boolean;
  isTransactionModalActive: boolean;
}

export default TransactionState;
