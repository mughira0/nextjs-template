const dropdownBase = {
  sizes: {
    sm: {
      control: {
        minHeight: "32px",
        fontSize: "0.875rem", // text-sm
      },
      padding: "2px 8px",
    },
    md: {
      control: {
        minHeight: "40px",
        fontSize: "1rem", // text-base
      },
      padding: "4px 12px",
    },
    lg: {
      control: {
        minHeight: "48px",
        fontSize: "1.125rem", // text-lg
      },
      padding: "6px 16px",
    },
  },
  variants: {
    primary: {
      borderColor: "var(--input-border)",
      focusBorderColor: "var(--main-color)",
      focusBorderColorLight:
        "color-mix(in oklch, var(--main-color), white 20%)",
    },
    secondary: {
      borderColor: "var(--secondary-border)",
      focusBorderColor: "var(--secondary-color)",
      focusBorderColorLight:
        "color-mix(in oklch, var(--secondary-color), white 20%)",
    },
    error: {
      borderColor: "var(--danger-border)",
      focusBorderColor: "var(--danger-color)",
      focusBorderColorLight:
        "color-mix(in oklch, var(--danger-color), white 20%)",
    },
  },
};

export default dropdownBase;
