import React from 'react';
import { connect } from 'react-redux';
import { FormikProps, withFormik } from 'formik';
import { ErrorSVGIcon } from '@react-md/material-icons';

import UploadLogo from './UploadLogo';
import Modal from 'components/common/modal';
import AppState from 'domain/states/AppState';
import editLocationSchema from 'schemas/Location';
import SelectState from 'components/common/selectState';
import LocationResponse from 'domain/response/Location';
import { InputField } from 'components/common/inputField';
import SelectCountry from 'components/common/selectCountry';
import { getInitialEditFormValues } from 'services/location';
import { EDIT_LOCATION_FORM_NAME } from 'constants/formName';
import { LocationDetailParams } from 'domain/request/Location';
import { updateLocation } from 'actions/location/updateLocation';
import { EditLocationFormValues } from 'domain/misc/locations/Locations';

interface EditLocationProps {
  isShown: boolean;
  hide?: () => void;
  location: LocationResponse;
}

interface MappedProps {
  isError: boolean;
  errorMessage: string;
}

interface DispatchedProps {
  updateLocation: (locationId: string, payload: LocationDetailParams) => void;
}

type InjectedProps = DispatchedProps & MappedProps & EditLocationProps;

type EditLocationComponentProps = InjectedProps & FormikProps<EditLocationFormValues>;

/**
 * Edit location component
 *
 * @param {EditLocationComponentProps} props
 *
 * @returns {React.ReactElement}
 */
const EditLocation: React.FC<EditLocationComponentProps> = (props: EditLocationComponentProps): React.ReactElement => {
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

  const isSubmitButtonDisabled = !(isValid && dirty) || isSubmitting;

  const handleHide = () => {
    if (props.hide) props.hide();
    resetForm();
  };

  return (
    <Modal headerText="Edit location" isShown={isShown} hide={handleHide}>
      <div className="edit-location">
        <UploadLogo name="logo" id="logo" />
        <form className="form" onSubmit={handleSubmit}>
          <InputField
            type="text"
            label="Name"
            id="locationName"
            name="locationName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.locationName}
            error={errors.locationName && touched.locationName ? errors.locationName : ''}
          />
          <SelectCountry name="countryName" label="Country" placeholder="Select country" />
          <InputField
            type="text"
            id="address1"
            name="address1"
            onBlur={handleBlur}
            label="Address line 1"
            value={values.address1}
            onChange={handleChange}
            error={errors.address1 && touched.address1 ? errors.address1 : ''}
          />
          <InputField
            type="text"
            id="address2"
            name="address2"
            onBlur={handleBlur}
            value={values.address2}
            onChange={handleChange}
            label="Address line 2 (optional)"
            error={errors.address2 && touched.address2 ? errors.address2 : ''}
          />
          <InputField
            id="city"
            name="city"
            type="text"
            label="City"
            onBlur={handleBlur}
            value={values.city}
            onChange={handleChange}
            error={errors.city && touched.city ? errors.city : ''}
          />
          <div className="row">
            <div className="col col-6">
              <SelectState name="state" label="State" placeholder="Select state" />
            </div>
            <div className="col col-6">
              <InputField
                id="zip"
                name="zip"
                label="ZIP"
                type="text"
                value={values.zip}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.zip && touched.zip ? errors.zip : ''}
              />
            </div>
          </div>
          <InputField
            id="phone"
            type="text"
            name="phone"
            placeholder="+1"
            onBlur={handleBlur}
            value={values.phone}
            onChange={handleChange}
            label="Phone (optional)"
            error={errors.phone && touched.phone ? errors.phone : ''}
          />
          <InputField
            type="text"
            id="website"
            name="website"
            onBlur={handleBlur}
            placeholder="https://"
            value={values.website}
            onChange={handleChange}
            label="Website (optional)"
            error={errors.website && touched.website ? errors.website : ''}
          />
          {props.isError && (
            <div className="form-group__error mb-6x mt-6x">
              <ErrorSVGIcon className="error-icon" /> {props.errorMessage}
            </div>
          )}
          <button className="btn btn--primary btn--block mt-7x" disabled={isSubmitButtonDisabled}>
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

const EnhancedForm = withFormik<InjectedProps, EditLocationFormValues>({
  mapPropsToValues: ({ location }) => getInitialEditFormValues(location),
  handleSubmit: async (values, { props }) => {
    const location = {
      logo: values.logo || '',
      display_name: values.locationName,
      address: {
        city: values.city,
        state: values.state,
        line1: values.address1,
        postal_code: values.zip,
        country: values.countryName,
        line2: values.address2 || '',
      },
      phone: values.phone || '',
      website: values.website || '',
    };
    try {
      await props.updateLocation(props.location.id, location);
      if (props.hide) props.hide();
    } catch (error) {
      // [TODO]: log error
    }
  },
  validateOnMount: true,
  enableReinitialize: true,
  displayName: EDIT_LOCATION_FORM_NAME,
  validationSchema: editLocationSchema,
});

const mapDispatchToprops = {
  updateLocation,
};

const mapStateToProps = (state: AppState) => ({
  isError: state.ui.locations.isError,
  errorMessage: state.ui.locations.errorMessage,
});

export default connect(mapStateToProps, mapDispatchToprops)(EnhancedForm(EditLocation));
