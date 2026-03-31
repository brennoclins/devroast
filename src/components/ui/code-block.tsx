import type { ComponentProps } from "react";
import { codeToHtml } from "shiki";
import { cn } from "@/utils/cn";

export interface CodeBlockRootProps extends ComponentProps<"div"> {}

function CodeBlockRoot({ className, children, ...props }: CodeBlockRootProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-border bg-bg-input overflow-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CodeBlockHeader({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  if (!children) return null;
  return (
    <div
      className={cn(
        "flex items-center px-4 py-2 border-b border-border bg-bg/50",
        className,
      )}
      {...props}
    >
      <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
        {children}
      </span>
    </div>
  );
}

export interface CodeBlockContentProps
  extends Omit<ComponentProps<"div">, "children"> {
  lang?: string;
  code?: string;
  children?: React.ReactNode;
}

async function CodeBlockContent({
  lang = "javascript",
  code,
  children,
  className,
  ...props
}: CodeBlockContentProps) {
  // Prefer explicit code prop, then string children
  const contentToHighlight =
    code ?? (typeof children === "string" ? children : String(children ?? ""));

  const html = await codeToHtml(contentToHighlight, {
    lang,
    theme: "vesper",
  });

  return (
    <div
      className={cn(
        "p-4 overflow-x-auto text-[13px] leading-relaxed font-mono [&>pre]:!bg-transparent [&>pre]:!p-0",
        className,
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for syntax highlighting
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
}

export {
  CodeBlockRoot as Root,
  CodeBlockHeader as Header,
  CodeBlockContent as Content,
};
