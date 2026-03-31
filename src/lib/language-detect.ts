import hljs from "highlight.js";

const SUPPORTED_LANGS = [
  "javascript",
  "typescript",
  "tsx",
  "python",
  "java",
  "csharp",
  "go",
  "rust",
  "php",
  "ruby",
  "swift",
  "kotlin",
  "css",
  "html",
  "sql",
  "bash",
  "json",
  "yaml",
  "markdown",
];

export function detectLanguage(code: string): string | null {
  if (!code.trim()) return null;
  const result = hljs.highlightAuto(code, SUPPORTED_LANGS);
  return result.language ?? null;
}
