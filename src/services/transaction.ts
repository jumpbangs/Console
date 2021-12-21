import http from 'utils/http';
import config from 'config/config';
import Status from 'enums/Status';
import { stringify } from 'utils/query';
import RefundPayload from 'domain/request/Refund';
import RefundResponse from 'domain/response/Refund';
import { convertToDecimalPrecision } from 'utils/helper';
import { PaginationOptions } from 'domain/request/Pagination';
import { FormattedTransactionData } from 'domain/misc/transactions/Transactions';
import { CONVERT_TO_DOLLAR, DEFAULT_DECIMAL_PRECISION } from 'constants/appConstants';
import { TransactionResponse, TransactionResponseData } from 'domain/response/Transaction';

type AmountType = number | null;

/**
 * Fetch all transaction data.
 *
 * @returns {Promise<TransactionResponse>}
 */
export async function fetchTransactions(
  endDate: number | null,
  startDate: number | null,
  pagination: PaginationOptions,
  locationId?: string,
  search?: string
): Promise<TransactionResponse> {
  const queryObject = {
    search_query: search,
    location: locationId,
    limit: pagination.limit,
    ending_before: pagination?.ending_before,
    starting_after: pagination?.starting_after,
    created: { gte: startDate, lte: endDate },
  };

  const URI = config.endpoints.transactions.fetchTransactions;

  const URL = URI.concat(stringify(queryObject));

  const { data } = await http.get(URL);

  return normalizeTransactionData(data, pagination.ending_before);
}

/**
 * Refund transaction.
 *
 * @param {RefundPayload} payload
 *
 * @returns {Promise<RefundResponse>}
 */
export const refundTransaction = async (payload: RefundPayload): Promise<RefundResponse> => {
  try {
    const refundURL = `${config.endpoints.transactions.refunds}?`;

    const refundPayload = {
      ...payload,
      amount: getRefundedAmount(payload.amount),
    };

    const { data } = await http.post(refundURL, stringify(refundPayload, { addQueryPrefix: false }));

    return {
      ...data,
      amount: data?.amount / CONVERT_TO_DOLLAR || 0,
    };
  } catch (error) {
    return error;
  }
};

/**
 * Format amount to be match the api payload.
 * And convert dollar to cents.
 *
 * @param {AmountType} amount
 *
 * @returns {AmountType} amount
 */
const getRefundedAmount = (amount: AmountType): AmountType => {
  if (amount === null) {
    return amount;
  }

  return amount * 100;
};

/**
 * Normalize transaction data.
 *
 * @param {TransactionResponse[]} data
 *
 * @returns {TransactionResponse[]}
 */
const normalizeTransactionData = (data: TransactionResponse, pagination?: string): TransactionResponse => {
  const transactionData = !!pagination ? data.data.reverse() : data.data;
  const normalizedData = transactionData.map((transactionData) => {
    const amount = transactionData?.amount / CONVERT_TO_DOLLAR || 0;
    const tipAmount = transactionData?.tip_amount / CONVERT_TO_DOLLAR || 0;
    const refundAmount = transactionData?.refunded_amount / CONVERT_TO_DOLLAR || 0;

    return {
      ...transactionData,
      payment_method: {
        ...transactionData.payment_method,
        card: {
          ...transactionData.payment_method.card,
          brand: transactionData.payment_method.card.brand.toUpperCase() || '',
        },
      },
      refunded_amount: refundAmount,
      currency: transactionData?.currency?.toUpperCase() || '',
      status: getTransactionStatus(transactionData),
      amount: +convertToDecimalPrecision(amount, DEFAULT_DECIMAL_PRECISION), // toFixed returns string convert it back to number using + symbol
      tip_amount: +convertToDecimalPrecision(tipAmount, DEFAULT_DECIMAL_PRECISION),
    };
  });

  return { data: normalizedData, has_more: data.has_more };
};

/**
 * Format transaction data to display it on the tickets table.
 *
 * @param {TransactionResponse[]} transactions
 *
 * @returns {FormattedTransactionData[]}
 */
export const formatTransactions = (transactions: TransactionResponseData[]): FormattedTransactionData[] => {
  return transactions.map((transaction) => {
    return {
      ...transaction,
      id: transaction.id,
      date: transaction.created,
      status: transaction.status,
      ticket: transaction.ticket,
      amount: transaction.amount,
      currency: transaction.currency,
      cardType: transaction?.payment_method?.card?.brand || '',
      paymentMethod: transaction?.payment_method?.card?.last4 || '',
    };
  });
};

/**
 * Format transaction status.
 *
 * @param {TransactionResponseData} transaction
 *
 * @returns {string}
 */
export const getTransactionStatus = (transaction: TransactionResponseData): string => {
  const status = transaction.status;
  const refunded = transaction.refunded;
  const declined = transaction.declined;
  const refundAmount = transaction.refunded_amount;

  if (status === Status.SUCCEEDED && refunded) {
    return Status.REFUNDED;
  }

  if (status === Status.SUCCEEDED && refundAmount > 0) {
    return Status.PARTIAL;
  }

  if (status === Status.FAILED && declined) {
    return Status.DECLINED;
  }

  if (status === Status.SUCCEEDED) {
    return Status.SUCCEEDED;
  }

  return Status.FAILED;
};

/**
 * Get refunded amount.
 *
 * @param {TransactionResponseData} transaction
 */
export const getAmountAfterRefund = (transaction: TransactionResponseData): AmountType => {
  const status = transaction.status.toLocaleLowerCase();

  if (status === Status.REFUNDED) {
    return +transaction.amount;
  }

  if (status === Status.PARTIAL) {
    return +transaction.refunded_amount;
  }

  return null;
};
