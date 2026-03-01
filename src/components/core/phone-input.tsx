import inputBase from "@/baseStyles/input.styles";
import { cn } from "@/helper/generic";
import { PhoneInputProps } from "@/types/components/input";
import { FC } from "react";
import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Label from "./label";
import "../../styles/phone-input.styles.css";

const PhoneInput: FC<PhoneInputProps> = ({
  value = "",
  setter,
  placeholder = "Enter phone number",
  className = "",
  label,
  disabled = false,
  error,
  size = "sm",
  variant = "primary",
  defaultCountry = "us",
  onlyCountries,
  preferredCountries,
  enableSearch = false,
}) => {
  const sizeConfig = inputBase.sizes[size] || inputBase.sizes.md;

  let variantClass = inputBase.variants[variant] || inputBase.variants.primary;
  if (error) variantClass += ` ${inputBase.variants.error}`;

  const containerClass = cn("flex flex-col w-full", "phone-input-wrapper");

  const inputClass = cn(
    sizeConfig.padding,
    sizeConfig.font,
    variantClass,
    inputBase.focus,
    "w-full",
    className,
  );

  return (
    <div className={containerClass}>
      {label && <Label size={size}>{label}</Label>}

      <PhoneInputLib
        country={defaultCountry}
        value={value}
        onChange={(phone) => setter?.(phone)}
        placeholder={placeholder}
        disabled={disabled}
        onlyCountries={onlyCountries}
        preferredCountries={preferredCountries}
        enableSearch={enableSearch}
        inputClass={inputClass}
        containerClass="w-full relative"
        buttonClass={cn(
          "phone-flag-button",
          "border-[1px]",
          error
            ? "border-[var(--danger-border)]"
            : "border-[var(--input-border)]",
          "rounded-l-[var(--field-radius)]",
          "bg-transparent",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        )}
        dropdownClass="phone-dropdown"
        searchClass="phone-search"
        inputProps={{
          name: "phone",
          autoComplete: "tel",
        }}
      />

      {error && (
        <span className="text-[var(--danger-color)] text-sm mt-1">{error}</span>
      )}
    </div>
  );
};

export default PhoneInput;
