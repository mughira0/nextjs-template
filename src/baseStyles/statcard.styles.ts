const baseCardClasses = [
  "flex items-center justify-between gap-4",
  "rounded-[var(--btn-radius)]",
  "p-4",
  "transition-colors duration-200",
];

const statCardBase = {
  variants: {
    primary: [
      ...baseCardClasses,
      "bg-[var(--primary-color)]",
      "text-[var(--white-color)]",
    ].join(" "),

    secondary: [
      ...baseCardClasses,
      "bg-[var(--secondary-color)]",
      "text-[var(--white-color)]",
    ].join(" "),

    "primary-bordered": [
      ...baseCardClasses,
      "bg-[var(--sidebar-bg)]",
      "border-2",
      "border-[var(--primary-color)]",
      "text-[var(--primary-color)]",
    ].join(" "),

    "secondary-bordered": [
      ...baseCardClasses,
      "bg-[var(--sidebar-bg)]",
      "border-2",
      "border-[var(--secondary-color)]",
      "text-[var(--secondary-color)]",
    ].join(" "),
  },
};

export default statCardBase;
