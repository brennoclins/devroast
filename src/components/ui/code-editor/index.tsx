"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { detectLanguage } from "@/lib/language-detect";
import { cn } from "@/utils/cn";
import { Highlight } from "./editor-highlight";
import { LineNumbers } from "./editor-line-numbers";
import { type CodeEditorRootProps, Root } from "./editor-root";
import { Textarea } from "./editor-textarea";
import { Toolbar } from "./editor-toolbar";
import { LanguageSelector } from "./language-selector";

export interface CodeEditorProps
  extends Omit<CodeEditorRootProps, "children" | "onChange"> {
  defaultValue?: string;
  onChange?: (code: string, lang: string) => void;
}

function CodeEditor({
  defaultValue = "",
  onChange,
  roastMode = false,
  className,
  ...props
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultValue);
  const [selectedLang, setSelectedLang] = useState("auto");
  const [detectedLang, setDetectedLang] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const textareaRefRef = useRef<HTMLTextAreaElement>(null);

  const handleCodeChange = useCallback(
    (newValue: string) => {
      setCode(newValue);

      if (selectedLang === "auto") {
        const lang = detectLanguage(newValue);
        setDetectedLang(lang);
      }

      const effectiveLang =
        selectedLang === "auto" ? (detectedLang ?? "javascript") : selectedLang;
      onChange?.(newValue, effectiveLang);
    },
    [selectedLang, detectedLang, onChange],
  );

  const handleLangChange = useCallback((lang: string) => {
    setSelectedLang(lang);
  }, []);

  useEffect(() => {
    if (selectedLang === "auto" && code) {
      const lang = detectLanguage(code);
      setDetectedLang(lang);
    }
  }, [selectedLang, code]);

  const effectiveLang =
    selectedLang === "auto" ? (detectedLang ?? "javascript") : selectedLang;
  const lineCount = code ? code.split("\n").length : 1;

  const filename = roastMode ? "roast.js" : "new_file.js";
  const placeholder = roastMode
    ? "// go ahead, paste your worst..."
    : "// paste your garbage here...";

  const handleTextareaRef = useCallback((el: HTMLTextAreaElement | null) => {
    (textareaRefRef as any).current = el;
  }, []);

  const handleScroll = useCallback(() => {
    if (textareaRefRef.current) {
      const { scrollTop, scrollLeft } = textareaRefRef.current;
      if (highlightRef.current) {
        highlightRef.current.scrollTop = scrollTop;
        highlightRef.current.scrollLeft = scrollLeft;
      }
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = scrollTop;
      }
    }
  }, []);

  return (
    <Root roastMode={roastMode} className={className} {...props}>
      <Toolbar filename={filename} detectedLang={detectedLang}>
        <LanguageSelector value={selectedLang} onChange={handleLangChange} />
      </Toolbar>
      <div className="flex flex-1 overflow-hidden">
        <LineNumbers
          ref={lineNumbersRef}
          lineCount={lineCount}
          className="overflow-hidden"
        />
        <div className="relative flex-1 overflow-auto" ref={containerRef}>
          <Highlight
            ref={highlightRef}
            code={code}
            lang={effectiveLang}
            className="absolute inset-0 overflow-hidden"
          />
          <Textarea
            ref={handleTextareaRef}
            value={code}
            onChange={handleCodeChange}
            onScroll={handleScroll}
            roastMode={roastMode}
            placeholder={placeholder}
            className="absolute inset-0 z-10 overflow-hidden"
          />
        </div>
      </div>
    </Root>
  );
}

export {
  CodeEditor as Root,
  Textarea,
  Highlight,
  LineNumbers,
  Toolbar,
  LanguageSelector,
};
