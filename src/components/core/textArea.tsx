import texBaseBase from "@/baseStyles/textArea.styles";
import { cn } from "@/helper/generic";
import { TextAreaProps } from "@/types/components/textArea";
import { ChangeEvent, FC } from "react";
import Label from "./label";

const TextArea: FC<TextAreaProps> = ({
  value = "",
  setter,
  placeholder = "",
  className = "",
  label,
  disabled = false,
  error,
  variant = "primary",
}) => {
  let variantClass =
    texBaseBase.variants[variant] || texBaseBase.variants.primary;

  if (error) variantClass += ` ${texBaseBase.variants.error}`;

  const finalClass = cn(variantClass, className, texBaseBase.focus);

  return (
    <div className="flex flex-col w-full">
      {label && <Label>{label}</Label>}

      <textarea
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
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

export default TextArea;
