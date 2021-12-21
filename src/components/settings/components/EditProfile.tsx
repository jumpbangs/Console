import React from 'react';
import { connect } from 'react-redux';
import { FormikProps, withFormik } from 'formik';
import { ErrorSVGIcon } from '@react-md/material-icons';

import AppState from 'domain/states/AppState';
import editAccountSchema from 'schemas/Account';
import SelectState from 'components/common/selectState';
import { InputField } from 'components/common/inputField';
import { AccountResponse } from 'domain/response/Account';
import SelectCountry from 'components/common/selectCountry';
import { EDIT_ACCOUNT_FORM_NAME } from 'constants/formName';
import { getInitialEditFormValues } from 'services/accounts';
import { AccountDetailParams } from 'domain/request/Account';
import { updateAccount } from 'actions/account/updateAccount';
import { AccountsFormValues } from 'domain/misc/accounts/Accounts';

interface MappedProps {
  isError: boolean;
  errorMessage: string;
  account: AccountResponse;
}

interface DispatchedProps {
  updateAccount: (accountId: string, payload: AccountDetailParams) => void;
}

type InjectedProps = DispatchedProps & MappedProps;

type EditProfileComponentProps = InjectedProps & FormikProps<AccountsFormValues>;

/**
 * Edit Profile component.
 *
 * @param {EditProfileComponentProps} props
 *
 * @returns {React.ReactElement}
 */
const EditProfile: React.FC<EditProfileComponentProps> = (props: EditProfileComponentProps): React.ReactElement => {
  const { dirty, values, errors, touched, isValid, handleBlur, isSubmitting, handleChange, handleSubmit } = props;

  const isSubmitButtonDisabled = !(isValid && dirty) || isSubmitting;

  return (
    <div>
      <div className="sub-title text-semibold mb-6x">Edit profile</div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col col-12 col-8-xl">
            <div className="row">
              <div className="col col-6">
                <InputField
                  type="text"
                  id="merchantName"
                  name="merchantName"
                  onBlur={handleBlur}
                  label="Merchant name"
                  onChange={handleChange}
                  value={values.merchantName}
                  error={errors.merchantName && touched.merchantName ? errors.merchantName : ''}
                />
              </div>
              <div className="col col-6">
                <SelectCountry name="countryName" label="Country" placeholder="Select country" />
              </div>
              <div className="col col-6">
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
              </div>
              <div className="col col-6">
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
              </div>
              <div className="col col-6">
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
              </div>
              <div className="col col-3">
                <SelectState name="state" label="State" placeholder="Select state" />
              </div>
              <div className="col col-3">
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
              <div className="col col-6">
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
              </div>
              <div className="col col-6">
                <InputField
                  id="website"
                  type="text"
                  name="website"
                  onBlur={handleBlur}
                  placeholder="http://"
                  value={values.website}
                  onChange={handleChange}
                  label="Website (optional)"
                  error={errors.website && touched.website ? errors.website : ''}
                />
              </div>
            </div>
          </div>
        </div>
        {props.isError && (
          <div className="form-group__error mb-6x mt-6x">
            <ErrorSVGIcon className="error-icon" /> {props.errorMessage}
          </div>
        )}
        <div className=" border-bottom pb-5x mt-1x">
          <button className="btn btn--primary px-10x" disabled={isSubmitButtonDisabled}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const EnhancedForm = withFormik<InjectedProps, AccountsFormValues>({
  mapPropsToValues: ({ account }) => getInitialEditFormValues(account),
  handleSubmit: async (values, { props }) => {
    const account = {
      name: values.merchantName,
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
      await props.updateAccount(props.account.id, account);
    } catch (error) {
      // [TODO]: log error
    }
  },
  validateOnMount: true,
  enableReinitialize: true,
  displayName: EDIT_ACCOUNT_FORM_NAME,
  validationSchema: editAccountSchema,
});

const mapDispatchToprops = {
  updateAccount,
};

const mapStateToProps = (state: AppState) => ({
  isError: state.ui.accounts.isError,
  account: state.data.accounts.account,
  errorMessage: state.ui.accounts.errorMessage,
});

export default connect(mapStateToProps, mapDispatchToprops)(EnhancedForm(EditProfile));
