import React from 'react';
import Select, { components } from 'react-select';
import { ArrowDropDownSVGIcon, ErrorSVGIcon } from '@react-md/material-icons';

import ReactSelectProps from 'domain/misc/common/ReactSelect';

/**
 * React Select Component
 *
 * @param {ReactSelectProps} props
 *
 * @returns {React.FC<ReactSelectProps>}
 */
const ReactSelect: React.FC<ReactSelectProps> = (props: ReactSelectProps): React.ReactElement => {
  const { value, name, defaultValue, className, onChange, onBlur, label, error } = props;

  const DropdownIndicator = (dropdownIndicatorProps: any) => (
    <components.DropdownIndicator {...dropdownIndicatorProps}>
      <ArrowDropDownSVGIcon className="mr-1x" />
    </components.DropdownIndicator>
  );

  const SelectFieldStyle = {
    menu: (base: any) => ({ ...base, marginTop: 2 }),
    option: (provided: any) => ({
      ...provided,
      padding: '17px 18px',
    }),
  };

  const Control = (props: any) => {
    return (
      <span title={defaultValue?.label || value?.label}>
        <components.Control {...props} />
      </span>
    );
  };

  return (
    <div className="custom-dropdown">
      {label && (
        <label htmlFor="react-select" className="custom-dropdown__label">
          {label}
        </label>
      )}
      <Select
        {...props}
        value={value}
        onBlur={onBlur}
        id="react_select"
        onChange={onChange}
        className={className}
        menuPlacement={'auto'}
        name={name ? name : ''}
        menuPosition={'absolute'}
        styles={SelectFieldStyle}
        defaultValue={defaultValue}
        classNamePrefix="select-container"
        components={{ DropdownIndicator, Control }}
      />
      {error && (
        <div data-testid={`error-${name}`} className="form-group__error">
          <ErrorSVGIcon className="error-icon" />
          {error}
        </div>
      )}
    </div>
  );
};

export default ReactSelect;
