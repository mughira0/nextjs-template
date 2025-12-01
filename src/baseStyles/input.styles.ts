// ============================================
// Input base styles
// ============================================
const inputBase = {
  sizes: {
    sm: {
      padding: "p-[var(--field-padding-sm)]",
      font: "text-sm",
    },
    md: {
      padding: "p-[var(--field-padding-md)]",
      font: "text-base",
    },
    lg: {
      padding: "p-[var(--field-padding-lg)]",
      font: "text-lg",
    },
  },
  variants: {
    primary: [
      "border-[1px]",
      "border-[var(--input-border)]",
      "rounded-[var(--field-radius)]",
      "text-[var(--input-color)]",
      "placeholder:text-[var(--placeholder-color)]",
      "disabled:opacity-50",
    ].join(" "),
    secondary: [
      "border-[var(--secondary-border)]",
      "rounded-[var(--field-radius)]",
      "border-[1px]",
      "text-[var(--secondary-color)]",
      "placeholder:text-[var(--secondary-placeholder-color)]",
      "disabled:opacity-50",
    ].join(" "),
    error: [
      "border-[var(--danger-border)]",
      "border-[1px]",
      "placeholder:text-[var(--danger-color)]",
      "text-opacity-70",
      "rounded-[var(--field-radius)]",
    ].join(" "),
  },
  focus: ["outline-none", "focus-visible:outline-none"].join(" "),
};
export default inputBase;
