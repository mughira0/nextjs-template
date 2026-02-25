export const tabsBase = {
  sizes: {
    sm: { padding: "px-3 py-1.5", font: "text-sm" },
    md: { padding: "px-4 py-2", font: "text-sm" },
    lg: { padding: "px-6 py-2.5", font: "text-base" },
  },
  variants: {
    primary: {
      wrapper: [
        "relative flex items-center gap-1 p-1",
        "bg-[oklch(from_var(--primary-color)_l_c_h_/_0.08)]",
        "border border-[var(--field-border)]",
        "rounded-[var(--btn-radius)]",
      ].join(" "),
      tab: {
        base: [
          "relative z-10 flex items-center justify-center gap-1.5 flex-shrink-0",
          "font-medium rounded-[calc(var(--btn-radius)-2px)]",
          "cursor-pointer select-none",
          "transition-colors duration-150",
          "text-[var(--secondary-text-color)]",
          // hover: light primary tint fill
          "hover:text-[var(--primary-color)] hover:bg-[oklch(from_var(--primary-color)_l_c_h_/_0.10)]",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] focus-visible:ring-offset-1",
        ].join(" "),
        active: "text-[var(--white-color)]",
      },
      indicator: "bg-[var(--primary-color)]",
    },
    secondary: {
      wrapper: [
        "relative flex items-center gap-1 p-1",
        "bg-[oklch(from_var(--secondary-color)_l_c_h_/_0.06)]",
        "border border-[var(--secondary-border)]",
        "rounded-[var(--btn-radius)]",
      ].join(" "),
      tab: {
        base: [
          "relative z-10 flex items-center justify-center gap-1.5 flex-shrink-0",
          "font-medium rounded-[calc(var(--btn-radius)-2px)]",
          "cursor-pointer select-none",
          "transition-colors duration-150",
          "text-[var(--secondary-text-color)]",
          // hover: light secondary tint fill
          "hover:text-[var(--secondary-color)] hover:bg-[oklch(from_var(--secondary-color)_l_c_h_/_0.10)]",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary-color)] focus-visible:ring-offset-1",
        ].join(" "),
        active: "text-[var(--white-color)]",
      },
      indicator: "bg-[var(--secondary-color)]",
    },
  },
};
