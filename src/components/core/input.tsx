import inputBase from "@/baseStyles/input.styles";
import { cn } from "@/helper/generic";
import { InputProps } from "@/types/components/input";
import { ChangeEvent, FC } from "react";
import Label from "./label";

const Input: FC<InputProps> = ({
  value = "",
  setter,
  placeholder = "",
  type = "text",
  className = "",
  label,
  disabled = false,
  error,
  size = "md",
  variant = "primary",
}) => {
  const sizeConfig = inputBase.sizes[size] || inputBase.sizes.md;

  let variantClass = inputBase.variants[variant] || inputBase.variants.primary;

  if (error) variantClass += ` ${inputBase.variants.error}`;

  const finalClass = cn(
    sizeConfig.padding,
    sizeConfig.font,
    variantClass,
    className,
    inputBase.focus
  );

  return (
    <div className="flex flex-col w-full">
      {label && <Label>{label}</Label>}

      <input
        type={type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setter && setter(e.target.value)
        }
        placeholder={placeholder}
        disabled={disabled}
        className={finalClass}
      />

      {error && (
        <span className="text-[var(--danger-color)] text-sm mt-1">{error}</span>
      )}
    </div>
  );
};

export default Input;
