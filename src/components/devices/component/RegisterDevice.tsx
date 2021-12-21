import React from 'react';
import { connect } from 'react-redux';
import { FormikProps, withFormik } from 'formik';

import Modal from 'components/common/modal';
import AppState from 'domain/states/AppState';
import ReactSelect from 'components/common/reactSelect';
import LocationResponse from 'domain/response/Location';
import { REGISTER_DEVICE_FORM } from 'constants/formName';
import registerDeviceSchema from 'schemas/RegisterDevice';
import { InputField } from 'components/common/inputField';
import { INVALID_REGISTRATION_CODE } from 'constants/error';
import { RegisterDeviceParams } from 'domain/request/Devices';
import { registerNewDevice } from 'actions/device/registerDevice';
import { DEVICE_REGISTRATION_PLACEHOLDER } from 'constants/appConstants';

interface MappedProps {
  locations: LocationResponse[];
}

interface RegisterDeviceProps {
  closeModal: () => void;
  isModalVisible: boolean;
  selectedLocation: string;
}

interface DispatchedProps {
  registerNewDevice: (payload: RegisterDeviceParams) => void;
}

type InjectedProps = RegisterDeviceProps & DispatchedProps & MappedProps;
type RegisterDeviceComponent = InjectedProps & FormikProps<RegisterDeviceParams>;

/**
 * Register device form component.
 *
 * @returns {React.ReactElement}
 */
const RegisterDevice: React.FC<RegisterDeviceComponent> = (props: RegisterDeviceComponent): React.ReactElement => {
  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    resetForm,
    locations,
    closeModal,
    handleBlur,
    setTouched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    isModalVisible,
  } = props;

  // Clear Form on cancel
  React.useEffect(() => {
    if (dirty && !isModalVisible) {
      resetForm();
    }
    if (!isModalVisible) {
      setTouched({});
    }
  }, [dirty, isModalVisible, resetForm, setTouched]);

  const locationOptions = locations?.map((value) => {
    return { value: value.id, label: value?.display_name || '' };
  });

  const isSubmitButtonDisabled = !(isValid && dirty) || isSubmitting;

  return (
    <Modal headerText="Register Device" isShown={isModalVisible} hide={closeModal}>
      <div className="form-wrapper mt-2x">
        <form className="form" onSubmit={handleSubmit}>
          <ReactSelect
            name="location"
            label="Location"
            className="mb-5x"
            onBlur={handleBlur}
            value={values.location}
            options={locationOptions}
            placeholder="Select location"
            onChange={(option) => setFieldValue('location', option)}
            error={errors.location && touched.location ? errors.location : ''}
          />
          <InputField
            type="text"
            onBlur={handleBlur}
            id="registration_code"
            onChange={handleChange}
            name="registration_code"
            label="Registration code"
            value={values.registration_code}
            placeholder={DEVICE_REGISTRATION_PLACEHOLDER}
            error={errors.registration_code && touched.registration_code ? errors.registration_code : ''}
          />
          <InputField
            id="label"
            type="text"
            onBlur={handleBlur}
            value={values.label}
            onChange={handleChange}
            label="Label (optional)"
            error={errors.label && touched.label ? errors.label : ''}
          />
          <button className="btn btn--block btn--primary mt-7x" disabled={isSubmitButtonDisabled || isSubmitting}>
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

const EnhancedForm = withFormik<InjectedProps, RegisterDeviceParams>({
  mapPropsToValues: (props) => {
    const { locations, selectedLocation } = props;
    const locationOptions = locations?.map((value) => ({ value: value.id, label: value?.display_name || '' }));

    const defaultLocation = locationOptions.find((item) => item.value === selectedLocation) || null;

    return {
      label: '',
      registration_code: '',
      location: defaultLocation,
    };
  },

  handleSubmit: async (values, { props, resetForm, setFieldError }) => {
    try {
      await props.registerNewDevice(values);
      props.closeModal();
      resetForm();
    } catch (error) {
      setFieldError('registration_code', INVALID_REGISTRATION_CODE);
    }
  },
  validateOnBlur: true,
  validateOnMount: false,
  validateOnChange: true,
  enableReinitialize: true,
  displayName: REGISTER_DEVICE_FORM,
  validationSchema: registerDeviceSchema,
});

const mapStateToProps = (state: AppState) => ({
  locations: state.data.locations.locations,
});

const mapDispatchToProps = {
  registerNewDevice,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedForm(RegisterDevice));
