import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Highlighter | null = null;
let initPromise: Promise<Highlighter> | null = null;

export async function getHighlighter() {
  if (highlighter) return highlighter;

  if (!initPromise) {
    initPromise = createHighlighter({
      themes: ["vesper"],
      langs: ["javascript"],
    }).then((h) => {
      highlighter = h;
      return h;
    });
  }

  return initPromise;
}

export async function loadLanguage(lang: string) {
  const h = await getHighlighter();
  if (!h.getLoadedLanguages().includes(lang)) {
    await h.loadLanguage(lang as any);
  }
}
