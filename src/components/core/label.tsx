function Label({
  children,
  size,
}: Readonly<{ children: React.ReactNode; size?: "sm" | "md" | "lg" }>) {
  const sizeClass = size ? sizeClasses[size] : sizeClasses.md;
  return <label className={`mb-1  font-medium ${sizeClass}`}>{children}</label>;
}

export default Label;

const sizeClasses = {
  sm: "text-[length:var(--fs-sm)]",
  md: "text-[length:var(--fs-md)]",
  lg: "text-[length:var(--fs-lg)]",
};
