import { cardTypeToColorMap, paymentMethodToColorMap } from 'maps/colorMaps';

/**
 * Dummy data for sales chart
 */
export const salesData = [
  {
    id: 'Total sales',
    color: '#586ADA',
    data: [
      { x: 0, y: 40 },
      { x: 1, y: 90 },
      { x: 2, y: 95 },
      { x: 3, y: 95 },
      { x: 4, y: 130 },
      { x: 5, y: 180 },
      { x: 6, y: 30 },
      { x: 7, y: 130 },
      { x: 8, y: 230 },
      { x: 9, y: 300 },
      { x: 10, y: 80 },
      { x: 11, y: 55 },
      { x: 12, y: 28 },
      { x: 13, y: 188 },
      { x: 14, y: 257 },
      { x: 15, y: 55 },
      { x: 16, y: 500 },
      { x: 17, y: 450 },
      { x: 18, y: 10 },
      { x: 19, y: 77 },
      { x: 20, y: 58 },
    ],
  },
];

/**
 * Dummy data for Payment Methods
 */
export const paymentMethodsData = [
  {
    id: 'emv',
    label: 'EMV',
    value: 100,
    color: paymentMethodToColorMap.emv,
  },
  {
    id: 'swiped',
    label: 'Swiped',
    value: 100,
    color: paymentMethodToColorMap.swiped,
  },
  {
    id: 'applePay',
    label: 'Apple Pay',
    value: 64,
    color: paymentMethodToColorMap.applePay,
  },
  {
    id: 'googlePay',
    label: 'Google Pay',
    value: 40,
    color: paymentMethodToColorMap.googlePay,
  },
  {
    id: 'payPal',
    label: 'PayPal',
    value: 30,
    color: paymentMethodToColorMap.paypal,
  },
  {
    id: 'keyed',
    label: 'Keyed',
    value: 10,
    color: paymentMethodToColorMap.keyed,
  },
  {
    id: 'others',
    label: 'Others',
    value: 20,
    color: paymentMethodToColorMap.others,
  },
];

/**
 * Dummy data for Card types
 */
export const cardTypesData = [
  {
    id: 'visa',
    label: 'VISA',
    value: 100,
    color: cardTypeToColorMap.VISA,
  },
  {
    id: 'masterCard',
    label: 'Master Card',
    value: 100,
    color: cardTypeToColorMap.MASTERCARD,
  },
  {
    id: 'amex',
    label: 'AmEx',
    value: 64,
    color: cardTypeToColorMap.AMEX,
  },
  {
    id: 'discover',
    label: 'Discover',
    value: 40,
    color: cardTypeToColorMap.DISCOVER,
  },
  {
    id: 'others',
    label: 'Others',
    value: 30,
    color: '#DFE7F9',
  },
];
