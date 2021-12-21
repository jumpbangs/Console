import http from 'utils/http';
import config from 'config/config';
import { stringify } from 'utils/query';
import { AccountResponse } from 'domain/response/Account';
import { AccountDetailParams } from 'domain/request/Account';
import { AccountsFormValues } from 'domain/misc/accounts/Accounts';

/**
 * Fetch account.
 *
 * @param {string} accountId
 *
 * @returns {Promise<AccountResponse>}
 */
export async function fetchAccountById(accountId: string): Promise<AccountResponse> {
  const url = config.endpoints.accounts.fetchAccount.replace(':accountId', accountId);

  const { data } = await http.get(url);

  return data;
}

/**
 * Updates account by Id.
 *
 * @param {string} accountId
 * @param {AccountDetailParams} payload
 *
 * @returns {Promise<AccountResponse>}
 */
export const updateAccount = async (accountId: string, payload: AccountDetailParams): Promise<AccountResponse> => {
  const url = config.endpoints.accounts.updateAccount.replace(':accountId', accountId);
  const { data } = await http.post(url, stringify(payload, { addQueryPrefix: false, skipNulls: false }));

  return data;
};

/**
 * Returns initial edit form values.
 *
 * @param {AccountResponse} account
 *
 * @returns {AccountsFormValues}
 */
export const getInitialEditFormValues = (account: AccountResponse): AccountsFormValues => ({
  phone: account?.phone || '',
  website: account?.website || '',
  merchantName: account?.name || '',
  city: account?.address?.city || '',
  state: account?.address?.state || '',
  address2: account?.address?.line2 || '',
  address1: account?.address?.line1 || '',
  zip: account?.address?.postal_code || '',
  countryName: account?.address?.country || '',
});
