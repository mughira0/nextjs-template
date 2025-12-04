export const cn = (...classes: (string | boolean | null | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
