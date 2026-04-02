import { ScoreRing } from "@/components/ui/score-ring";
import type { RoastResult } from "./mock-data";

export interface RoastHeroProps {
  result: RoastResult;
}

function getScoreColor(score: number) {
  if (score >= 7.5) return "text-accent-green";
  if (score >= 5) return "text-accent-amber";
  return "text-accent-red";
}

export function RoastHero({ result }: RoastHeroProps) {
  const colorClass = getScoreColor(result.score);

  return (
    <div className="flex items-start gap-12">
      <ScoreRing score={result.score} size={180} />

      <div className="flex flex-col gap-4 flex-1">
        <div className={`flex items-center gap-2 ${colorClass}`}>
          <div
            className={`w-2 h-2 rounded-full ${colorClass.replace("text-", "bg-")}`}
          />
          <span className="text-sm font-mono font-medium">
            verdict: {result.verdict}
          </span>
        </div>

        <p className="text-zinc-50 font-mono text-xl leading-relaxed">
          "{result.quote}"
        </p>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-600">
          <span>lang: {result.language}</span>
          <span>·</span>
          <span>{result.lineCount} lines</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 border border-border rounded text-xs font-mono text-zinc-500 hover:text-zinc-400 hover:border-zinc-600 transition-colors"
          >
            share
          </button>
        </div>
      </div>
    </div>
  );
}
