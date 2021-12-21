import React from 'react';
import { LinkSVGIcon, LaunchSVGIcon } from '@react-md/material-icons';

import Status from 'enums/Status';
import { masterCard } from 'assets/images';
import Modal from 'components/common/modal';
import { formatDate } from 'utils/dateTime';
import { MONTH_DAY_TIME } from 'constants/date';
import { cardTypeToLogoMap } from 'maps/cardTypeToLogo';
import { convertToDecimalPrecision } from 'utils/helper';
import { getAmountAfterRefund } from 'services/transaction';
import { currencyStringToSymbolMap } from 'maps/currencyToSymbol';
import { DEFAULT_DECIMAL_PRECISION } from 'constants/appConstants';
import { statusToIndicatorColorMap } from 'maps/statusToIndicator';
import { TransactionResponseData } from 'domain/response/Transaction';

interface TransactionDetailsProps {
  hide: () => void;
  isModalActive: boolean;
  data: TransactionResponseData;
  fetchTicketById: (arg: string) => void;
  setRefundModalStatus: (arg: boolean) => void;
  setTransactionModalStatus: (arg: boolean) => void;
}

/**
 * Transaction details component.
 *
 * @param {TransactionDetailsProps} props
 *
 * @returns {React.ReactElement}
 */
const TransactionDetails: React.FC<TransactionDetailsProps> = (props: TransactionDetailsProps): React.ReactElement => {
  const { isModalActive, hide, data, fetchTicketById } = props;

  const { ticket, status, amount, payment_method, created, currency, approval_code, tip_amount, receipt_url } = data;
  const {
    card: { brand, last4 },
  } = payment_method;
  const cardLogo = cardTypeToLogoMap[brand] || masterCard;
  const tipAmount =
    tip_amount > 0 ? `incl. $${convertToDecimalPrecision(tip_amount, DEFAULT_DECIMAL_PRECISION)} tip` : '';
  const transactionStatusClass = `status-indicator status-indicator--${statusToIndicatorColorMap[status]}-text mb-5x`;

  const currencySymbol = currencyStringToSymbolMap[currency] || '';
  const transactionAmount = `${currencySymbol}${convertToDecimalPrecision(amount, DEFAULT_DECIMAL_PRECISION)}`;

  const transactionStatus = status.toLocaleLowerCase();
  const shouldShowRefundButton = transactionStatus === Status.SUCCEEDED || transactionStatus === Status.PARTIAL;

  const refundedAmount = getAmountAfterRefund(data);
  const refundedAmountDecimal = refundedAmount
    ? convertToDecimalPrecision(refundedAmount, DEFAULT_DECIMAL_PRECISION)
    : null;

  const handleRefundButtonClick = () => {
    props.setTransactionModalStatus(false);
    props.setRefundModalStatus(true);
  };

  return (
    <Modal headerText="Transaction details" isShown={isModalActive} hide={hide}>
      <p className="text-bold mb-5x"> {ticket}</p>
      <div className="transaction-details">
        <div className={transactionStatusClass}>
          <div className="status-indicator__bulb" />
          <span className="status-indicator__label text-bold text-capitalized">{status}</span>
        </div>
        <div className="row">
          <div className="col col-6">
            <div className="list-card">
              <p className="list-card__label">Date</p>
              <div className="list-card__text">{formatDate(created, MONTH_DAY_TIME)}</div>
            </div>
          </div>
          <div className="col col-6">
            <div className="list-card">
              <p className="list-card__label">Payment method</p>
              <div className="list-card__text card-type" title={brand}>
                <img src={cardLogo} alt="masterCard" className="mr-1x" />
                <span> •••• </span>
                {last4}
              </div>
            </div>
          </div>
          {approval_code && (
            <div className="col col-6">
              <div className="list-card">
                <p className="list-card__label">Approval code</p>
                <div className="list-card__text">{approval_code}</div>
              </div>
            </div>
          )}
          {receipt_url && (
            <div className="col col-6">
              <div className="list-card">
                <div className="list-card__text">
                  <a target="_blank" href={receipt_url} rel="noopener noreferrer" className="text-bold link">
                    View receipt
                    <LaunchSVGIcon className="ml-2x" style={{ fill: '#CFD7DF' }} />
                  </a>
                </div>
              </div>
            </div>
          )}
          <div className="col col-12">
            <div className="list-card list-card--full-width">
              <p className="list-card__label">Ticket</p>
              <div className="list-card__text">
                <span className="link" onClick={() => fetchTicketById(ticket)}>
                  {ticket}
                  <LinkSVGIcon className="ml-2x" style={{ fill: '#CFD7DF' }} />
                </span>
              </div>
            </div>
          </div>
          <div className="col col-6">
            <div className="list-card list-card--full-width">
              <p className="list-card__label">Amount</p>
              <div className="list-card__text">
                <p className="sub-title">
                  {transactionAmount} <span className="small text-normal">{tipAmount}</span>
                </p>
              </div>
            </div>
          </div>
          {refundedAmountDecimal && (
            <div className="col col-6">
              <div className="list-card">
                <p className="list-card__label">Refunded</p>
                <div className="list-card__text">
                  <p className="sub-title text-bold">${refundedAmountDecimal}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {shouldShowRefundButton && (
          <button className="btn btn--block btn--red" onClick={handleRefundButtonClick}>
            Refund
          </button>
        )}
      </div>
    </Modal>
  );
};

export default TransactionDetails;
