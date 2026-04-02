import type { DiffLine } from "./mock-data";
import { RoastDiffLine } from "./roast-diff-line";

export interface RoastDiffProps {
  diff: DiffLine[];
}

export function RoastDiff({ diff }: RoastDiffProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono font-bold text-accent-green">
          {"//"}
        </span>
        <span className="text-sm font-mono font-bold text-zinc-50">
          suggested_fix
        </span>
      </div>

      <div className="flex flex-col border border-border overflow-hidden bg-bg-input">
        <div className="flex items-center h-10 px-4 border-b border-border">
          <span className="text-xs font-mono font-medium text-zinc-500">
            your_code.ts → improved_code.ts
          </span>
        </div>

        <div className="flex flex-col py-1">
          {diff.map((line, index) => (
            <RoastDiffLine
              key={`diff-${index}-${line.type}-${line.content.slice(0, 20)}`}
              line={line}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
