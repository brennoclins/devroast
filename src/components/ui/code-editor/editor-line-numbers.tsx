import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export interface CodeEditorLineNumbersProps extends ComponentProps<"div"> {
  lineCount: number;
}

function CodeEditorLineNumbers({
  className,
  lineCount,
  ...props
}: CodeEditorLineNumbersProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-end pr-3 pl-3 pt-4 pb-4 select-none text-zinc-600 font-mono text-[13px] leading-relaxed bg-bg/30",
        className,
      )}
      {...props}
    >
      {Array.from({ length: lineCount }, (_, i) => {
        const num = i + 1;
        return <span key={`line-${num}`}>{num}</span>;
      })}
    </div>
  );
}

export { CodeEditorLineNumbers as LineNumbers };
