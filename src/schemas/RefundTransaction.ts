import * as Yup from 'yup';

import RefundTransactionFormValues from 'domain/misc/transactions/refund';
import { NO_NEGATIVE_NUMBERS, REFUND_AMOUNT_REQUIRED } from 'constants/error';

/**
 * Validation schema rule for create password form
 */
const RefundTransactionSchema: Yup.ObjectSchema<RefundTransactionFormValues> = Yup.object({
  amount: Yup.number()
    .required(REFUND_AMOUNT_REQUIRED)
    .moreThan(-1, NO_NEGATIVE_NUMBERS)
    .typeError('Refund amount must be a number'),
  reason: Yup.string(),
}).defined();

export default RefundTransactionSchema;
