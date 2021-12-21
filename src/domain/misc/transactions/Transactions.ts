import { TransactionResponseData } from 'domain/response/Transaction';

/**
 * Formatted data to display on transaction table.
 */
export interface FormattedTransactionData {
  id: string;
  date: Date;
  amount: number;
  status: string;
  ticket: string;
  paymentMethod: string;
}

export type TransactionDetailsPayload = TransactionResponseData | null;
