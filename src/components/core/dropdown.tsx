"use client";
import dropdownBase from "@/baseStyles/dropdown.styles";
import { DropdownProps } from "@/types/components/dropdown";
import { FC } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import Label from "./label";
const Dropdown: FC<DropdownProps> = ({
  value,
  setter,
  options = [],
  placeholder = "Select an option",
  label = "",
  className = "",
  optionLabel = "label",
  optionValue = "value",
  error,
  size = "md",
  variant = "primary",
  disabled = false,
  isSearchable = false,
}) => {
  const handleChange = (selected: SingleValue<any>) => {
    if (setter) setter(selected ? selected[optionValue] : null);
  };

  const mappedOptions = options.map((opt) => ({
    label: opt[optionLabel],
    value: opt[optionValue],
  }));

  const selectedOption =
    mappedOptions.find((opt) => opt.value === value) || null;

  // Get size and variant configs
  const sizeConfig = dropdownBase.sizes[size] || dropdownBase.sizes.md;
  const variantConfig = error
    ? dropdownBase.variants.error
    : dropdownBase.variants[variant] || dropdownBase.variants.primary;

  // Custom styles for react-select
  const customStyles: StylesConfig<any, false> = {
    control: (provided, state) => ({
      ...provided,
      borderColor: variantConfig.borderColor,
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
      if (state.isFocused) {
        backgroundColor = variantConfig.focusBorderColorLight;
      } else if (state.isSelected) {
        backgroundColor = variantConfig.focusBorderColor;
      }

      return {
        ...provided,
        backgroundColor,
        color:
          state.isSelected || state.isFocused
            ? "var(--white-color)"
            : "var(--input-color)",
        cursor: "pointer",
        borderRadius: "4px",
        padding: sizeConfig.padding,
        fontSize: sizeConfig.control.fontSize,
        "&:active": {
          backgroundColor: variantConfig.focusBorderColor,
        },
      };
    },
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
        className={className}
        classNamePrefix="custom-select"
        styles={customStyles}
        isDisabled={disabled}
        isClearable
        isSearchable={isSearchable}
      />
      {error && (
        <span className="text-[var(--danger-color)] text-sm mt-1">{error}</span>
      )}
    </div>
  );
};

export default Dropdown;
