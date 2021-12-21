interface SearchBarProps {
  value?: string;
  className?: string;
  disabled?: boolean;
  onClear?: () => void;
  placeholder?: string;
  defaultValue?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default SearchBarProps;
