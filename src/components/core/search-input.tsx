import { FC, useState, KeyboardEvent } from "react";
import Input from "./input";
import Button from "./button";
import { Search } from "lucide-react";
import { SearchInputProps } from "@/types/components/search-input";

const SearchInput: FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Search...",
  loading = false,
  disabled = false,
  size = "sm",
  defaultValue = "",
}) => {
  const [query, setQuery] = useState(defaultValue);

  const handleSearch = () => {
    const trimmed = query.trim();
    onSearch(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      className="flex items-stretch w-full"
      onKeyDown={handleKeyDown}
      role="search"
    >
      <div className="flex-1 [&_input]:rounded-r-none [&_input]:border-r-0">
        <Input
          value={query}
          setter={setQuery}
          placeholder={placeholder}
          size={size}
          disabled={disabled}
        />
      </div>

      <Button
        onClick={handleSearch}
        size={size}
        variant="primary"
        loading={loading}
        disabled={disabled}
        className="rounded-l-none shrink-0 flex items-center gap-1.5"
      >
        <Search className="size-4" />
      </Button>
    </div>
  );
};

export default SearchInput;
