const dropdownBase = {
  sizes: {
    sm: {
      control: { minHeight: "32px", fontSize: "0.875rem" },
      padding: "2px 8px",
    },
    md: {
      control: { minHeight: "40px", fontSize: "1rem" },
      padding: "4px 12px",
    },
    lg: {
      control: { minHeight: "48px", fontSize: "1.125rem" },
      padding: "6px 16px",
    },
  },
  variants: {
    primary: {
      borderColor: "var(--input-border)",
      focusBorderColor: "var(--main-color)",
      backgroundColor: "transparent",
      focusBorderColorLight:
        "color-mix(in oklch, var(--main-color), white 20%)",
      multiValueBg: "color-mix(in oklch, var(--main-color), white 75%)", // ← NEW
      multiValueColor: "var(--main-color)", // ← NEW
    },
    secondary: {
      borderColor: "var(--secondary-border)",
      focusBorderColor: "var(--secondary-color)",
      backgroundColor: "transparent",
      focusBorderColorLight:
        "color-mix(in oklch, var(--secondary-color), white 20%)",
      multiValueBg: "color-mix(in oklch, var(--secondary-color), white 75%)", // ← NEW
      multiValueColor: "var(--secondary-color)", // ← NEW
    },
    error: {
      borderColor: "var(--danger-border)",
      focusBorderColor: "var(--danger-color)",
      backgroundColor: "transparent",
      focusBorderColorLight:
        "color-mix(in oklch, var(--danger-color), white 20%)",
      multiValueBg: "color-mix(in oklch, var(--danger-color), white 75%)", // ← NEW
      multiValueColor: "var(--danger-color)", // ← NEW
    },
  },
};

export default dropdownBase;
