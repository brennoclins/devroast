import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TableRow } from "@/components/ui/table-row";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full pb-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-4 pt-20 pb-12 px-10">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-50 max-w-2xl">
          is your code good enough?
        </h1>
        <p className="text-zinc-500 font-mono text-lg uppercase tracking-tight">
          paste your code and let the AI judge your existence.
        </p>
      </section>

      {/* Code Input Section */}
      <section className="w-full max-w-[780px] px-5 sm:px-0 flex flex-col gap-8">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-accent-green/20 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex flex-col w-full h-[360px] rounded-xl border border-border bg-bg-input overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-widest ml-2">
                new_file.js
              </span>
            </div>
            <textarea
              className="flex-1 w-full bg-transparent p-6 font-mono text-sm text-zinc-400 outline-none resize-none placeholder:text-zinc-800"
              placeholder="// paste your garbage here..."
              spellCheck={false}
            />
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between w-full">
          <Switch label="ROAST MODE" defaultChecked />
          <Button variant="primary" size="lg" className="px-8 shadow-xl shadow-accent-green/10">
            $ roast_my_code
          </Button>
        </div>
      </section>

      {/* Footer Hint */}
      <section className="mt-20 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-border" />
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
          scroll to see the hall of shame
        </span>
      </section>

      {/* Leaderboard Preview */}
      <section className="w-full max-w-[960px] px-10 mt-20 flex flex-col gap-10">
        <div className="flex flex-col gap-2 items-center text-center">
          <h2 className="text-sm font-bold font-mono text-zinc-50 uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="text-accent-green">//</span> top of the shame
          </h2>
          <p className="text-zinc-600 font-mono text-[11px] uppercase tracking-wider">
            the absolute worst pieces of code we've seen lately
          </p>
        </div>

        <div className="flex flex-col rounded-xl border border-border bg-bg-input overflow-hidden shadow-xl">
          <TableRow
            rank={1}
            score={1.2}
            code="function check(a) { if (a == true) { return true } else { return false } }"
            lang="javascript"
          />
          <TableRow
            rank={2}
            score={2.4}
            code="const data = JSON.parse(JSON.stringify(oldData)); // deep clone"
            lang="typescript"
          />
          <TableRow
            rank={3}
            score={3.1}
            code="try { doSomething() } catch (e) { console.log('error happened') }"
            lang="javascript"
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="outline" size="sm" className="font-mono text-[11px] uppercase tracking-widest">
            view full leaderboard
          </Button>
        </div>
      </section>
    </div>
  );
}
