import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Card from "@/components/ui/card";
import * as CodeBlock from "@/components/ui/code-block";
import * as DiffLine from "@/components/ui/diff-line";
import { ScoreRing } from "@/components/ui/score-ring";
import * as Switch from "@/components/ui/switch";
import * as TableRow from "@/components/ui/table-row";

export default async function ComponentsPage() {
  const exampleCode = `function calculateTotal(items) {
  return items.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
}`;

  return (
    <div className="p-10 space-y-16 max-w-5xl mx-auto pb-32">
      <header>
        <h1 className="text-3xl font-bold mb-2 font-mono text-zinc-50 tracking-tight">
          <span className="text-emerald-500">//</span> component_library
        </h1>
        <p className="text-zinc-400 text-sm font-mono">
          Reusable UI components based on the Pencil design.
        </p>
      </header>

      <div className="space-y-16">
        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-sm font-bold font-mono text-zinc-50 uppercase tracking-widest flex items-center gap-2">
            <span className="text-emerald-500">//</span> buttons
          </h2>
          <div className="grid gap-8 p-6 rounded-xl border border-border bg-bg-input">
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">$ roast_my_code</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>
        </section>

        {/* Toggle */}
        <section className="space-y-6">
          <h2 className="text-sm font-bold font-mono text-zinc-50 uppercase tracking-widest flex items-center gap-2">
            <span className="text-emerald-500">//</span> toggle
          </h2>
          <div className="grid gap-8 p-6 rounded-xl border border-border bg-bg-input font-mono">
            <div className="flex flex-col gap-6">
              <Switch.Root defaultChecked>
                <Switch.Control />
                <Switch.Label>ROAST MODE (ON)</Switch.Label>
              </Switch.Root>
              <Switch.Root>
                <Switch.Control />
                <Switch.Label>ROAST MODE (OFF)</Switch.Label>
              </Switch.Root>
            </div>
          </div>
        </section>

        {/* Score Ring */}
        <section className="space-y-6">
          <h2 className="text-sm font-bold font-mono text-zinc-50 uppercase tracking-widest flex items-center gap-2">
            <span className="text-emerald-500">//</span> score_ring
          </h2>
          <div className="grid grid-cols-3 gap-8 p-8 rounded-xl border border-border bg-bg-input place-items-center">
            <ScoreRing score={2.1} />
            <ScoreRing score={6.5} />
            <ScoreRing score={9.8} />
          </div>
        </section>

        {/* Leaderboard Table Row */}
        <section className="space-y-6">
          <h2 className="text-sm font-bold font-mono text-zinc-50 uppercase tracking-widest flex items-center gap-2">
            <span className="text-emerald-500">//</span> table_row
          </h2>
          <div className="flex flex-col rounded-xl border border-border bg-bg-input overflow-hidden">
            <TableRow.Root>
              <TableRow.Rank>1</TableRow.Rank>
              <TableRow.Score value={9.8} />
              <TableRow.Code>
                {"const total = items.reduce((acc, i) => acc + i, 0);"}
              </TableRow.Code>
              <TableRow.Lang>typescript</TableRow.Lang>
            </TableRow.Root>
            <TableRow.Root>
              <TableRow.Rank>2</TableRow.Rank>
              <TableRow.Score value={7.2} />
              <TableRow.Code>
                {"let total = 0; items.forEach(i => total += i);"}
              </TableRow.Code>
              <TableRow.Lang>javascript</TableRow.Lang>
            </TableRow.Root>
            <TableRow.Root>
              <TableRow.Rank>3</TableRow.Rank>
              <TableRow.Score value={2.1} />
              <TableRow.Code>
                {
                  "var total = 0; for(var i=0; i<items.length; i++) { total = total + items[i]; }"
                }
              </TableRow.Code>
              <TableRow.Lang>javascript</TableRow.Lang>
            </TableRow.Root>
          </div>
        </section>

        {/* Diff Line */}
        <section className="space-y-6">
          <h2 className="text-sm font-bold font-mono text-zinc-50 uppercase tracking-widest flex items-center gap-2">
            <span className="text-emerald-500">//</span> diff_line
          </h2>
          <div className="flex flex-col rounded-xl border border-border bg-bg-input overflow-hidden">
            <DiffLine.Root type="context">
              <DiffLine.Prefix />
              <DiffLine.Content>
                {"function calculateTotal() {"}
              </DiffLine.Content>
            </DiffLine.Root>
            <DiffLine.Root type="removed">
              <DiffLine.Prefix />
              <DiffLine.Content>{"  var total = 0;"}</DiffLine.Content>
            </DiffLine.Root>
            <DiffLine.Root type="added">
              <DiffLine.Prefix />
              <DiffLine.Content>{"  const total = 0;"}</DiffLine.Content>
            </DiffLine.Root>
            <DiffLine.Root type="context">
              <DiffLine.Prefix />
              <DiffLine.Content>{"}"}</DiffLine.Content>
            </DiffLine.Root>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-6">
          <h2 className="text-sm font-bold font-mono text-zinc-50 uppercase tracking-widest flex items-center gap-2">
            <span className="text-emerald-500">//</span> badge_status
          </h2>
          <div className="grid gap-8 p-6 rounded-xl border border-border bg-bg-input">
            <div className="flex flex-wrap gap-4 items-center">
              <Badge variant="critical">Critical</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="good">Good</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
        </section>

        {/* Card */}
        <section className="space-y-6">
          <h2 className="text-sm font-bold font-mono text-zinc-50 uppercase tracking-widest flex items-center gap-2">
            <span className="text-emerald-500">//</span> cards
          </h2>
          <div className="grid gap-8 p-6 rounded-xl border border-border bg-bg-input">
            <Card.Root className="max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="warning">Optimization</Badge>
                <Badge variant="secondary">JS</Badge>
              </div>
              <Card.Title>using var instead of const/let</Card.Title>
              <Card.Description>
                the var keyword is function-scoped rather than block-scoped,
                which can lead to unexpected behavior and bugs. modern
                javascript uses const for immutable bindings and let for mutable
                ones.
              </Card.Description>
            </Card.Root>
          </div>
        </section>

        {/* Code Block */}
        <section className="space-y-6">
          <h2 className="text-sm font-bold font-mono text-zinc-50 uppercase tracking-widest flex items-center gap-2">
            <span className="text-emerald-500">//</span> code_block
          </h2>
          <div className="grid gap-8 p-6 rounded-xl border border-border bg-bg-input">
            <CodeBlock.Root>
              <CodeBlock.Header>calculate-total.js</CodeBlock.Header>
              <CodeBlock.Content lang="javascript" code={exampleCode} />
            </CodeBlock.Root>
          </div>
        </section>
      </div>
    </div>
  );
}
