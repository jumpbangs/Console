import React from 'react';
import { connect } from 'react-redux';
import { EditSVGIcon, ErrorSVGIcon } from '@react-md/material-icons';

import useToggle from 'hooks/useToggle';
import { logout } from 'actions/auth/logout';
import AppState from 'domain/states/AppState';
import { User } from 'domain/states/data/Auth';
import ChangePassword from './components/ChangePassword';
import ChangeNameModal from './components/ChangeNameModal';
import ChangeEmailModal from './components/ChangeEmailModal';
import { changeAdminName } from 'actions/auth/changeAdminName';
import EmailValidationModal from './components/EmailValidationModal';
import { changeAdminEmail, submitEmailValidationCode } from 'actions/auth/changeAdminEmail';
import {
  ChangeAdminNameFormValues,
  EmailValidationFormValues,
  ChangeAdminEmailFormValues,
} from 'domain/misc/profile/Profile';

interface MappedProps {
  userInfo: User;
}

interface DispatchedProps {
  logout: () => void;
  changeAdminName: (data: ChangeAdminNameFormValues) => void;
  submitEmailValidationCode: (data: EmailValidationFormValues) => void;
  changeAdminEmail: (data: ChangeAdminEmailFormValues, resendVerification?: boolean) => void;
}

type InjectedProps = MappedProps & DispatchedProps;

/**
 * Profile component.
 *
 * @param {InjectedProps} props
 *
 * @returns {React.ReactElement}
 */
const Profile: React.FC<InjectedProps> = (props: InjectedProps): React.ReactElement => {
  const [showChangePassword, toggleChangePassword] = useToggle();
  const [isValidationModalActive, toggleValidationModalStatus] = useToggle();
  const [isChangeNameModalActive, toggleChangeNameModalStatus] = useToggle();
  const [isChangeEmailModalActive, toggleChangeEmailModalStatus] = useToggle();

  const {
    userInfo: { email, name, emailVerified },
  } = props;

  /**
   * Handle change admin name save button click.
   *
   * @param {ChangeAdminNameFormValues} data
   */
  const handleAdminNameSubmit = async (data: ChangeAdminNameFormValues) => {
    await props.changeAdminName(data);
    toggleChangeNameModalStatus();
  };

  const handleAdminEmailSubmit = async (data: ChangeAdminEmailFormValues, resendVerification?: boolean) => {
    await props.changeAdminEmail(data, resendVerification);
    await toggleValidationModalStatus();
    await toggleChangeEmailModalStatus();
  };

  const handleVerificationCodeSubmit = async (data: EmailValidationFormValues) => {
    await props.submitEmailValidationCode(data);
    await toggleValidationModalStatus();
  };

  return (
    <div className="profile-section">
      <h1 className="title">Profile</h1>
      <div className="d-flex">
        <div className="action-buttons d-sm-flex">
          <button className="btn btn--gray-light px-8x" onClick={toggleChangePassword}>
            Change password
          </button>
        </div>
        <div className="signout-btn ml-auto">
          <button className="btn btn--gray-light color-text-red px-7x" onClick={props.logout}>
            Sign out
          </button>
        </div>
      </div>
      <div className="merchant-info mt-6x">
        <div className="list-card list-card--full-width">
          <div className="list-card__label d-flex">
            Name
            <button className="btn btn--no-border p-0x ml-2x" onClick={toggleChangeNameModalStatus}>
              <EditSVGIcon />
            </button>
          </div>
          {/* [NOTE] Need to add username from reducer */}
          <div className="list-card__text">{name}</div>
        </div>
        <div className="list-card list-card--full-width">
          <div className="list-card__label d-flex">
            Email
            <button className="btn btn--no-border p-0x ml-2x" onClick={toggleChangeEmailModalStatus}>
              <EditSVGIcon />
            </button>
          </div>
          <div className="list-card__text">{email}</div>
          {!emailVerified && (
            <div className="form-group__error small mt-2x">
              <ErrorSVGIcon className="error-icon mr-1x" />
              Email not verified!&nbsp;
              <span className="text-bold text-underlined cursor-pointer" onClick={toggleChangeEmailModalStatus}>
                Please verify.
              </span>
            </div>
          )}
        </div>
      </div>
      {showChangePassword && <ChangePassword isShown={showChangePassword} hide={toggleChangePassword} />}
      {isChangeNameModalActive && (
        <ChangeNameModal
          adminName={name}
          hide={toggleChangeNameModalStatus}
          submitForm={handleAdminNameSubmit}
          isModalActive={isChangeNameModalActive}
        />
      )}
      {isChangeEmailModalActive && (
        <ChangeEmailModal
          adminEmail={email}
          emailVerified={emailVerified}
          hide={toggleChangeEmailModalStatus}
          submitForm={handleAdminEmailSubmit}
          isModalActive={isChangeEmailModalActive}
        />
      )}
      {isValidationModalActive && (
        <EmailValidationModal
          hide={toggleValidationModalStatus}
          isModalActive={isValidationModalActive}
          submitForm={handleVerificationCodeSubmit}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  userInfo: state.data.auth.userInfo,
});

const mapDispatchToProps = {
  logout,
  changeAdminName,
  changeAdminEmail,
  submitEmailValidationCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
