// styles/sidebarBase.ts
// ============================================
// Sidebar base styles
// ============================================
const sidebarBase = {
  container: {
    base: [
      "h-full",
      "flex flex-col",
      "transition-all duration-300 ease-in-out",
      "bg-[var(--sidebar-bg)]",
      "border-r border-[var(--sidebar-border)]",
      "shadow-[var(--sidebar-shadow)]",
    ].join(" "),
    widths: {
      expanded: "w-64",
      collapsed: "w-16",
      mobile: "w-full",
    },
  },
  logo: {
    wrapper: "relative flex items-center justify-center py-6",
    toggle: [
      "absolute -right-3 top-1/2 -translate-y-1/2",
      "bg-[var(--main-color)] text-[var(--white-color)]",
      "rounded-full w-6 h-6 flex items-center justify-center",
      "shadow-md hover:scale-110 transition",
    ].join(" "),
  },
  nav: "flex-1 overflow-y-auto px-2",
  item: {
    base: [
      "flex items-center justify-between",
      "rounded-md px-3 py-2 my-0.5",
      "cursor-pointer transition-colors duration-200",
      "text-sm text-[var(--sidebar-item-text)]",
    ].join(" "),
    hover:
      "hover:bg-[var(--sidebar-item-hover-bg)] hover:text-[var(--sidebar-item-hover-text)]",
    active:
      "bg-[var(--sidebar-item-hover-bg)] text-[var(--sidebar-item-active-text)]",
    link: "flex items-center gap-3 flex-1 min-w-0",
    subIndent: "mt-1 border-l border-[var(--sidebar-border)] ml-3",
  },
  icon: {
    base: "flex-shrink-0 text-lg text-[var(--sidebar-item-icon)]",
    active: "text-[var(--sidebar-item-active-icon)]",
  },
  chevron: {
    wrapper: "p-1 rounded hover:bg-white/10 transition",
    base: "transition-transform duration-200",
    open: "rotate-180",
  },
  tooltip: [
    "absolute left-full ml-2 px-3 py-2",
    "bg-gray-900/95 text-white text-sm rounded-md",
    "opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity",
    "whitespace-nowrap shadow-lg ",
  ].join(" "),
};

export default sidebarBase;
