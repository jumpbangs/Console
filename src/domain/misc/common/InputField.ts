interface InputFieldProps {
  id: string;
  name?: string;
  type?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string | number;
  forgotPassword?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default InputFieldProps;
