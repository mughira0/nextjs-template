export interface InputProps {
  value?: string;
  setter?: (value: string) => void;
  placeholder?: string;
  type?: "text" | "password";
  className?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "error";
}
