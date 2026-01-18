export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "primary-bordered"
    | "secondary-bordered"
    | "danger-bordered";
}
