import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { DiffLine } from "@/components/ui/diff-line";

export default async function ComponentsPage() {
  const exampleCode = `function calculateTotal(items) {
  return items.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
}`;

  return (
    <div className="p-10 space-y-16 max-w-5xl mx-auto">
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
          <div className="grid gap-8 p-6 rounded-xl border border-border-primary bg-bg-input">
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
          <div className="grid gap-8 p-6 rounded-xl border border-border-primary bg-bg-input font-mono">
            <div className="flex flex-col gap-6">
              <Switch defaultChecked label="ROAST MODE (ON)" />
              <Switch label="ROAST MODE (OFF)" />
            </div>
          </div>
        </section>

        {/* Diff Line */}
        <section className="space-y-6">
          <h2 className="text-sm font-bold font-mono text-zinc-50 uppercase tracking-widest flex items-center gap-2">
            <span className="text-emerald-500">//</span> diff_line
          </h2>
          <div className="flex flex-col rounded-xl border border-border-primary bg-bg-input overflow-hidden">
            <DiffLine type="context" code="function calculateTotal() {" />
            <DiffLine type="removed" code="  var total = 0;" />
            <DiffLine type="added" code="  const total = 0;" />
            <DiffLine type="context" code="}" />
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-6">
          <h2 className="text-sm font-bold font-mono text-zinc-50 uppercase tracking-widest flex items-center gap-2">
            <span className="text-emerald-500">//</span> badge_status
          </h2>
          <div className="grid gap-8 p-6 rounded-xl border border-border-primary bg-bg-input">
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
          <div className="grid gap-8 p-6 rounded-xl border border-border-primary bg-bg-input">
            <Card className="max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="warning">Optimization</Badge>
                <Badge variant="secondary">JS</Badge>
              </div>
              <CardTitle>using var instead of const/let</CardTitle>
              <CardDescription>
                the var keyword is function-scoped rather than block-scoped, which can lead to unexpected behavior and bugs. modern javascript uses const for immutable bindings and let for mutable ones.
              </CardDescription>
            </Card>
          </div>
        </section>

        {/* Code Block */}
        <section className="space-y-6">
          <h2 className="text-sm font-bold font-mono text-zinc-50 uppercase tracking-widest flex items-center gap-2">
            <span className="text-emerald-500">//</span> code_block
          </h2>
          <div className="grid gap-8 p-6 rounded-xl border border-border-primary bg-bg-input">
            <CodeBlock 
              code={exampleCode} 
              lang="javascript" 
              filename="calculate-total.js" 
            />
          </div>
        </section>
      </div>
    </div>
  );
}
