import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/utils/cn";

const badge = tv({
  base: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono font-medium transition-colors",
  variants: {
    variant: {
      critical: "bg-red-500/10 text-red-500 border border-red-500/20",
      warning: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
      good: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
      outline: "text-zinc-400 border border-zinc-800",
      secondary: "bg-zinc-800 text-zinc-300",
    },
  },
  defaultVariants: {
    variant: "good",
  },
});

export interface BadgeProps
  extends ComponentProps<"span">,
    VariantProps<typeof badge> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badge({ variant }), className)}
      {...props}
    />
  );
}
