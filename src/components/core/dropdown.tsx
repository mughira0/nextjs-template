"use client";
import dropdownBase from "@/baseStyles/dropdown.styles";
import { DropdownProps } from "@/types/components/dropdown";
import Select, { MultiValue, SingleValue, StylesConfig } from "react-select";
import Label from "./label";
const Dropdown = <T,>({
  value,
  setter,
  options = [],
  placeholder = "Select an option",
  label = "",
  className = "",
  optionLabel = "label" as keyof T,
  optionValue = "value" as keyof T,
  error,
  size = "md",
  variant = "primary",
  isMultiple = false,
  disabled = false,
  isSearchable = false,
  menuPlacement = "auto",
  showClearIcon = false,
}: DropdownProps<T>) => {
  const handleChange = (
    selected:
      | SingleValue<{ label: string; value: T[keyof T] }>
      | MultiValue<{ label: string; value: T[keyof T] }>,
  ) => {
    if (!setter) return;

    if (isMultiple) {
      const multi = selected as MultiValue<{
        label: string;
        value: T[keyof T];
      }>;
      if (!multi || multi.length === 0) return setter(null);
      const fullObjects = multi
        .map((s) => options.find((opt) => opt[optionValue!] === s.value))
        .filter(Boolean) as T[];
      setter(fullObjects as unknown as T); // for multi, cast needed
    } else {
      const single = selected as SingleValue<{
        label: string;
        value: T[keyof T];
      }>;
      if (!single) return setter(null);
      const fullObject =
        options.find((opt) => opt[optionValue!] === single.value) ?? null;
      setter(fullObject); // ✅ clean, no cast needed
    }
  };
  const mappedOptions =
    options?.map((opt) => ({
      label: String(opt[optionLabel!]),
      value: opt[optionValue!],
    })) || [];
  const selectedOption = isMultiple
    ? mappedOptions.filter((opt) => {
        if (!Array.isArray(value)) return false;
        return (value as T[]).some(
          (v) =>
            (typeof v === "object" ? (v as T)[optionValue!] : v) === opt.value,
        );
      })
    : (mappedOptions.find((opt) => {
        if (value && typeof value === "object") {
          return (value as T)[optionValue!] === opt.value;
        }
        return opt.value === value;
      }) ?? null);

  // Get size and variant configs
  const sizeConfig = dropdownBase.sizes[size] || dropdownBase.sizes.md;
  const variantConfig = error
    ? dropdownBase.variants.error
    : dropdownBase.variants[variant] || dropdownBase.variants.primary;

  // Custom styles for react-select
  const customStyles: StylesConfig<
    { label: string; value: T[keyof T] },
    boolean
  > = {
    control: (provided, state) => ({
      ...provided,
      borderColor: variantConfig.borderColor,
      backgroundColor: variantConfig.backgroundColor,
      borderRadius: "var(--field-radius)",
      minHeight: sizeConfig.control.minHeight,
      fontSize: sizeConfig.control.fontSize,
      padding: sizeConfig.padding,
      boxShadow: "none",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "default",
      "&:hover": {
        borderColor: variantConfig.borderColor,
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
      color: "var(--input-color)",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "var(--placeholder-color)",
      margin: "0",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--input-color)",
      margin: "0",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: variantConfig.borderColor,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused
        ? variantConfig.focusBorderColor
        : variantConfig.borderColor,
      padding: "0 8px",
      "&:hover": {
        color: variantConfig.focusBorderColor,
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: variantConfig.borderColor,
      padding: "0 8px",
      "&:hover": {
        color: variantConfig.focusBorderColor,
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "var(--field-radius)",
      backgroundColor: "var(--background-color)",
      border: `1px solid ${variantConfig.borderColor}`,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      marginTop: "4px",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "4px",
    }),
    option: (provided, state) => {
      let backgroundColor = "transparent";
      if (state.isSelected) {
        backgroundColor = variantConfig.focusBorderColor;
      }

      return {
        ...provided,
        backgroundColor,
        marginBottom: "4px",
        color: state.isSelected ? "var(--white-color)" : "var(--input-color)",
        cursor: "pointer",
        borderRadius: "4px",
        padding: sizeConfig.padding,
        fontSize: sizeConfig.control.fontSize,
        "&:active": {
          backgroundColor: variantConfig.focusBorderColor,
        },
        "&:hover": {
          backgroundColor: variantConfig.focusBorderColorLight,
          color: "var(--white-color)",
        },
      };
    },

    multiValue: (provided) => ({
      ...provided,
      backgroundColor: variantConfig.multiValueBg,
      borderRadius: "4px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: variantConfig.multiValueColor,
      fontSize: sizeConfig.control.fontSize,
      fontWeight: 500,
      padding: "1px 4px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: variantConfig.multiValueColor,
      borderRadius: "0 4px 4px 0",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: variantConfig.focusBorderColor,
        color: "var(--white-color)",
      },
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: "var(--placeholder-color)",
      fontSize: sizeConfig.control.fontSize,
    }),
  };

  return (
    <div className="flex flex-col w-full">
      {label && <Label>{label}</Label>}
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={mappedOptions}
        placeholder={placeholder}
        menuPlacement={menuPlacement}
        className={className}
        classNamePrefix="custom-select"
        styles={customStyles}
        isDisabled={disabled}
        isClearable={showClearIcon}
        isSearchable={isSearchable}
        isMulti={isMultiple}
      />
      {error && (
        <span className="text-[var(--danger-color)] text-sm mt-1">{error}</span>
      )}
    </div>
  );
};

export default Dropdown;
