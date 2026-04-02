import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export interface CodeEditorRootProps extends ComponentProps<"div"> {
  roastMode?: boolean;
}

function CodeEditorRoot({
  className,
  children,
  roastMode = false,
  ...props
}: CodeEditorRootProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border transition-colors duration-300 overflow-hidden",
        roastMode
          ? "border-accent-green shadow-2xl shadow-accent-green/25"
          : "border-border shadow-2xl shadow-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { CodeEditorRoot as Root };
