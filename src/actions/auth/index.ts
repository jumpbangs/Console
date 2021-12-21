import { LoginActions } from './login';
import { LogoutActions } from './logout';
import { ClearAuthError } from './clearAuthError';
import { RefreshAWSTokens } from './refreshTokens';
import { ChangeEmailActions } from './changeAdminEmail';
import { CreatePasswordActions } from './createPassword';
import { ForgotPasswordActions } from './forgotPassword';
import { ChangePasswordActions } from './changePassword';
import { ChangeAdminNameActions } from './changeAdminName';
import { ForgotPasswordSubmitActions } from './forgotPasswordSubmit';

type AuthActions =
  | LoginActions
  | LogoutActions
  | ClearAuthError
  | RefreshAWSTokens
  | ChangeEmailActions
  | CreatePasswordActions
  | ForgotPasswordActions
  | ChangePasswordActions
  | ChangeAdminNameActions
  | ForgotPasswordSubmitActions;

export default AuthActions;
