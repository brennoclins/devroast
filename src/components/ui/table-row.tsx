import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export interface TableRowRootProps extends ComponentProps<"div"> {}

function TableRowRoot({ className, children, ...props }: TableRowRootProps) {
  return (
    <div
      className={cn(
        "group flex items-center gap-6 px-5 py-4 border-b border-border hover:bg-zinc-900/50 transition-colors bg-bg/20",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function TableRowRank({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-10 shrink-0 font-mono text-[13px] text-zinc-500 font-medium",
        className,
      )}
      {...props}
    >
      #{children}
    </div>
  );
}

export interface TableRowScoreProps extends ComponentProps<"div"> {
  value: number;
}

function TableRowScore({ value, className, ...props }: TableRowScoreProps) {
  const getScoreColor = (s: number) => {
    if (s >= 7.5) return "text-accent-green";
    if (s >= 5) return "text-accent-amber";
    return "text-accent-red";
  };

  return (
    <div
      className={cn(
        "w-[60px] shrink-0 font-mono text-[13px] font-bold",
        getScoreColor(value),
        className,
      )}
      {...props}
    >
      {value.toFixed(1)}
    </div>
  );
}

function TableRowCode({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex-1 min-w-0 font-mono text-[12px] text-zinc-400 truncate",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function TableRowLang({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-[100px] shrink-0 font-mono text-[12px] text-zinc-500 text-right",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  TableRowRoot as Root,
  TableRowRank as Rank,
  TableRowScore as Score,
  TableRowCode as Code,
  TableRowLang as Lang,
};
