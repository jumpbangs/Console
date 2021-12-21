/**
 * AuthResponse interface
 */
export interface AuthResponse {
  userInfo: {
    name: string;
    email: string;
    emailVerified: boolean;
  };
  idToken: string;
  awsUserDump: any;
  accessToken: string;
  refreshToken: string;
  newPasswordRequired: boolean;
}

export interface UpdateEmailResponse {
  email: string;
  emailVerified: boolean;
}

export interface UpdateEmailConfirmResponse {
  emailVerified: boolean;
}
