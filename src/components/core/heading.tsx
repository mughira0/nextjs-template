import { FC } from "react";
import { cn } from "@/helper/generic";
import { HeadingProps } from "@/types/components/heading";

const Heading: FC<HeadingProps> = ({
  title,
  description,
  tags = [],
  className = "",
}) => {
  return (
    <div className={cn("mb-3", className)}>
      <h2 className="text-2xl font-semibold mb-0 text-primary leading-tight">
        {title}{" "}
      </h2>

      {description && (
        <p className="mt-1 text-sm text-secondary max-w-2xl">{description}</p>
      )}
    </div>
  );
};

export default Heading;
