export interface DropdownProps<T = any> {
  value?: T | T[keyof T] | null;
  setter?: (value: T | null) => void;
  options?: T[];
  placeholder?: string;
  label?: string;
  className?: string;
  optionLabel?: keyof T;
  optionValue?: keyof T;
  error?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "error";
  disabled?: boolean;
  isSearchable?: boolean;
  isMultiple?: boolean;
  menuPlacement?: "auto" | "top" | "bottom";
  showClearIcon?: boolean;
}
export type DropdownOption = {
  [key: string]: any;
};
