import { Auth as AwsAuth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';

import { INCORRECT_OLD_PASSWORD } from 'constants/error';
import { refreshAWSTokens } from 'actions/auth/refreshTokens';
import { NEW_PASSWORD_REQUIRED, PASSWORD } from 'constants/auth';
import { AuthResponse, UpdateEmailConfirmResponse, UpdateEmailResponse } from 'domain/response/Auth';
import {
  ChangeAdminNameFormValues,
  EmailValidationFormValues,
  ChangeAdminEmailFormValues,
} from 'domain/misc/profile/Profile';

/**
 * Refresh access token.
 *
 * @param {String} refreshToken
 *
 * @returns {Promise<object>}
 */
export async function refresh(tokens: any): Promise<any> {
  // tslint:disable-next-line: no-require-imports
  const store = require('store/configure');

  store.dispatch(refreshAWSTokens(tokens));

  return tokens;
}

/**
 * Get Aws tokens from current session.
 *
 * @returns {Object}
 */
export const getAwsTokens = async (): Promise<any> => {
  try {
    const session = await AwsAuth.currentSession();

    return {
      idToken: session.getIdToken().getJwtToken(),
      refreshToken: session.getRefreshToken().getToken(),
      accessToken: session.getAccessToken().getJwtToken(),
    };
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Login user service.
 *
 * @param {String} email
 * @param {String} password
 *
 * @returns {Promise<AuthResponse>}
 */
export const loginUser = (email: string, password: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    AwsAuth.signIn(email, password)
      .then((value) => {
        /*
         * optional chaining is required in case of NEW_PASSWORD_REQUIRED
         * signInUserSession is null when NEW_PASSWORD_REQUIRED
         */
        const payload = {
          userInfo: {
            name: value?.attributes?.name || '',
            email: value?.attributes?.email || '',
            emailVerified: !!value?.attributes?.email_verified && true,
          },
          awsUserDump: {},
          newPasswordRequired: false,
          idToken: value?.signInUserSession?.idToken?.jwtToken || '',
          refreshToken: value?.signInUserSession?.refreshToken?.token || '',
          accessToken: value?.signInUserSession?.accessToken?.jwtToken || '',
        };

        if (value.challengeName === NEW_PASSWORD_REQUIRED) {
          payload.awsUserDump = value;
          payload.newPasswordRequired = true;
          payload.userInfo = {
            emailVerified: true,
            name: value?.challengeParam?.userAttributes?.name || '',
            email: value?.challengeParam?.userAttributes?.email || '',
          };
        }

        resolve(payload);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Create Password service.
 *
 * @param {CognitoUser} user
 * @param {String} password
 *
 * @returns {Promise<AuthResponse>}
 */
export const createPassword = (user: CognitoUser, password: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    AwsAuth.completeNewPassword(user, password)
      .then((value) => {
        const payload = {
          userInfo: {
            emailVerified: true,
            name: value?.challengeParam?.userAttributes?.name || '',
            email: value?.challengeParam?.userAttributes?.email || '',
          },
          awsUserDump: {},
          newPasswordRequired: false,
          idToken: value.signInUserSession.idToken.jwtToken,
          refreshToken: value.signInUserSession.refreshToken.token,
          accessToken: value.signInUserSession.accessToken.jwtToken,
        };
        resolve(payload);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Logout service.
 */
export const logout = async () => {
  // tslint:disable-next-line: no-require-imports
  const store = require('store/configure');
  await AwsAuth.signOut();
  await store.persistor.purge();
};

/**
 * Forgot Password service.
 *
 * @param {string} email
 * @param {String} password
 *
 * @returns {Promise<string>}
 */
export const forgotPassword = (email: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    AwsAuth.forgotPassword(email)
      .then(() => {
        resolve(email);
      })
      .catch((err) => reject(err));
  });
};

/**
 * Forgot Password Submit service.
 *
 * @param {string} email
 * @param {string} code
 * @param {string} newPassword
 *
 * @returns {Promise<any>}
 */
export const forgotPasswordSubmit = (email: string, code: string, newPassword: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    AwsAuth.forgotPasswordSubmit(email, code, newPassword)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};

/**
 * Change Password service.
 *
 * @param {string} oldPassword
 * @param {string} newPassword
 *
 * @returns {Promise<string>}
 */
export const changePassword = async (oldPassword: string, newPassword: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    AwsAuth.currentAuthenticatedUser()
      .then((user) => {
        return AwsAuth.changePassword(user, oldPassword, newPassword);
      })
      .then((data) => resolve(data))
      .catch((err) => {
        if (err.message.toLowerCase().includes(PASSWORD)) err.message = INCORRECT_OLD_PASSWORD;
        reject(err);
      });
  });
};

/**
 * Change admin user name.
 *
 * @param {ChangeAdminNameFormValues} payload
 *
 * @returns {Promise<string>}
 */
export const changeAdminName = async (payload: ChangeAdminNameFormValues): Promise<string> => {
  const user = await AwsAuth.currentAuthenticatedUser();
  await AwsAuth.updateUserAttributes(user, { name: payload.name });

  return payload.name;
};

/**
 * Change admin email.
 *
 * @param {ChangeAdminEmailFormValues} payload
 * @param {boolean} resendVerification
 *
 * @returns {Promise<UpdateEmailResponse>}
 */
export const changeAdminEmail = async (
  payload: ChangeAdminEmailFormValues,
  resendVerification = false
): Promise<UpdateEmailResponse> => {
  const user = await AwsAuth.currentAuthenticatedUser();

  if (resendVerification) {
    await AwsAuth.verifyCurrentUserAttribute('email');
  } else {
    await AwsAuth.updateUserAttributes(user, { email: payload.email });
  }

  return {
    email: payload.email,
    emailVerified: false,
  };
};

/**
 * Validate email code.
 *
 * @param {EmailValidationFormValues} payload
 *
 * @returns {Promise<UpdateEmailConfirmResponse>}
 */
export const submitEmailValidationCode = async (
  payload: EmailValidationFormValues
): Promise<UpdateEmailConfirmResponse> => {
  await AwsAuth.verifyCurrentUserAttributeSubmit('email', payload.code);

  return {
    emailVerified: true,
  };
};
