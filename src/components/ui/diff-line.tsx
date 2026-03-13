import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/utils/cn";

const diffLine = tv({
  base: "flex items-start gap-2 px-4 py-2 font-mono text-[13px] transition-colors w-full",
  variants: {
    type: {
      added: "bg-accent-green/10 text-zinc-50",
      removed: "bg-accent-red/10 text-zinc-400",
      context: "bg-transparent text-zinc-400",
    },
  },
  defaultVariants: {
    type: "context",
  },
});

export interface DiffLineProps
  extends ComponentProps<"div">,
    VariantProps<typeof diffLine> {
  code: string;
}

export function DiffLine({ className, type, code, ...props }: DiffLineProps) {
  const prefix = type === "added" ? "+" : type === "removed" ? "-" : " ";
  
  return (
    <div
      className={cn(diffLine({ type }), className)}
      {...props}
    >
      <span className={cn(
        "shrink-0 select-none w-4",
        type === "added" ? "text-accent-green" : type === "removed" ? "text-accent-red" : "text-zinc-600"
      )}>
        {prefix}
      </span>
      <code className="flex-1 break-all whitespace-pre-wrap">
        {code}
      </code>
    </div>
  );
}
