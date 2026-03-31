import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export interface CodeEditorToolbarProps extends ComponentProps<"div"> {
  filename?: string;
  detectedLang?: string | null;
  children?: React.ReactNode;
}

function CodeEditorToolbar({
  className,
  filename,
  detectedLang,
  children,
  ...props
}: CodeEditorToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 border-b border-border bg-bg/50",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-widest">
          {filename ?? "new_file.js"}
        </span>
        {detectedLang && (
          <span className="text-[10px] font-mono text-accent-green/70 uppercase tracking-wider">
            {detectedLang}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

export { CodeEditorToolbar as Toolbar };
