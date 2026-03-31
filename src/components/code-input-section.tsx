"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as CodeEditor from "@/components/ui/code-editor";
import * as Switch from "@/components/ui/switch";

export function CodeInputSection() {
  const [roastMode, setRoastMode] = useState(true);
  const [code, setCode] = useState("");
  const [detectedLang, setDetectedLang] = useState("javascript");

  const handleCodeChange = (newCode: string, lang: string) => {
    setCode(newCode);
    setDetectedLang(lang);
  };

  return (
    <section className="w-full max-w-[780px] px-5 sm:px-0 flex flex-col gap-8">
      <div className="relative group">
        <div
          className={`absolute -inset-0.5 rounded-xl blur transition duration-1000 group-hover:duration-200 ${
            roastMode
              ? "bg-accent-green/20 opacity-30 group-hover:opacity-100"
              : "bg-border/20 opacity-0"
          }`}
        />
        <CodeEditor.Root
          roastMode={roastMode}
          onChange={handleCodeChange}
          className="relative w-full"
        />
      </div>

      <div className="flex items-center justify-between w-full">
        <Switch.Root
          defaultChecked={roastMode}
          onCheckedChange={(checked) => setRoastMode(checked)}
        >
          <Switch.Control />
          <Switch.Label>ROAST MODE</Switch.Label>
        </Switch.Root>
        <Button
          variant="primary"
          size="lg"
          className="px-8 shadow-xl shadow-accent-green/10"
        >
          $ roast_my_code
        </Button>
      </div>
    </section>
  );
}
