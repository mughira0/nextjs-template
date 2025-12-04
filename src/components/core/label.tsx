function Label({ children }: Readonly<{ children: React.ReactNode }>) {
  return <label className="mb-1 text-label font-medium">{children}</label>;
}

export default Label;
