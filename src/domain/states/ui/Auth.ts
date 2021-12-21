/**
 * Auth interface.
 */
interface Auth {
  isError: boolean;
  errorMessage: string;
  passwordChanged: boolean;
  newPasswordRequired: boolean;
}

export default Auth;
