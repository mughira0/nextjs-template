import buttonBase from "@/baseStyles/buttons.styles";
import { cn } from "@/helper/generic";
import { ButtonProps } from "@/types/components/button";
import { FC, MouseEvent } from "react";

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled = false,
  size = "md",
  variant = "primary",
}) => {
  const sizeConfig = buttonBase.sizes[size] || buttonBase.sizes.md;
  let variantClass =
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
      onClick={(e: MouseEvent<HTMLButtonElement>) =>
        !disabled && onClick && onClick(e)
      }
      disabled={disabled}
      className={finalClass}
    >
      {children}
    </button>
  );
};

export default Button;
