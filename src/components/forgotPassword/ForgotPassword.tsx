/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { connect } from 'react-redux';
import { FormikProps, withFormik } from 'formik';
import { ErrorSVGIcon } from '@react-md/material-icons';
import { NavLink, RouteComponentProps } from 'react-router-dom';

import routes from 'constants/routes';
import AppState from 'domain/states/AppState';
import Footer from 'components/common/layouts/footer';
import { InputField } from 'components/common/inputField';
import forgotPasswordSchema from 'schemas/ForgotPassword';
import { forgotPassword } from 'actions/auth/forgotPassword';
import { clearAuthError } from 'actions/auth/clearAuthError';
import CopperLogo from 'components/common/layouts/copperLogo';
import { FORGOT_PASSWORD_FORM_NAME } from 'constants/formName';
import { ForgotPasswordFormValues } from 'domain/misc/forgotPassword/ForgotPassword';

interface MappedProps {
  isError: boolean;
  errorMessage: string;
}

interface DispatchedProps {
  clearAuthError: () => void;
  forgotPassword: (email: string) => void;
}

type InjectedProps = MappedProps & DispatchedProps & RouteComponentProps;

type ForgotPasswordProps = InjectedProps & FormikProps<ForgotPasswordFormValues>;

/**
 * Forgot Password compoent
 *
 * @param {ForgotPasswordProps} props
 *
 * @returns {React.ReactElement}
 */
const ForgotPassword: React.FC<ForgotPasswordProps> = (props: ForgotPasswordProps): React.ReactElement => {
  const { values, errors, touched, isValid, isSubmitting, dirty, handleBlur, handleChange, handleSubmit } = props;

  const isSubmitButtonDisabled = !(isValid && dirty) || isSubmitting;

  React.useEffect(() => {
    props.clearAuthError();
  }, [props.clearAuthError]);

  return (
    <div className="wrapper text-center">
      <CopperLogo />
      <div className="container">
        <div className="form-wrapper-center">
          <h1 className="mt-13x">Forgot password</h1>
          <p className="my-5x">Please enter your email address and we will send you a code to reset your password.</p>
          <form className="form" onSubmit={handleSubmit}>
            <InputField
              id="email"
              type="email"
              name="email"
              onBlur={handleBlur}
              value={values.email}
              label="Email address"
              onChange={handleChange}
              placeholder="you@example.com"
              error={errors.email && touched.email ? errors.email : ''}
            />
            {props.isError && (
              <div className="form-group__error mb-6x mt-6x">
                <ErrorSVGIcon className="error-icon" /> {props.errorMessage}
              </div>
            )}
            <button type="submit" className="btn btn--primary btn--block mt-2x" disabled={isSubmitButtonDisabled}>
              Continue
            </button>
          </form>
        </div>
        <div className="mt-10x">
          <NavLink to={routes.SIGNIN} className="link">
            Back to sign in
          </NavLink>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const EnhancedForm = withFormik<InjectedProps, ForgotPasswordFormValues>({
  mapPropsToValues: () => ({ email: '' }),
  handleSubmit: async (values, { props }) => {
    try {
      await props.forgotPassword(values.email);
      props.history.push(routes.FORGOT_PASSWORD_SUBMIT);
    } catch (error) {
      // [TODO]: log error
    }
  },
  validateOnMount: true,
  displayName: FORGOT_PASSWORD_FORM_NAME,
  validationSchema: forgotPasswordSchema,
});

const mapStateToProps = (state: AppState) => ({
  isError: state.ui.auth.isError,
  errorMessage: state.ui.auth.errorMessage,
});

const mapDispatchToprops = {
  forgotPassword,
  clearAuthError,
};

export default connect(mapStateToProps, mapDispatchToprops)(EnhancedForm(ForgotPassword));
