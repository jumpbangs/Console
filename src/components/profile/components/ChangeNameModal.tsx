import React from 'react';
import { FormikProps, withFormik } from 'formik';

import Modal from 'components/common/modal';
import { InputField } from 'components/common/inputField';
import { CHANGE_ADMIN_NAME_FORM } from 'constants/formName';
import ChangeAdminNameSchema from 'schemas/ChangeAdminName';
import { ChangeAdminNameFormValues } from 'domain/misc/profile/Profile';

interface ChangeNameModalProps {
  hide: () => void;
  adminName: string;
  isModalActive: boolean;
  submitForm: (values: ChangeAdminNameFormValues) => void;
}

type InjectedProps = ChangeNameModalProps;
type ChangeNameComponentProps = InjectedProps & FormikProps<ChangeAdminNameFormValues>;

/**
 * Change Administrator name component.
 *
 * @param {ChangeNameComponentProps} props
 *
 * @returns {React.ReactElement}
 */
const ChangeNameModal: React.FC<ChangeNameComponentProps> = (props: ChangeNameComponentProps): React.ReactElement => {
  const { hide, isModalActive, handleSubmit, values, handleChange, errors, isSubmitting, isValid, dirty } = props;

  const isSaveButtonDisabled = !(isValid && dirty) || isSubmitting;

  return (
    <Modal headerText="Change name" isShown={isModalActive} hide={hide}>
      <div className="admin-name mt-2x">
        <form className="form" onSubmit={handleSubmit}>
          <InputField
            id="name"
            name="name"
            type="text"
            label="Name"
            value={values.name}
            onChange={handleChange}
            error={errors.name ? errors.name : ''}
          />
          <button className="btn btn--block btn--primary mt-7x" disabled={isSaveButtonDisabled}>
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

const EnhancedForm = withFormik<InjectedProps, ChangeAdminNameFormValues>({
  mapPropsToValues: (props) => ({ name: props.adminName }),

  handleSubmit: async (values, { props, setFieldError }) => {
    const payload = { ...values, code: values.name.trim() };

    try {
      await props.submitForm(payload);
    } catch (error) {
      setFieldError('name', error);
    }
  },
  validateOnBlur: true,
  validateOnMount: false,
  validateOnChange: true,
  enableReinitialize: true,
  displayName: CHANGE_ADMIN_NAME_FORM,
  validationSchema: ChangeAdminNameSchema,
});

const ChangeAdminNameForm = EnhancedForm(ChangeNameModal);

export default ChangeAdminNameForm;
