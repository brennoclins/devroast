import { codeToHtml } from "shiki";
import { cn } from "@/utils/cn";

export interface LeaderboardEntryProps {
  rank: number;
  score: number;
  language: string;
  lineCount: number;
  code: string;
}

export async function LeaderboardEntry({
  rank,
  score,
  language,
  lineCount,
  code,
}: LeaderboardEntryProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "vesper",
  });

  const lines = code.split("\n");

  return (
    <div className="flex flex-col border border-border overflow-hidden">
      <div className="flex items-center justify-between h-12 px-5 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-mono text-zinc-600">#</span>
            <span className="text-sm font-bold font-mono text-amber-500">
              {rank}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-zinc-600">score:</span>
            <span className="text-sm font-bold font-mono text-red-500">
              {score}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-500">{language}</span>
          <span className="text-xs font-mono text-zinc-600">
            {lineCount} lines
          </span>
        </div>
      </div>
      <div className="flex h-[120px]">
        <div className="flex flex-col items-end pr-3 pl-3 pt-3.5 pb-3.5 select-none text-zinc-600 font-mono text-xs leading-relaxed bg-[#0F0F0F] border-r border-border w-10 overflow-hidden">
          {lines.map((_, i) => {
            const num = i + 1;
            return <span key={`ln-${rank}-${num}`}>{num}</span>;
          })}
        </div>
        <div
          className={cn(
            "flex-1 p-3.5 overflow-x-auto font-mono text-xs leading-relaxed [&>pre]:!bg-transparent [&>pre]:!p-0",
          )}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
