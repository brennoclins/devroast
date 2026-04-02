import { CodeInputSection } from "@/components/code-input-section";
import { StatsSection } from "@/components/stats/stats-section";
import { Button } from "@/components/ui/button";
import * as TableRow from "@/components/ui/table-row";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full pb-20">
      <section className="flex flex-col items-center text-center gap-4 pt-20 pb-12 px-10">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-50 max-w-2xl">
          is your code good enough?
        </h1>
        <p className="text-zinc-500 font-mono text-lg uppercase tracking-tight">
          paste your code and let the AI judge your existence.
        </p>
      </section>

      <StatsSection />

      <CodeInputSection />

      <section className="mt-20 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-border" />
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
          scroll to see the hall of shame
        </span>
      </section>

      <section className="w-full max-w-[960px] px-10 mt-20 flex flex-col gap-10">
        <div className="flex flex-col gap-2 items-center text-center">
          <h2 className="text-sm font-bold font-mono text-zinc-50 uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="text-accent-green">{"//"}</span> top of the shame
          </h2>
          <p className="text-zinc-600 font-mono text-[11px] uppercase tracking-wider">
            the absolute worst pieces of code we&apos;ve seen lately
          </p>
        </div>

        <div className="flex flex-col rounded-xl border border-border bg-bg-input overflow-hidden shadow-xl">
          <TableRow.Root>
            <TableRow.Rank>1</TableRow.Rank>
            <TableRow.Score value={1.2} />
            <TableRow.Code>
              {
                "function check(a) { if (a == true) { return true } else { return false } }"
              }
            </TableRow.Code>
            <TableRow.Lang>javascript</TableRow.Lang>
          </TableRow.Root>
          <TableRow.Root>
            <TableRow.Rank>2</TableRow.Rank>
            <TableRow.Score value={2.4} />
            <TableRow.Code>
              {
                "const data = JSON.parse(JSON.stringify(oldData)); // deep clone"
              }
            </TableRow.Code>
            <TableRow.Lang>typescript</TableRow.Lang>
          </TableRow.Root>
          <TableRow.Root>
            <TableRow.Rank>3</TableRow.Rank>
            <TableRow.Score value={3.1} />
            <TableRow.Code>
              {
                "try { doSomething() } catch (e) { console.log('error happened') }"
              }
            </TableRow.Code>
            <TableRow.Lang>javascript</TableRow.Lang>
          </TableRow.Root>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            size="sm"
            className="font-mono text-[11px] uppercase tracking-widest"
          >
            view full leaderboard
          </Button>
        </div>
      </section>
    </div>
  );
}
