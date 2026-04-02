import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export interface CodeEditorTextareaProps
  extends Omit<ComponentProps<"textarea">, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onHeightChange?: (height: number) => void;
  roastMode?: boolean;
}

function CodeEditorTextarea({
  className,
  value,
  onChange,
  onHeightChange,
  roastMode = false,
  ...props
}: CodeEditorTextareaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const { selectionStart, selectionEnd, value } = textarea;

    if (e.key === "Tab") {
      e.preventDefault();
      const before = value.slice(0, selectionStart);
      const after = value.slice(selectionEnd);

      if (e.shiftKey) {
        const lineStart = before.lastIndexOf("\n") + 1;
        const linePrefix = before.slice(lineStart);
        if (linePrefix.startsWith("  ")) {
          const newValue =
            before.slice(0, lineStart) + before.slice(lineStart + 2) + after;
          onChange(newValue);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd =
              selectionStart - 2;
          }, 0);
        }
      } else {
        const newValue = before + "  " + after;
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart + 2;
        }, 0);
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const before = value.slice(0, selectionStart);
      const after = value.slice(selectionEnd);
      const currentLine = before.slice(before.lastIndexOf("\n") + 1);
      const indent = currentLine.match(/^\s*/)?.[0] ?? "";
      const lastChar = before.trimEnd().slice(-1);
      const extraIndent = ["{", "[", "(", ":", ">"].includes(lastChar)
        ? "  "
        : "";
      const newValue = before + "\n" + indent + extraIndent + after;
      onChange(newValue);
      setTimeout(() => {
        const newPos = selectionStart + 1 + indent.length + extraIndent.length;
        textarea.selectionStart = textarea.selectionEnd = newPos;
      }, 0);
      return;
    }

    if (e.key === "}") {
      const after = value.slice(selectionEnd);
      const trimmedAfter = after.trimStart();
      if (trimmedAfter.startsWith("}") || trimmedAfter === "") {
        e.preventDefault();
        const before = value.slice(0, selectionStart);
        const currentLine = before.slice(before.lastIndexOf("\n") + 1);
        const currentIndent = currentLine.match(/^\s*/)?.[0] ?? "";
        if (currentIndent.length >= 2) {
          const newValue = before.slice(0, before.length - 2) + "}" + after;
          onChange(newValue);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd =
              selectionStart - 2 + 1;
          }, 0);
          return;
        }
      }
    }
  };

  return (
    <textarea
      className={cn(
        "flex-1 w-full bg-transparent p-4 font-mono text-[13px] leading-relaxed outline-none resize-none placeholder:text-zinc-800",
        "text-transparent caret-zinc-400",
        roastMode && "caret-accent-green",
        className,
      )}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      spellCheck={false}
      {...props}
    />
  );
}

export { CodeEditorTextarea as Textarea };
