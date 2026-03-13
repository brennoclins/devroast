import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/utils/cn";

const card = tv({
  base: "rounded-lg border border-zinc-800 bg-zinc-950/50 p-5 space-y-3",
  variants: {
    variant: {
      default: "bg-zinc-950",
      bordered: "border-zinc-800",
      elevated: "shadow-lg bg-zinc-900",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends ComponentProps<"div">,
    VariantProps<typeof card> {}

export function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      className={cn(card({ variant }), className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-sm font-mono font-medium text-zinc-50", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("text-xs font-mono text-zinc-400 leading-relaxed", className)}
      {...props}
    />
  );
}
