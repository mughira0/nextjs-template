// ============================================
// Input base styles
// ============================================
const genericBase = [
  "w-full",
  "resize-none",
  "p-[var(--field-padding-md)]",
  "h-27",
  "scrollbar-none",
];
const textAreaBase = {
  variants: {
    primary: [
      ...genericBase,
      "border-[1px]",
      "border-[var(--input-border)]",
      "rounded-[var(--field-radius)]",
      "text-[var(--input-color)]",
      "placeholder:text-[var(--placeholder-color)]",
      "disabled:opacity-50",
    ].join(" "),
    secondary: [
      ...genericBase,

      "border-[var(--secondary-border)]",
      "rounded-[var(--field-radius)]",
      "border-[1px]",
      "text-[var(--secondary-color)]",
      "placeholder:text-[var(--secondary-placeholder-color)]",
      "disabled:opacity-50",
      "p-2",
    ].join(" "),
    error: [
      ...genericBase,
      "border-[var(--danger-border)]",
      "border-[1px]",
      "placeholder:text-[var(--danger-color)]",
      "text-opacity-70",
      "rounded-[var(--field-radius)]",
      "p-2",
    ].join(" "),
  },
  focus: ["outline-none", "focus-visible:outline-none"].join(" "),
};
export default textAreaBase;
