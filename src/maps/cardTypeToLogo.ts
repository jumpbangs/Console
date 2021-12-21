import CardTypes from 'enums/CardTypes';
import { amex, diners, maestro, jcb, masterCard, visa, discover, paypal } from 'assets/images';

/**
 * Maps card to its specific logo.
 */
export const cardTypeToLogoMap = {
  [CardTypes.JCB]: jcb,
  [CardTypes.AMEX]: amex,
  [CardTypes.VISA]: visa,
  [CardTypes.DINERS]: diners,
  [CardTypes.PAYPAL]: paypal,
  [CardTypes.MAESTRO]: maestro,
  [CardTypes.DISCOVER]: discover,
  [CardTypes.MASTER_CARD]: masterCard,
};
