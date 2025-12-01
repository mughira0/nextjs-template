const baseButtonClasses = [
  "cursor-pointer", // Default cursor
  "transition-colors duration-200",
];
const buttonBase = {
  sizes: {
    sm: {
      padding: "p-[var(--btn-padding-sm)]",
      font: "text-sm",
    },
    md: {
      padding: "p-[var(--btn-padding-md)]",
      font: "text-base",
    },
    lg: {
      padding: "p-[var(--btn-padding-lg)]",
      font: "text-lg",
    },
  },

  variants: {
    primary: [
      ...baseButtonClasses,
      "bg-[var(--primary-color)]",
      "text-[var(--white-color)]",
      "border-[1px]",
      "border-[var(--primary-color)]",
      "rounded-[var(--btn-radius)]",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed",
    ].join(" "),
    secondary: [
      ...baseButtonClasses,
      "bg-[var(--secondary-color)]",
      "text-[var(--white-color)]",
      "border-[1px]",
      "border-[var(--secondary-color)]",
      "rounded-[var(--btn-radius)]",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed",
    ].join(" "),

    "primary-bordered": [
      ...baseButtonClasses,
      "bg-transparent",
      "text-[var(--primary-color)]",
      "border-[2px]",
      "border-[var(--primary-color)]",
      "rounded-[var(--btn-radius)]",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed",
    ].join(" "),
    "secondary-bordered": [
      ...baseButtonClasses,
      "bg-transparent",
      "text-[var(--secondary-color)]",
      "border-[2px]",
      "border-[var(--secondary-color)]",
      "rounded-[var(--btn-radius)]",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed",
    ].join(" "),
    danger: [
      ...baseButtonClasses,
      "bg-[var(--danger-color)]",
      "text-[var(--white-color)]",
      "border-[1px]",
      "border-[var(--danger-border)]",
      "rounded-[var(--btn-radius)]",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed",
    ].join(" "),
    "danger-bordered": [
      ...baseButtonClasses,
      "bg-transparent",
      "text-[var(--danger-color)]",
      "border-[2px]",
      "border-[var(--danger-border)]",
      "rounded-[var(--btn-radius)]",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed",
    ].join(" "),
  },
  focus: [
    "outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[var(--focus-ring-color)]",
    "focus-visible:ring-offset-2",
  ].join(" "),
};
export default buttonBase;
