import React from 'react';
import { connect } from 'react-redux';
import { FormikProps, withFormik } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
import { ErrorSVGIcon } from '@react-md/material-icons';

import AppState from 'domain/states/AppState';
import { censorEmail } from 'utils/censor-email';
import Footer from 'components/common/layouts/footer';
import { InputField } from 'components/common/inputField';
import createPasswordSchema from 'schemas/CreatePassword';
import { createPassword } from 'actions/auth/createPassword';
import CopperLogo from 'components/common/layouts/copperLogo';
import { CREATE_PASSWORD_FORM_NAME } from 'constants/formName';
import { CreatePasswordFormValues } from 'domain/misc/create-password/CreatePassword';

interface MappedProps {
  email: string;
  isError: boolean;
  awsUserDump: any;
  errorMessage: string;
}

interface DispatchedProps {
  createPassword: (user: any, password: string) => void;
}

type InjectedProps = MappedProps & DispatchedProps & RouteComponentProps;
type CreatePasswordComponentProps = InjectedProps & FormikProps<CreatePasswordFormValues>;

/**
 * Create Password Component.
 *
 * @param {CreatePasswordComponentProps} props
 *
 * @returns {React.ReactElement}
 */
const CreatePassword: React.FC<CreatePasswordComponentProps> = (
  props: CreatePasswordComponentProps
): React.ReactElement => {
  const { values, errors, touched, isValid, isSubmitting, dirty, handleBlur, handleChange, handleSubmit } = props;

  const isSubmitButtonDisabled = !(isValid && dirty) || isSubmitting;

  return (
    <div>
      <div className="wrapper text-center">
        <CopperLogo />
        <div className="container">
          <div className="form-wrapper-center">
            <h1 className="mt-13x">Welcome to Copper</h1>
            <p>Please continue by setting up a password. You will use this password to log in next time.</p>
            <p className="text-bold my-5x">You were invited using your email address {censorEmail(props.email)}.</p>
            <form className="form form--create-password" onSubmit={handleSubmit}>
              <InputField
                id="password"
                type="password"
                name="password"
                label="Password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                error={errors.password && touched.password ? errors.password : ''}
              />
              <InputField
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                label="Repeat password"
                onBlur={handleBlur}
                value={values.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ''}
              />
              {props.isError && (
                <div className="form-group__error mb-6x mt-6x">
                  <ErrorSVGIcon className="error-icon" /> {props.errorMessage}
                </div>
              )}
              <button type="submit" className="btn btn--primary btn--block mt-2x" disabled={isSubmitButtonDisabled}>
                Set password
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

const EnhancedForm = withFormik<InjectedProps, CreatePasswordFormValues>({
  mapPropsToValues: () => ({ password: '', confirmPassword: '' }),
  handleSubmit: async (values, { props }) => {
    const { password } = values;
    try {
      await props.createPassword(props.awsUserDump, password);
      const { from } = (props.location.state as any) || { from: { pathname: '/' } };
      props.history.push(from);
    } catch (error) {
      // [TODO]: log error
    }
  },
  validateOnMount: true,
  displayName: CREATE_PASSWORD_FORM_NAME,
  validationSchema: createPasswordSchema,
});

const mapDispatchToprops = {
  createPassword,
};

const mapStateToProps = (state: AppState) => ({
  isError: state.ui.auth.isError,
  email: state.data.auth.userInfo.email,
  awsUserDump: state.data.auth.awsUserDump,
  errorMessage: state.ui.auth.errorMessage,
});

export default connect(mapStateToProps, mapDispatchToprops)(EnhancedForm(CreatePassword));
