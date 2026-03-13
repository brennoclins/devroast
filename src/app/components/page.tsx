import { Button } from "@/components/ui/button";

export default function ComponentsPage() {
  return (
    <div className="p-10 space-y-12">
      <section>
        <h1 className="text-3xl font-bold mb-8">Component Library</h1>
        
        <div className="space-y-8">
          <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Button</h2>
          
          <div className="grid gap-8">
            {/* Variants */}
            <div className="space-y-4">
              <h3 className="text-sm text-zinc-400 uppercase tracking-wider">Variants</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">$ roast_my_code</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <h3 className="text-sm text-zinc-400 uppercase tracking-wider">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <span>+</span>
                </Button>
              </div>
            </div>

            {/* States */}
            <div className="space-y-4">
              <h3 className="text-sm text-zinc-400 uppercase tracking-wider">States</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>Disabled Outline</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
