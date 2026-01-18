export interface DropdownProps<T = any> {
  value?: T[keyof T] | null;
  setter?: (value: T[keyof T] | null) => void;
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
}
