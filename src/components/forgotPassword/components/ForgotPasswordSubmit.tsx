import React from 'react';
import { connect } from 'react-redux';
import { FormikProps, withFormik } from 'formik';

import routes from 'constants/routes';
import AppState from 'domain/states/AppState';
import PasswordChanged from './PasswordChanged';
import Footer from 'components/common/layouts/footer';
import { RouteComponentProps } from 'react-router-dom';
import { ErrorSVGIcon } from '@react-md/material-icons';
import { InputField } from 'components/common/inputField';
import CopperLogo from 'components/common/layouts/copperLogo';
import forgotPasswordSubmitSchema from 'schemas/ForgotPasswordSubmit';
import { FORGOT_PASSWORD_SUBMIT_FORM_NAME } from 'constants/formName';
import { forgotPasswordSubmit } from 'actions/auth/forgotPasswordSubmit';
import { ForgotPasswordSubmitFormValues } from 'domain/misc/forgotPassword/ForgotPasswordSubmit';

interface MappedProps {
  email: string;
  isError: boolean;
  errorMessage: string;
  passwordChanged: boolean;
}

interface DispatchedProps {
  forgotPasswordSubmit: (email: string, code: string, newPassword: string) => void;
}

type InjectedProps = MappedProps & DispatchedProps & RouteComponentProps;

type ForgotPasswordSubmitProps = InjectedProps & FormikProps<ForgotPasswordSubmitFormValues>;

/**
 * Forgot Password Submit component.
 *
 * @param {ForgotPasswordSubmitProps} props
 *
 * @returns {React.ReactElement}
 */
const ForgotPasswordSubmit: React.FC<ForgotPasswordSubmitProps> = (
  props: ForgotPasswordSubmitProps
): React.ReactElement => {
  const { values, errors, touched, isValid, isSubmitting, dirty, handleBlur, handleChange, handleSubmit } = props;

  const isSubmitButtonDisabled = !(isValid && dirty) || isSubmitting;

  const handleOnDone = () => {
    props.history.push(routes.SIGNIN);
  };

  return (
    <>
      <div className="wrapper text-center">
        <CopperLogo />
        <div className="container">
          <div className="form-wrapper-center">
            <h1 className="mt-13x">Create new password</h1>
            <p className="my-5x">Please enter the code you received in your email and then create a new password.</p>
            <form className="form" onSubmit={handleSubmit}>
              <InputField
                id="code"
                name="code"
                type="text"
                onBlur={handleBlur}
                value={values.code}
                onChange={handleChange}
                label="Code you received in email"
                error={errors.code && touched.code ? errors.code : ''}
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
                label="Repeat password"
                value={values.repeatPassword}
                error={errors.repeatPassword && touched.repeatPassword ? errors.repeatPassword : ''}
              />
              {props.isError && (
                <div className="form-group__error mb-6x mt-6x">
                  <ErrorSVGIcon className="error-icon" /> {props.errorMessage}
                </div>
              )}
              <button type="submit" className="btn btn--primary btn--block mt-2x" disabled={isSubmitButtonDisabled}>
                Change password
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
      <PasswordChanged isShown={props.passwordChanged} onDone={handleOnDone} />
    </>
  );
};

const EnhancedForm = withFormik<InjectedProps, ForgotPasswordSubmitFormValues>({
  mapPropsToValues: () => ({ code: '', newPassword: '', repeatPassword: '' }),
  handleSubmit: async (values, { props }) => {
    try {
      await props.forgotPasswordSubmit(props.email, values.code, values.newPassword);
    } catch (error) {
      // [TODO]: log error
    }
  },
  validateOnMount: true,
  displayName: FORGOT_PASSWORD_SUBMIT_FORM_NAME,
  validationSchema: forgotPasswordSubmitSchema,
});

const mapDispatchToprops = {
  forgotPasswordSubmit,
};

const mapStateToProps = (state: AppState) => ({
  isError: state.ui.auth.isError,
  email: state.data.auth.userInfo.email,
  errorMessage: state.ui.auth.errorMessage,
  passwordChanged: state.ui.auth.passwordChanged,
});

export default connect(mapStateToProps, mapDispatchToprops)(EnhancedForm(ForgotPasswordSubmit));
