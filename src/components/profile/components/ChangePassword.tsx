import React from 'react';
import { connect } from 'react-redux';
import { FormikProps, withFormik } from 'formik';
import { ErrorSVGIcon } from '@react-md/material-icons';

import Modal from 'components/common/modal';
import AppState from 'domain/states/AppState';
import changePasswordSchema from 'schemas/Profile';
import { InputField } from 'components/common/inputField';
import { CHANGE_PASSWORD_FORM } from 'constants/formName';
import { changePassword } from 'actions/auth/changePassword';
import { clearAuthError } from 'actions/auth/clearAuthError';
import { ChangePasswordFormValues } from 'domain/misc/profile/Profile';

interface ChangePasswordProps {
  isShown: boolean;
  hide: () => void;
}

interface MappedProps {
  isError: boolean;
  errorMessage: string;
}

interface DispatchedProps {
  clearAuthError: () => void;
  changePassword: (oldPassword: string, newPassword: string) => void;
}

type InjectedProps = MappedProps & DispatchedProps & ChangePasswordProps;

type ChangePasswordComponentProps = InjectedProps & FormikProps<ChangePasswordFormValues>;

/**
 * Change password component
 *
 * @param {ChangePasswordComponentProps} props
 *
 * @returns {React.ReactElement}
 */
const ChangePassword: React.FC<ChangePasswordComponentProps> = (
  props: ChangePasswordComponentProps
): React.ReactElement => {
  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    isShown,
    resetForm,
    handleBlur,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = props;

  const handleHide = () => {
    if (props.hide) props.hide();
    resetForm();
    props.clearAuthError();
  };

  const isSubmitButtonDisabled = !(isValid && dirty) || isSubmitting;

  return (
    <Modal headerText="Change password" isShown={isShown} hide={handleHide}>
      <div className="change-password mt-2x">
        <form onSubmit={handleSubmit}>
          <InputField
            type="password"
            id="oldPassword"
            name="oldPassword"
            onBlur={handleBlur}
            label="Old password"
            onChange={handleChange}
            value={values.oldPassword}
            error={errors.oldPassword && touched.oldPassword ? errors.oldPassword : ''}
          />
          <InputField
            type="password"
            id="newPassword"
            name="newPassword"
            onBlur={handleBlur}
            label="New password"
            onChange={handleChange}
            value={values.newPassword}
            error={errors.newPassword && touched.newPassword ? errors.newPassword : ''}
          />
          <InputField
            type="password"
            onBlur={handleBlur}
            id="repeatPassword"
            name="repeatPassword"
            onChange={handleChange}
            label="Repeat new password"
            value={values.repeatPassword}
            error={errors.repeatPassword && touched.repeatPassword ? errors.repeatPassword : ''}
          />
          {props.isError && (
            <div className="form-group__error mb-6x mt-6x">
              <ErrorSVGIcon className="error-icon" /> {props.errorMessage}
            </div>
          )}
          <button className="btn btn--block btn--primary mt-7x" disabled={isSubmitButtonDisabled}>
            Change password
          </button>
        </form>
      </div>
    </Modal>
  );
};

const EnhancedForm = withFormik<InjectedProps, ChangePasswordFormValues>({
  mapPropsToValues: () => ({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  }),
  handleSubmit: async (values, { props }) => {
    try {
      await props.changePassword(values.oldPassword, values.newPassword);
      if (props.hide) props.hide();
    } catch (error) {
      // [TODO]: log error
    }
  },
  validateOnMount: true,
  displayName: CHANGE_PASSWORD_FORM,
  validationSchema: changePasswordSchema,
});

const mapDispatchToprops = {
  changePassword,
  clearAuthError,
};

const mapStateToProps = (state: AppState) => ({
  isError: state.ui.auth.isError,
  errorMessage: state.ui.auth.errorMessage,
});

export default connect(mapStateToProps, mapDispatchToprops)(EnhancedForm(ChangePassword));
