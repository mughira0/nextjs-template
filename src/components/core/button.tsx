import buttonBase from "@/baseStyles/buttons.styles";
import { cn } from "@/helper/generic";
import { ButtonProps } from "@/types/components/button";
import { FC, MouseEvent } from "react";
import Spinner from "./spinner";

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled = false,
  size = "sm",
  variant = "primary",
  loading = false,
}) => {
  const sizeConfig = buttonBase.sizes[size] || buttonBase.sizes.md;
  const variantClass =
    buttonBase.variants[variant] || buttonBase.variants.primary;

  const finalClass = cn(
    sizeConfig.padding,
    sizeConfig.font,
    variantClass,
    buttonBase.focus,
    className
  );

  return (
    <button
      onClick={(e: MouseEvent<HTMLButtonElement>) => onClick?.(e)}
      disabled={disabled}
      className={finalClass}
    >
      {loading ? <Spinner size={size} /> : children}
    </button>
  );
};

export default Button;
