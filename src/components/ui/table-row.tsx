import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export interface TableRowProps extends ComponentProps<"div"> {
  rank: string | number;
  score: number;
  code: string;
  lang: string;
}

/**
 * TableRow component for the leaderboard.
 * Displays rank, score, code preview and language.
 */
export function TableRow({ rank, score, code, lang, className, ...props }: TableRowProps) {
  // Determine color based on score
  const getScoreColor = (s: number) => {
    if (s >= 7.5) return "text-accent-green";
    if (s >= 5) return "text-accent-amber";
    return "text-accent-red";
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-6 px-5 py-4 border-b border-border hover:bg-zinc-900/50 transition-colors bg-bg/20",
        className
      )}
      {...props}
    >
      {/* Rank Cell */}
      <div className="w-10 shrink-0 font-mono text-[13px] text-zinc-500 font-medium">
        #{rank}
      </div>

      {/* Score Cell */}
      <div className={cn(
        "w-[60px] shrink-0 font-mono text-[13px] font-bold",
        getScoreColor(score)
      )}>
        {score.toFixed(1)}
      </div>

      {/* Code Preview Cell */}
      <div className="flex-1 min-w-0 font-mono text-[12px] text-zinc-400 truncate">
        {code}
      </div>

      {/* Lang Cell */}
      <div className="w-[100px] shrink-0 font-mono text-[12px] text-zinc-500 text-right">
        {lang}
      </div>
    </div>
  );
}
