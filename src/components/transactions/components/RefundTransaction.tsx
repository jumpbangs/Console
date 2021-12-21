import React from 'react';
import { FormikProps, withFormik } from 'formik';
import { ErrorSVGIcon } from '@react-md/material-icons';

import Modal from 'components/common/modal';
import RefundPayload from 'domain/request/Refund';
import { convertToDecimalPrecision } from 'utils/helper';
import { InputField } from 'components/common/inputField';
import { REFUND_TRANSACTION_FORM } from 'constants/formName';
import RefundTransactionSchema from 'schemas/RefundTransaction';
import { DEFAULT_DECIMAL_PRECISION } from 'constants/appConstants';
import { TransactionResponseData } from 'domain/response/Transaction';
import RefundTransactionFormValues from 'domain/misc/transactions/refund';
import {
  NO_NEGATIVE_NUMBERS,
  REFUND_AMOUNT_REQUIRED,
  REFUND_LESS_THAN_TRANSACTION,
  ONLY_TWO_DECIMAL_PRECISION_ALLOWED,
} from 'constants/error';

interface RefundTransactionProps {
  hide: () => void;
  refundError: string;
  data: TransactionResponseData;
  refundTransaction: (data: RefundPayload) => void;
}

type InjectedProps = RefundTransactionProps;
type RefundTransactionComponentProps = InjectedProps & FormikProps<RefundTransactionFormValues>;

/**
 * Refund transaction component.
 *
 * @returns {React.ReactElement}
 */
const RefundTransaction: React.FC<RefundTransactionComponentProps> = (
  props: RefundTransactionComponentProps
): React.ReactElement => {
  const {
    hide,
    values,
    errors,
    isValid,
    refundError,
    handleSubmit,
    handleChange,
    isSubmitting,
    data: { amount, refunded_amount },
  } = props;

  const remainingRefundAmount = amount - refunded_amount;
  const transactionAmount = amount
    ? `of $${convertToDecimalPrecision(remainingRefundAmount, DEFAULT_DECIMAL_PRECISION)}`
    : '';
  const shouldDisableRefundButton = !isValid || isSubmitting || +values.amount === 0;

  return (
    <Modal headerText="Refund transaction" isShown={true} hide={hide}>
      <p className="mb-7x">Refunds take 5-10 days to appear on a customer's statement.</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="refund-amount">
          <InputField
            id="amount"
            type="number"
            name="amount"
            label="Amount"
            value={values.amount}
            onChange={handleChange}
            error={errors.amount ? errors.amount : ''}
          />
          <span className="refund-amount__limit">{transactionAmount}</span>
        </div>
        <InputField
          type="text"
          id="reason"
          name="reason"
          label="Reason"
          value={values.reason}
          onChange={handleChange}
          placeholder="Add a reason for this refund"
          error={errors.reason ? errors.reason : ''}
        />
        {!!refundError && (
          <div className="form-group__error mb-6x mt-6x">
            <ErrorSVGIcon className="error-icon" /> {refundError}
          </div>
        )}
        <button disabled={shouldDisableRefundButton} className="btn btn--red btn--block mt-6x">
          Refund
        </button>
      </form>
    </Modal>
  );
};

const EnhancedForm = withFormik<InjectedProps, RefundTransactionFormValues>({
  mapPropsToValues: (props) => {
    const {
      data: { amount, refunded_amount },
    } = props;

    const transactionAmount = amount - refunded_amount;

    return {
      amount: +convertToDecimalPrecision(transactionAmount, DEFAULT_DECIMAL_PRECISION),
      reason: '',
    };
  },

  handleSubmit: async (values, { props, setSubmitting }) => {
    try {
      const payload = { ...values, amount: +values.amount, transaction: props.data.id };
      await props.refundTransaction(payload);

      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  },
  validate: (values, props) => {
    const { data } = props;
    const { amount, refunded_amount } = data;
    const checkDecimal = values.amount.toString()?.split('.')[1]?.length || 0;

    if (values.amount.toString() === '') {
      return { amount: REFUND_AMOUNT_REQUIRED };
    }

    if (!Object.is(Math.abs(values.amount), +values.amount)) {
      return { amount: NO_NEGATIVE_NUMBERS };
    }

    if (checkDecimal > 2) {
      return { amount: ONLY_TWO_DECIMAL_PRECISION_ALLOWED };
    }

    const transactionAmount = amount - refunded_amount;

    return +transactionAmount < +values.amount ? { amount: REFUND_LESS_THAN_TRANSACTION } : {};
  },
  validateOnBlur: true,
  validateOnMount: false,
  validateOnChange: true,
  enableReinitialize: true,
  displayName: REFUND_TRANSACTION_FORM,
  validationSchema: RefundTransactionSchema,
});

const RefundTransactionForm = EnhancedForm(RefundTransaction);

export default RefundTransactionForm;
