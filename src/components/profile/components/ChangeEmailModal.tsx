import React from 'react';
import { FormikProps, withFormik } from 'formik';

import Modal from 'components/common/modal';
import { InputField } from 'components/common/inputField';
import { CHANGE_ADMIN_NAME_FORM } from 'constants/formName';
import ChangeAdminEmailSchema from 'schemas/ChangeAdminEmail';
import { ChangeAdminEmailFormValues } from 'domain/misc/profile/Profile';

interface ChangeEmailProps {
  hide: () => void;
  adminEmail: string;
  emailVerified: boolean;
  isModalActive: boolean;
  submitForm: (values: ChangeAdminEmailFormValues, resendVerification?: boolean) => void;
}

type InjectedProps = ChangeEmailProps;
type ChangeEmailComponentProps = InjectedProps & FormikProps<ChangeAdminEmailFormValues>;

/**
 * Change Email component.
 *
 * @param {ChangeEmailComponentProps} props
 *
 * @returns {React.ReactElement}
 */
const ChangeEmail: React.FC<ChangeEmailComponentProps> = (props: ChangeEmailComponentProps): React.ReactElement => {
  const {
    hide,
    dirty,
    errors,
    values,
    isValid,
    handleSubmit,
    handleChange,
    isSubmitting,
    emailVerified,
    isModalActive,
  } = props;

  const isSaveButtonDisabled = (!(isValid && dirty) || isSubmitting) && emailVerified;

  return (
    <Modal headerText="Change email" isShown={isModalActive} hide={hide}>
      <div className="admin-email mt-2x">
        <div className="mb-5x">We will send you a verification code to your new email address.</div>
        <form className="form" onSubmit={handleSubmit}>
          <InputField
            id="email"
            name="email"
            type="text"
            label="Email"
            value={values.email}
            onChange={handleChange}
            error={errors.email ? errors.email : ''}
          />
          <button className="btn btn--block btn--primary mt-7x" disabled={isSaveButtonDisabled}>
            Continue
          </button>
        </form>
      </div>
    </Modal>
  );
};

const EnhancedForm = withFormik<InjectedProps, ChangeAdminEmailFormValues>({
  mapPropsToValues: (props) => ({ email: props.adminEmail }),

  handleSubmit: async (values, { props, setFieldError }) => {
    const payload = { ...values, email: values.email.trim() };

    try {
      await props.submitForm(payload, !props.emailVerified && props.adminEmail === payload.email);
    } catch (error) {
      setFieldError('name', error);
    }
  },
  validateOnBlur: true,
  validateOnMount: false,
  validateOnChange: true,
  enableReinitialize: true,
  displayName: CHANGE_ADMIN_NAME_FORM,
  validationSchema: ChangeAdminEmailSchema,
});

const ChangeAdminEmailForm = EnhancedForm(ChangeEmail);

export default ChangeAdminEmailForm;
