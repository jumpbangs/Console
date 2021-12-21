import jwtDecode from 'jwt-decode';
import DecodedPayload from 'domain/jwt';

/**
 * Validate user token
 *
 * @param {string} token
 *
 * @returns {boolean}
 */
export const validateToken = (token: string): boolean => {
  if (!token) return false;
  try {
    jwtDecode(token);

    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Decode user token
 *
 * @param {string} token
 *
 * @returns {DecodedPayload}
 */
export const decodeToken = (token: string): DecodedPayload => {
  const payload = {
    exp: 0,
    iat: 0,
    name: '',
    email: '',
    account: '',
  };

  if (!token) return payload;

  try {
    const decodedJwt: any = jwtDecode(token);
    const payload = {
      exp: decodedJwt.exp,
      iat: decodedJwt.iat,
      name: decodedJwt.name,
      email: decodedJwt.email,
      account: decodedJwt['custom:account'],
    };

    return payload;
  } catch (e) {
    // [TODO] log error
    return payload;
  }
};
