export interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  defaultValue?: string;
}
