import CardTypes from 'enums/CardTypes';
import PaymentMethods from 'enums/PaymentMethods';

/**
 * Maps payment method to its specific color.
 */
export const paymentMethodToColorMap = {
  [PaymentMethods.EMV]: '#E56F4A',
  [PaymentMethods.KEYED]: '#ED5F74',
  [PaymentMethods.PAYPAL]: '#0070BA',
  [PaymentMethods.SWIPED]: '#9C82DB',
  [PaymentMethods.OTHERS]: '#1CA672',
  [PaymentMethods.APPLE_PAY]: '#000000',
  [PaymentMethods.GOOGLE_PAY]: '#F4B400',
};

/**
 * Maps card types to its specific colors.
 */
export const cardTypeToColorMap = {
  [CardTypes.AMEX]: '#007ECD',
  [CardTypes.VISA]: '#678EF1',
  [CardTypes.DISCOVER]: '#FFA200',
  [CardTypes.MASTER_CARD]: '#353A48',
};
