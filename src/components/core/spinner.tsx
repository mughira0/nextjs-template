type SpinnerProps = {
  size?: keyof typeof SPINNER_SIZE;
  className?: string;
};

function Spinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <div
      className={`
        ${SPINNER_SIZE[size]}
        rounded-full
        border-gray-300
        border-t-transparent
        animate-spin
        ${className}
      `}
    />
  );
}

export default Spinner;
// constants/spinner.ts
const SPINNER_SIZE = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-4",
};
