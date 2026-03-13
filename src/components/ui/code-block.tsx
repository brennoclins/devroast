import { codeToHtml } from "shiki";
import { cn } from "@/utils/cn";

interface CodeBlockProps {
  code: string;
  lang?: string;
  className?: string;
  filename?: string;
}

/**
 * Server Component that renders syntax highlighted code using Shiki.
 */
export async function CodeBlock({ 
  code, 
  lang = "javascript", 
  className,
  filename 
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "vesper",
  });

  return (
    <div className={cn("flex flex-col rounded-lg border border-zinc-800 bg-[#101010] overflow-hidden", className)}>
      {filename && (
        <div className="flex items-center px-4 py-2 border-b border-zinc-800 bg-[#0C0C0C]">
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
            {filename}
          </span>
        </div>
      )}
      <div 
        className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono [&>pre]:!bg-transparent [&>pre]:!p-0"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for syntax highlighting
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    </div>
  );
}
