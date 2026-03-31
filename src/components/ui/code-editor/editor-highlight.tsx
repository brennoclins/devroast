import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import { getHighlighter, loadLanguage } from "@/lib/highlighter";
import { cn } from "@/utils/cn";

export interface CodeEditorHighlightProps
  extends Omit<ComponentProps<"div">, "children"> {
  code: string;
  lang: string;
}

function CodeEditorHighlight({
  className,
  code,
  lang,
  ...props
}: CodeEditorHighlightProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      const highlighter = await getHighlighter();
      if (lang && lang !== "auto") {
        await loadLanguage(lang);
      }
      if (!cancelled) {
        const resolvedLang = lang === "auto" ? "javascript" : lang;
        const result = highlighter.codeToHtml(code, {
          lang: resolvedLang,
          theme: "vesper",
        });
        setHtml(result);
      }
    }

    highlight();
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return (
    <div
      className={cn(
        "flex-1 p-4 font-mono text-[13px] leading-relaxed overflow-x-auto pointer-events-none",
        "[&>pre]:!bg-transparent [&>pre]:!p-0",
        className,
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
}

export { CodeEditorHighlight as Highlight };
