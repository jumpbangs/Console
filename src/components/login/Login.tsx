import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { FormikProps, withFormik } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
import { ErrorSVGIcon } from '@react-md/material-icons';

import routes from 'constants/routes';
import loginSchema from 'schemas/Login';
import { login } from 'actions/auth/login';
import AppState from 'domain/states/AppState';
import { LOGIN_FORM_NAME } from 'constants/formName';
import Footer from 'components/common/layouts/footer';
import { InputField } from 'components/common/inputField';
import { LoginFormValues } from 'domain/misc/login/Login';
import CopperLogo from 'components/common/layouts/copperLogo';

interface MappedProps {
  isError: boolean;
  newPasswordRequired: boolean;
}

interface DispatchedProps {
  login: (email: string, password: string) => void;
}

type InjectedProps = MappedProps & DispatchedProps & RouteComponentProps;
type LoginComponentProps = InjectedProps & FormikProps<LoginFormValues>;

/**
 * Login Component.
 *
 * @param {LoginComponentProps} props
 *
 * @returns {React.ReactElement}
 */
const Login: React.FC<LoginComponentProps> = (props: LoginComponentProps): React.ReactElement => {
  const { values, errors, touched, isValid, isSubmitting, dirty, handleBlur, handleChange, handleSubmit } = props;

  const isSubmitButtonDisabled = !(isValid && dirty) || isSubmitting;

  useEffect(() => {
    if (props.newPasswordRequired) {
      props.history.push(routes.CREATE_PASSWORD);
    }
  }, [props.history, props.newPasswordRequired]);

  return (
    <div className="wrapper text-center">
      <CopperLogo />
      <div className="container">
        <div className="form-wrapper-center">
          <h1 className="mt-22x mb-6x">Sign in to your account</h1>
          <form className="form form--login" onSubmit={handleSubmit}>
            <InputField
              id="email"
              type="text"
              name="email"
              label="Email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              error={errors.email && touched.email ? errors.email : ''}
            />
            <InputField
              id="password"
              forgotPassword
              type="password"
              name="password"
              label="Password"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              error={errors.password && touched.password ? errors.password : ''}
            />
            {props.isError && (
              <div className="form-group__error mb-6x mt-6x">
                <ErrorSVGIcon className="error-icon" /> Incorrect email or password
              </div>
            )}
            <button type="submit" className="btn btn--primary btn--block mt-2x" disabled={isSubmitButtonDisabled}>
              Continue
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const EnhancedForm = withFormik<InjectedProps, LoginFormValues>({
  mapPropsToValues: () => ({ email: '', password: '' }),
  handleSubmit: async (values, { props }) => {
    const { email, password } = values;

    try {
      await props.login(email, password);
      const { from } = (props.location.state as any) || { from: { pathname: '/' } };
      props.history.push(from);
    } catch (error) {
      // [TODO]: log error
    }
  },
  validateOnMount: true,
  displayName: LOGIN_FORM_NAME,
  validationSchema: loginSchema,
});

const mapDispatchToprops = {
  login,
};

const mapStateToProps = (state: AppState) => ({
  isError: state.ui.auth.isError,
  newPasswordRequired: state.ui.auth.newPasswordRequired,
});

export default connect(mapStateToProps, mapDispatchToprops)(EnhancedForm(Login));
