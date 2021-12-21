interface ReactSelectProps {
  value?: any;
  options: any;
  name?: string;
  error?: string;
  label?: string;
  isMulti?: boolean;
  className?: string;
  defaultValue?: any;
  placeholder?: string;
  isDisabled?: boolean;
  isSearchable?: boolean;
  onBlur?: (event: any) => any;
  onChange?: (option: any) => any;
}

export default ReactSelectProps;
