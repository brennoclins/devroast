import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/utils/cn";

const button = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      primary: "bg-[#10B981] text-[#0A0A0A] hover:bg-[#10B981]/90",
      secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-800/80",
      outline: "border border-zinc-800 bg-transparent hover:bg-zinc-900",
      ghost: "hover:bg-zinc-800 hover:text-zinc-100",
      danger: "bg-red-500 text-white hover:bg-red-500/90",
    },
    size: {
      default: "h-11 px-6 py-[10px] text-[13px] font-mono",
      sm: "h-9 px-3 text-xs",
      lg: "h-12 px-8 text-base",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof button> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  );
}
