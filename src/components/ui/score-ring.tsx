import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export interface ScoreRingProps extends ComponentProps<"div"> {
  score: number; // 0 to 10
  size?: number;
}

/**
 * ScoreRing component that displays a numeric score (0-10) with a circular progress indicator.
 * Based on the Pencil design specifications.
 */
export function ScoreRing({
  score,
  size = 180,
  className,
  ...props
}: ScoreRingProps) {
  const radius = (size - 8) / 2; // Subtracting thickness (4px * 2)
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(10, score));
  const percentage = (clampedScore / 10) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  // Determine color based on score
  const getScoreColor = (s: number) => {
    if (s >= 7.5) return "text-accent-green";
    if (s >= 5) return "text-accent-amber";
    return "text-accent-red";
  };

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        {/* Background Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--color-border)"
          strokeWidth="4"
          className="transition-colors"
        />

        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-500 ease-out",
            getScoreColor(clampedScore),
          )}
        />
      </svg>

      {/* Score Text */}
      <div className="flex flex-col items-center justify-center font-mono leading-none">
        <span className="text-[48px] font-bold text-zinc-50 tracking-tighter">
          {clampedScore.toFixed(1)}
        </span>
        <span className="text-[16px] text-zinc-500">/10</span>
      </div>
    </div>
  );
}
