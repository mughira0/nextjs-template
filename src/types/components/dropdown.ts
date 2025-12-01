export interface DropdownProps {
  value?: any;
  setter?: (value: any) => void;
  options?: any[];
  placeholder?: string;
  label?: string;
  className?: string;
  optionLabel?: string; // the key in options to display
  optionValue?: string; // the key in options to use as value
  error?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "error";
  disabled?: boolean;
  isSearchable?: boolean;
}
