import { MOBILE_BREAKPOINT } from "@/data/dummy";
import * as React from "react";

export function useIsMobile(width = MOBILE_BREAKPOINT): boolean | undefined {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = globalThis.matchMedia(`(max-width: ${width - 1}px)`);
    const onChange = () => {
      setIsMobile(globalThis.innerWidth < width);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(globalThis.innerWidth < width);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
