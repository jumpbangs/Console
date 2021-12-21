/* tslint:disable no-empty */
import React from 'react';
import { SearchSVGIcon, CloseSVGIcon } from '@react-md/material-icons';

import SearchBarProps from 'domain/misc/common/SearchBar';

/**
 * Search component.
 *
 * @param {SearchBarProps} props
 *
 * @returns {React.ReactElement}
 */
const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps): React.ReactElement => {
  const {
    value,
    onBlur,
    disabled,
    className,
    onKeyDown,
    placeholder,
    defaultValue,
    onClear = () => {},
    onChange = () => {},
  } = props;

  const [formValue, setFormValue] = React.useState(value || '');

  const _handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(event.target.value);
    onChange(event);
  };

  const _handleOnClear = () => {
    setFormValue('');
    onClear();
  };

  return (
    <div className={`search-bar ${className}`}>
      <SearchSVGIcon className="search-bar__icon" />
      <input
        type="text"
        onBlur={onBlur}
        value={formValue}
        disabled={disabled}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        onChange={_handleOnChange}
        defaultValue={defaultValue}
        className="search-bar__input"
      />
      {formValue && <CloseSVGIcon className="search-bar__close-icon" onClick={_handleOnClear} />}
    </div>
  );
};

export default SearchBar;
