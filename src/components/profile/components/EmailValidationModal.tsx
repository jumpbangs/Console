import React from 'react';
import { FormikProps, withFormik } from 'formik';

import Modal from 'components/common/modal';
import { InputField } from 'components/common/inputField';
import { CHANGE_ADMIN_VALIDATION_FORM } from 'constants/formName';
import EmailValidationCodeSchema from 'schemas/EmailValidation.Code';
import { EmailValidationFormValues } from 'domain/misc/profile/Profile';

interface EmailValidationModalProps {
  hide: () => void;
  isModalActive: boolean;
  submitForm: (values: EmailValidationFormValues) => void;
}

type InjectedProps = EmailValidationModalProps;
type EmailValidationModalComponentProps = InjectedProps & FormikProps<EmailValidationFormValues>;

/**
 * Email validation component.
 *
 * @param {EmailValidationModalComponentProps} props
 *
 * @returns {React.ReactElement}
 */
const EmailValidationModal: React.FC<EmailValidationModalComponentProps> = (
  props: EmailValidationModalComponentProps
): React.ReactElement => {
  const { hide, errors, values, handleSubmit, handleChange, isSubmitting, isModalActive, isValid, dirty } = props;

  const isSaveButtonDisabled = !(isValid && dirty) || isSubmitting;

  return (
    <Modal headerText="Change email" isShown={isModalActive} hide={hide}>
      <div className="admin-email mt-2x">
        <form className="form" onSubmit={handleSubmit}>
          <InputField
            id="code"
            name="code"
            type="text"
            value={values.code}
            onChange={handleChange}
            label="Enter your verification code"
            error={errors.code ? errors.code : ''}
          />
          <button className="btn btn--block btn--primary mt-7x" disabled={isSaveButtonDisabled}>
            Verify
          </button>
        </form>
      </div>
    </Modal>
  );
};

const EnhancedForm = withFormik<InjectedProps, EmailValidationFormValues>({
  mapPropsToValues: () => ({ code: '' }),

  handleSubmit: async (values, { props, setFieldError }) => {
    const payload = { ...values, code: values.code.trim() };

    try {
      await props.submitForm(payload);
    } catch (error) {
      setFieldError('code', error.message);
    }
  },
  validateOnBlur: true,
  validateOnMount: false,
  validateOnChange: true,
  enableReinitialize: true,
  displayName: CHANGE_ADMIN_VALIDATION_FORM,
  validationSchema: EmailValidationCodeSchema,
});

const EmailValidationForm = EnhancedForm(EmailValidationModal);

export default EmailValidationForm;
