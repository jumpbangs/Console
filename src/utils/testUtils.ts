import * as faker from 'faker';

import AddressPayload from 'domain/request/Location';
import LocationResponse from 'domain/response/Location';
import { TicketData, TicketResponseData } from 'domain/response/Tickets';
import { DeviceResponseData, DevicesResponseData } from 'domain/response/Devices';
import { TransactionResponse, TransactionResponseData } from 'domain/response/Transaction';

/**
 * Generate random number between given range.
 *
 * @param {min} number
 * @param {max} number
 *
 * @returns {number}
 */
export const getRandomNumber = (min: number = 1, max: number = 100): number => {
  return faker.random.number({ min, max });
};

/**
 * Generate random boolean value.
 *
 * @returns {boolean}
 */
export const getRandomBool = (): boolean => {
  return faker.random.boolean();
};

/**
 * Generate random date string.
 *
 * @returns {string}
 */
export const getRandomDateString = (): string => {
  return JSON.stringify(faker.date.recent());
};

/**
 * Generate random date.
 *
 * @returns {Date}
 */
export const getRandomDate = (): Date => {
  return faker.date.recent();
};

/**
 * Generate random string of given length.
 *
 * @param {length} number
 *
 * @returns {string}
 */
export const getRandomString = (length: number = 10): string => {
  return faker.random.alphaNumeric(length);
};

/**
 * Generate random transaction data.
 */
export const getTransactionDetails = (): TransactionResponse => {
  const response = [getTransactionDetail(), getTransactionDetail(), getTransactionDetail(), getTransactionDetail()];

  return {
    data: response,
    has_more: getRandomBool(),
  };
};

/**
 * Get dummy transaction data.
 *
 * @returns {TransactionResponse}
 */
export const getTransactionDetail = (): TransactionResponseData => {
  return {
    id: getRandomString(),
    created: getRandomDate(),
    status: getRandomString(),
    object: getRandomString(),
    ticket: getRandomString(),
    amount: getRandomNumber(),
    declined: getRandomBool(),
    refunded: getRandomBool(),
    currency: getRandomString(),
    tip_amount: getRandomNumber(),
    customer: {
      name: getRandomString(),
    },
    receipt_url: getRandomString(),
    approval_code: getRandomString(),
    refunded_amount: getRandomNumber(),
    metadata: {},
    payment_method: {
      card: {
        brand: getRandomString(),
        last4: getRandomString(),
      },
      type: getRandomString(),
      entry_mode: getRandomString(),
    },
  };
};

/**
 * Get dummy ticket details.
 *
 * @returns {TicketData[]}
 */
export const getTicketDetails = (): TicketResponseData => {
  const response = [getTicketDetail(), getTicketDetail(), getTicketDetail(), getTicketDetail()];

  return {
    data: response,
    has_more: getRandomBool(),
  };
};

/**
 * Get dummy ticket detail.
 *
 * @returns {TicketData}
 */
export const getTicketDetail = (): TicketData => {
  return {
    id: getRandomString(),
    dob: getRandomDate(),
    name: getRandomString(),
    time: getRandomString(),
    items: [
      {
        label: getRandomString(),
        amount: getRandomNumber(),
        quantity: getRandomNumber(),
      },
    ],
    total: getRandomNumber(),
    guests: getRandomNumber(),
    object: getRandomString(),
    server: getRandomString(),
    payments: [],
    discounts: [],
    currency: getRandomString(),
    location: getRandomString(),
    subtotal: getRandomNumber(),
    reference: getRandomString(),
    surcharges: {
      label: getRandomString(),
      amount: getRandomNumber(),
    },
    metadata: {},
    checkout_url: getRandomString(),
  };
};

/**
 * Get dummy device details.
 *
 * @returns {DeviceResponse[]}
 */
export const getDeviceDetails = (): DevicesResponseData => {
  const deviceResponse = [getDeviceDetail(), getDeviceDetail(), getDeviceDetail(), getDeviceDetail()];

  return {
    data: deviceResponse,
    has_more: getRandomBool(),
  };
};

/**
 * Get dummy device detail.
 *
 * @returns {DeviceResponse}
 */
export const getDeviceDetail = (): DeviceResponseData => {
  return {
    metadata: {},
    id: getRandomString(),
    location: getLocation(),
    enabled: getRandomBool(),
    label: getRandomString(),
    status: getRandomString(),
    object: getRandomString(),
    last_seen: getRandomString(),
    ip_address: getRandomString(),
    device_type: getRandomString(),
    serial_number: getRandomString(),
    device_sw_version: getRandomString(),
  };
};

/**
 * Get dummy Location.
 *
 * @returns {LocationResponse}
 */
export const getLocation = (): LocationResponse => {
  return {
    metadata: {},
    id: getRandomString(),
    address: getAddress(),
    phone: getRandomString(),
    object: getRandomString(),
    website: getRandomString(),
    display_name: getRandomString(),
  };
};

/**
 * Get dummy Address.
 *
 * @returns {AddressPayload}
 */
export const getAddress = (): AddressPayload => {
  return {
    city: getRandomString(),
    state: getRandomString(),
    line2: getRandomString(),
    line1: getRandomString(),
    country: getRandomString(),
    postal_code: getRandomString(),
  };
};
