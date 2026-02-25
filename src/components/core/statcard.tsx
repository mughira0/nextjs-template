import { FC } from "react";
import { cn } from "@/helper/generic";
import { StatCardProps } from "@/types/components/statcard";
import statCardBase from "@/baseStyles/statcard.styles";

const StatCard: FC<StatCardProps> = ({
  title,
  value,
  icon,
  className = "",
  variant = "primary",
}) => {
  const variantClass =
    statCardBase.variants[variant] || statCardBase.variants.primary;

  return (
    <div className={cn(variantClass, className)}>
      <div className="flex flex-col gap-1">
        <span className="text-sm opacity-80">{title}</span>
        <span className="text-2xl font-semibold">{value}</span>
      </div>

      {icon && <div className="text-3xl opacity-90 flex-shrink-0">{icon}</div>}
    </div>
  );
};

export default StatCard;
