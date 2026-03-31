import { codeToHtml } from "shiki";
import type { RoastResult } from "./mock-data";

export interface RoastCodeProps {
  result: RoastResult;
}

export async function RoastCode({ result }: RoastCodeProps) {
  const html = await codeToHtml(result.code, {
    lang: result.language,
    theme: "vesper",
  });

  const lines = result.code.split("\n");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono font-bold text-accent-green">
          {"//"}
        </span>
        <span className="text-sm font-mono font-bold text-zinc-50">
          your_submission
        </span>
      </div>

      <div className="flex border border-border overflow-hidden bg-bg-input">
        <div className="flex flex-col items-end pr-3 pl-3 pt-4 pb-4 select-none text-zinc-600 font-mono text-xs leading-relaxed bg-[#0F0F0F] border-r border-border w-12 overflow-hidden">
          {lines.map((_, i) => {
            const num = i + 1;
            return <span key={`ln-${num}`}>{num}</span>;
          })}
        </div>
        <div
          className="flex-1 p-4 font-mono text-xs leading-relaxed overflow-x-auto [&>pre]:!bg-transparent [&>pre]:!p-0"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
