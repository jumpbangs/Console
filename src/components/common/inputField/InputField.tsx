import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ErrorSVGIcon } from '@react-md/material-icons';

import routes from 'constants/routes';
import InputFieldProps from 'domain/misc/common/InputField';

/**
 * Common input field.
 *
 * @param {InputFieldProps} props
 *
 * @returns {React.ReactElement}
 */
const InputField: React.FC<InputFieldProps> = (props: InputFieldProps): React.ReactElement => {
  const { id, type, name, label, value, error, onBlur, disabled, onChange, placeholder, forgotPassword } = props;

  const inputClassName = classnames('form-group__control', { [`form-group__control--error`]: error });

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-group__label">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={inputClassName}
      />
      {error && (
        <div data-testid={`error-${name}`} className="form-group__error">
          <ErrorSVGIcon className="error-icon" />
          {error}
        </div>
      )}

      {type === 'password' && forgotPassword && (
        <div className="additional-control">
          <NavLink to={routes.FORGOT_PASSWORD} className="link">
            Forgot your password?
          </NavLink>
        </div>
      )}
    </div>
  );
};

InputField.defaultProps = {
  id: '',
  name: '',
  label: '',
  error: '',
  value: '',
  type: 'text',
  placeholder: '',
  disabled: false,
};

export default InputField;
