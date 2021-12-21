import React from 'react';
import { useField } from 'formik';

import states from 'constants/states';
import ReactSelect from '../reactSelect';

interface SelectStateProps {
  name?: string;
  label?: string;
  className?: string;
  placeholder?: string;
}

interface SelectStateOptions {
  label: string;
  value: string;
}

/**
 * Select state component
 *
 * @param {SelectStateProps} props
 *
 * @returns {React.ReactElement}
 */
const SelectState: React.FC<SelectStateProps> = (props: SelectStateProps): React.ReactElement => {
  const { name = '', label, placeholder, className } = props;
  // [NOTE] extra comma here is not typo we are just ignoring the second value from useField
  const [field, , helpers] = useField<string>(name);

  const handleOnChange = (option: SelectStateOptions): void => {
    helpers.setValue(option.value);
    helpers.setTouched(true);
  };

  const getValue = states.find((option: Record<string, string>) => option.value === field.value);

  return (
    <div>
      <ReactSelect
        name={name}
        label={label}
        options={states}
        value={getValue}
        className={className}
        onBlur={field.onBlur}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default SelectState;
