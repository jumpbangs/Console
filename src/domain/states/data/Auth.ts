/**
 * User interface.
 */
export interface User {
  name: string;
  email: string;
  emailVerified: boolean;
}

/**
 * Auth interface.
 */
interface Auth {
  userInfo: User;
  idToken: string;
  awsUserDump: any;
  accessToken: string;
  refreshToken: string;
}

export default Auth;
