"use client";
import React, { type ComponentProps } from "react";
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

type DiffType = VariantProps<typeof diffLine>["type"];

const DiffLineContext = React.createContext<{ type?: DiffType } | null>(null);

function useDiffLineContext() {
  return React.useContext(DiffLineContext) || { type: "context" };
}

export interface DiffLineRootProps
  extends ComponentProps<"div">,
    VariantProps<typeof diffLine> {}

function DiffLineRoot({
  className,
  type,
  children,
  ...props
}: DiffLineRootProps) {
  return (
    <DiffLineContext.Provider value={{ type }}>
      <div className={cn(diffLine({ type }), className)} {...props}>
        {children}
      </div>
    </DiffLineContext.Provider>
  );
}

export interface DiffLinePrefixProps extends ComponentProps<"span"> {
  prefix?: string;
}

function DiffLinePrefix({
  className,
  prefix,
  children,
  ...props
}: DiffLinePrefixProps) {
  const { type } = useDiffLineContext();
  const defaultPrefix = type === "added" ? "+" : type === "removed" ? "-" : " ";

  return (
    <span
      className={cn(
        "shrink-0 select-none w-4",
        type === "added"
          ? "text-accent-green"
          : type === "removed"
            ? "text-accent-red"
            : "text-zinc-600",
        className,
      )}
      {...props}
    >
      {children ?? prefix ?? defaultPrefix}
    </span>
  );
}

export interface DiffLineContentProps extends ComponentProps<"code"> {}

function DiffLineContent({
  className,
  children,
  ...props
}: DiffLineContentProps) {
  return (
    <code
      className={cn("flex-1 break-all whitespace-pre-wrap", className)}
      {...props}
    >
      {children}
    </code>
  );
}

export {
  DiffLineRoot as Root,
  DiffLinePrefix as Prefix,
  DiffLineContent as Content,
};
