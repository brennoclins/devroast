import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

const LANGUAGES = [
  { id: "auto", name: "Auto-Detect" },
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "tsx", name: "TSX" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "csharp", name: "C#" },
  { id: "go", name: "Go" },
  { id: "rust", name: "Rust" },
  { id: "php", name: "PHP" },
  { id: "ruby", name: "Ruby" },
  { id: "swift", name: "Swift" },
  { id: "kotlin", name: "Kotlin" },
  { id: "css", name: "CSS" },
  { id: "html", name: "HTML" },
  { id: "sql", name: "SQL" },
  { id: "bash", name: "Bash" },
  { id: "json", name: "JSON" },
  { id: "yaml", name: "YAML" },
  { id: "markdown", name: "Markdown" },
];

export interface LanguageSelectorProps
  extends Omit<ComponentProps<"select">, "onChange"> {
  value: string;
  onChange: (lang: string) => void;
}

function LanguageSelector({
  className,
  value,
  onChange,
  ...props
}: LanguageSelectorProps) {
  return (
    <select
      className={cn(
        "appearance-none bg-bg-input border border-border rounded px-2 py-1 text-xs font-mono text-zinc-400 cursor-pointer outline-none focus:border-accent-green transition-colors",
        className,
      )}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}

export { LanguageSelector };
