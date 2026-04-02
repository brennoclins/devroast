import { cn } from "@/utils/cn";
import type { DiffLine } from "./mock-data";

export interface RoastDiffLineProps {
  line: DiffLine;
}

const LINE_STYLES: Record<
  DiffLine["type"],
  { bg: string; text: string; prefix: string }
> = {
  context: {
    bg: "",
    text: "text-zinc-600",
    prefix: "  ",
  },
  removed: {
    bg: "bg-red-500/[0.08]",
    text: "text-red-500",
    prefix: "- ",
  },
  added: {
    bg: "bg-emerald-500/[0.08]",
    text: "text-emerald-500",
    prefix: "+ ",
  },
};

export function RoastDiffLine({ line }: RoastDiffLineProps) {
  const styles = LINE_STYLES[line.type];

  return (
    <div
      className={cn(
        "flex items-center h-7 px-4 font-mono text-xs",
        styles.bg,
        styles.text,
      )}
    >
      <span className="w-5 text-zinc-600 select-none shrink-0">
        {styles.prefix}
      </span>
      <span>{line.content}</span>
    </div>
  );
}
