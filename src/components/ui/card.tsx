import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/utils/cn";

const card = tv({
  base: "rounded-lg border border-border bg-bg-input p-5 space-y-3",
  variants: {
    variant: {
      default: "bg-bg-input",
      bordered: "border-border",
      elevated: "shadow-lg bg-zinc-900",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardRootProps
  extends ComponentProps<"div">,
    VariantProps<typeof card> {}

function CardRoot({ className, variant, ...props }: CardRootProps) {
  return <div className={cn(card({ variant }), className)} {...props} />;
}

function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-sm font-mono font-medium text-zinc-50", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-xs font-mono text-zinc-400 leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export {
  CardRoot as Root,
  CardTitle as Title,
  CardDescription as Description,
};
