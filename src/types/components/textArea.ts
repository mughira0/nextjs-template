export interface TextAreaProps {
  value?: string;
  setter?: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  variant?: "primary" | "secondary" | "error";
}
