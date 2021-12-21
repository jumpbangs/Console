// [TODO] This will be removed once login feature is implemented.
/* tslint:disable */
import HttpStatus from 'http-status';
import { AxiosRequestConfig } from 'axios';

import http from 'utils/http';
import * as authService from 'services/auth';
import * as AUTH from 'constants/interceptor';

/**
 * Build authorization header
 *
 * @param {string} idToken
 *
 * @returns {string}
 */
function buildAuthHeader(idToken: string): string {
  return `Bearer ${idToken}`;
}

/**
 * Interceptor to add authentication header for all requests.
 *
 * @param {AxiosRequestConfig} request
 *
 * @returns {AxiosRequestConfig}
 */
export async function requestInterceptor(request: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  const { idToken } = await authService.getAwsTokens();

  request.headers[AUTH.AUTHORIZATION_HEADER] = buildAuthHeader(idToken as string);

  return request;
}

/**
 * Interceptor to refresh access token.
 *
 * @param {any} error
 *
 * @returns {Promise<any>}
 */
export async function responseInterceptor(error: any): Promise<any> {
  if (!error.response) {
    return Promise.reject(error);
  }

  const originalRequest = error.config;

  const { code, message } = error.response.data.error;

  if (code === HttpStatus.UNAUTHORIZED && message === AUTH.TOKEN_EXPIRE && !originalRequest.__isRetryRequest) {
    originalRequest._retry = true;
    originalRequest.retryCount = isNaN(originalRequest.retryCount) ? 1 : originalRequest.retryCount++;

    const tokens = await authService.getAwsTokens();
    const data = await authService.refresh(tokens);

    originalRequest.headers[AUTH.AUTHORIZATION_HEADER] = buildAuthHeader(data.accessToken);

    return http.request(originalRequest);
  }

  if (
    (code === HttpStatus.UNAUTHORIZED && message === AUTH.SESSION_EXPIRE) ||
    message === AUTH.REFRESH_TOKEN_DOESNT_EXIST ||
    originalRequest.retryCount > AUTH.RETRY_COUNT_LIMIT
  ) {
    await authService.logout();
  }

  return Promise.reject(error);
}
