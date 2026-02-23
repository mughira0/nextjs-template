import { useRef, useState } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useDismiss,
  useInteractions,
  useClick,
  arrow,
  FloatingArrow,
} from "@floating-ui/react";
import { cn } from "@/helper/generic";
import { PopperProps } from "@/types/components/popper";
import { MoreHorizontal } from "lucide-react";

export default function Popper({
  items,
  onClick,
  placement = "bottom",
  className = "",
  children = <MoreHorizontal size={15} />,
}: PopperProps) {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [
      offset(10),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Trigger */}
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>

      {/* Floating panel — arrow MUST be inside this div */}
      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className={cn(
            "z-50 min-w-[120px] ",
            "bg-[var(--popper-bg)] border border-[var(--popper-border)]",
            "rounded-xl shadow-xl",
            "overflow-visible",
          )}
        >
          {/* Arrow lives inside the floating div so floating-ui can position it */}
          <FloatingArrow
            ref={arrowRef}
            context={context}
            className="fill-[var(--popper-bg)] top-[-13.5px] stroke-[1] stroke-[var(--popper-border)]"
            strokeWidth={1}
            width={14}
            height={7}
            tipRadius={2}
          />

          {/* Menu */}
          <div className="py-2 px-2">
            {items.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onClick?.(item);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 flex-shrink-0 px-4 py-1.5 text-left",
                  "text-[var(--popper-text)] hover:bg-[var(--popper-hover)]",
                  "hover:text-white rounded-lg",
                )}
              >
                {item.icon}
                <span className="text-nowrap text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
