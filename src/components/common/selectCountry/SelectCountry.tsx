import React from 'react';
import { useField } from 'formik';

import ReactSelect from '../reactSelect';
import countries from 'constants/countries';

interface SelectCountryProps {
  name?: string;
  label?: string;
  className?: string;
  placeholder?: string;
}

interface SelectCountryOptions {
  label: string;
  value: string;
}

/**
 * Select country component
 *
 * @param {SelectCountryProps} props
 *
 * @returns {React.ReactElement}
 */
const SelectCountry: React.FC<SelectCountryProps> = (props: SelectCountryProps): React.ReactElement => {
  const { name = '', label, placeholder, className } = props;
  // [NOTE] extra comma here is not typo we are just ignoring the second value from useField
  const [field, , helpers] = useField<string>(name);

  const handleOnChange = (option: SelectCountryOptions): void => {
    helpers.setValue(option.value);
    helpers.setTouched(true);
  };

  const getValue = countries.find((option: Record<string, string>) => option.value === field.value);

  return (
    <div className="mb-5x">
      <ReactSelect
        name={name}
        label={label}
        isDisabled={true}
        options={countries}
        className={className}
        onBlur={field.onBlur}
        value={getValue || ''}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default SelectCountry;
