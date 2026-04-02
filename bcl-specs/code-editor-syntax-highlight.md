# Code Editor com Syntax Highlight — Especificação

## 📋 Contexto

O DevRoast precisa de um editor de código com syntax highlighting em tempo real na homepage. O usuário cola código e as cores são aplicadas automaticamente conforme a linguagem detectada, com opção de seleção manual.

---

## 🔍 Pesquisa: Abordagens de Editor

### 1. ray-so (Selecionada)
**Fonte:** [github.com/raycast/ray-so](https://github.com/raycast/ray-so)

**Arquitetura:**
- **Input:** `<textarea>` com `-webkit-text-fill-color: transparent`
- **Highlight:** Shiki renderiza HTML por baixo, alinhado via CSS Grid stack
- **Detecção:** `highlight.js` (`highlightAuto`) — separado do Shiki
- **Auto-indent:** Handlers customizados de Tab, Enter, `}` no textarea
- **State:** Jotai atoms com persistência em URL hash
- **Grammars:** Lazy-loaded via `dynamic import()` de `shiki/langs/*.mjs`

**Prós:** Ultra leve, zero dependências extras de editor, Shiki já está instalado, fácil customização
**Contras:** Sem IntelliSense, sem minimap, requer cuidado com alinhamento de scroll

---

### 2. CodeMirror 6
**Prós:** Editor completo, line numbers, undo/redo, autocomplete, extensível
**Contras:** ~50kb+ bundle, curva de aprendizado para customizar tema, overkill para o caso de uso

---

### 3. Monaco Editor (VS Code engine)
**Prós:** IntelliSense, minimap, multi-cursor, debug
**Contras:** ~3MB+ bundle, pesado demais, complexo de integrar com SSR

---

### 4. Shiki + Preview Estático (sem overlay)
**Prós:** Mais simples, sem truques de CSS
**Contras:** Sem experiência "live" — highlight só aparece após colar/perder foco

---

## ✅ Decisão: Abordagem ray-so

A abordagem do ray-so é a mais adequada para o DevRoast:
- Shiki **já está instalado** (v4.0.2)
- Stack atual (Next.js 16, React 19, Tailwind v4) é compatível
- Caso de uso é **colar código → ver highlight → enviar para análise**
- Sem necessidade de features avançadas de IDE

---

## 📐 Arquitetura Proposta

### Stack

| Camada | Tecnologia |
|---|---|
| Input | `<textarea>` com texto transparente |
| Highlight | Shiki v4 (`getHighlighterCore` + WASM) |
| Detecção | `highlight.js` (`highlightAuto`) |
| State | React `useState` + `useCallback` (sem libs extras) |
| Estilos | Tailwind CSS v4 |
| Line Numbers | Coluna separada à esquerda (estilo VS Code) |
| Auto-resize | `scrollHeight` measurement |
| Language Selector | `<select>` nativo estilizado |

### Estrutura de Arquivos

```
src/
├── components/ui/
│   └── code-editor/
│       ├── index.tsx              # Namespace export (Client Component)
│       ├── editor-root.tsx        # Container CSS Grid stack + border/glow
│       ├── editor-textarea.tsx    # Input layer (transparente, auto-indent)
│       ├── editor-highlight.tsx   # Shiki output layer
│       ├── editor-line-numbers.tsx # Line numbers column (VS Code style)
│       ├── editor-toolbar.tsx     # Filename + language selector
│       └── language-selector.tsx  # <select> nativo estilizado
├── lib/
│   ├── highlighter.ts             # Singleton Shiki (getHighlighterCore)
│   └── language-detect.ts         # Wrapper highlight.js
└── app/page.tsx                   # Atualizado com novo editor
```

### Fluxo de Dados

```
Usuário cola código no textarea
        ↓
onChange dispara:
  1. highlight.js detecta linguagem automaticamente
  2. Shiki gera HTML com cores (via highlighter instance)
  3. Highlight layer é atualizada com dangerouslySetInnerHTML
  4. Line numbers são recalculadas (count de linhas)
  5. Auto-resize via scrollHeight
        ↓
Se usuário selecionar linguagem manualmente:
  - Override da detecção automática
  - Opção "Auto-Detect" para voltar ao modo automático
```

### Linguagens Suportadas (19)

| Linguagem | Shiki Lang ID |
|---|---|
| JavaScript | `javascript` / `js` |
| TypeScript | `typescript` / `ts` |
| TypeScript JSX | `tsx` |
| Python | `python` |
| Java | `java` |
| C# | `csharp` |
| Go | `go` |
| Rust | `rust` |
| PHP | `php` |
| Ruby | `ruby` |
| Swift | `swift` |
| Kotlin | `kotlin` |
| CSS | `css` |
| HTML | `html` |
| SQL | `sql` |
| Shell/Bash | `bash` / `shell` |
| JSON | `json` |
| YAML | `yaml` |
| Markdown | `markdown` |

Grammars carregadas via lazy import (`shiki/langs/*.mjs`).

---

## 🎨 Design

### Visual Base

| Token | Valor |
|---|---|
| Fundo | `--color-bg-input` (#111111) |
| Border (OFF) | `--color-border` (#2A2A2A) |
| Fonte | JetBrains Mono (já configurada) |
| Tamanho | 13px, line-height reláxavel |
| Shiki Theme | `vesper` (mantido, igual ao code-block) |
| Altura | Auto-resize com conteúdo (scrollHeight) |
| Persistência | Apenas em memória (por enquanto) |

### ROAST MODE — Diferenças Visuais

O ROAST MODE transforma o editor de "neutro" para "agressivo". A sintaxe (`vesper`) permanece a mesma, mas toda a chrome ao redor muda.

| Elemento | OFF (Normal) | ON (Roast) |
|---|---|---|
| Border | `border-border` (#2A2A2A) | `border-accent-green` (#10B981) |
| Glow/Shadow | `shadow-accent-green/10` sutil | `shadow-accent-green/25` intenso |
| Caret (cursor) | `#a1a1aa` (zinc-400) | `#10B981` (verde) |
| Window dots | Padrão | Brilho intensificado |
| Filename | `new_file.js` | `roast.js` |
| Placeholder | `// paste your garbage here...` | `// go ahead, paste your worst...` |
| Shiki theme | `vesper` | `vesper` (mantido) |

### Micro-interações (Roast ON)

- **Hover no editor:** Glow verde pulsa suavemente
- **Focus no textarea:** Border verde fica mais brilhante
- **Linguagem detectada:** Badge com cor accent no toolbar

### Implementação do ROAST MODE

O estado do ROAST MODE é elevado (lifted) para a `page.tsx` e passado como prop para o editor:

```tsx
// page.tsx
const [roastMode, setRoastMode] = useState(true);

<CodeEditor.Root roastMode={roastMode}>
  <CodeEditor.Toolbar />
  <CodeEditor.Textarea />
  <CodeEditor.Highlight />
</CodeEditor.Root>
```

Border/glow condicional via `cn()`:

```tsx
<div className={cn(
  "rounded-xl border transition-colors duration-300",
  roastMode
    ? "border-accent-green shadow-2xl shadow-accent-green/25"
    : "border-border shadow-2xl shadow-transparent"
)}>
```

Caret controlado via CSS inline:

```tsx
<textarea style={{ caretColor: roastMode ? "#10B981" : "#a1a1aa" }} />
```

---

## 📝 Notas Técnicas

### CSS Grid Stack Pattern

```css
.editor {
  display: grid;
  grid-template: auto / 1fr;
}
.textarea, .highlight, .editor::after {
  grid-area: 1 / 1 / 2 / 2;
}
.textarea {
  z-index: 2;
  color: transparent;
  caret-color: #fff;
  -webkit-text-fill-color: transparent;
}
.highlight {
  z-index: 0;
  pointer-events: none;
}
```

### Auto-Resize via scrollHeight

```tsx
const textareaRef = useRef<HTMLTextAreaElement>(null);

const handleResize = () => {
  const el = textareaRef.current;
  if (el) {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }
};

// Chamar no onChange e no mount
```

### Line Numbers (VS Code Style)

Coluna separada à esquerda do conteúdo, com fundo levemente diferente:

```tsx
function LineNumbers({ lineCount }: { lineCount: number }) {
  return (
    <div className="flex flex-col items-end pr-3 select-none text-zinc-600 font-mono text-[13px] leading-relaxed bg-bg/30">
      {Array.from({ length: lineCount }, (_, i) => (
        <span key={i + 1}>{i + 1}</span>
      ))}
    </div>
  );
}
```

- Mesma altura de linha (`leading-relaxed` = `line-height` do textarea)
- Mesma fonte (`font-mono` = JetBrains Mono)
- Padding vertical idêntico ao textarea para alinhamento perfeito

### Language Selector (`<select>` nativo)

```tsx
<select
  value={selectedLang}
  onChange={(e) => onLangChange(e.target.value)}
  className="appearance-none bg-bg-input border border-border rounded px-2 py-1 text-xs font-mono text-zinc-400 cursor-pointer outline-none focus:border-accent-green"
>
  <option value="auto">Auto-Detect</option>
  {languages.map((lang) => (
    <option key={lang.id} value={lang.id}>{lang.name}</option>
  ))}
</select>
```

### Shiki v4 API (getHighlighterCore)

```ts
import { getHighlighterCore } from "shiki";
import getWasm from "shiki/wasm";

const highlighter = await getHighlighterCore({
  themes: [import("shiki/themes/vesper.mjs")],
  langs: [import("shiki/langs/javascript.mjs")],
  loadWasm: getWasm,
});
```

### highlight.js Auto-Detect

```ts
import hljs from "highlight.js";
const result = hljs.highlightAuto(code, languageNames);
const detected = result.language; // "javascript", "python", etc.
```

### Auto-Indent Handlers

- **Tab** → insere 2 espaços
- **Shift+Tab** → remove indentação
- **Enter** → nova linha + mantém indentação (extra após `{[(:>`)
- **`}`** → smart dedent

---

## ✅ TODOs

### Fase 1 — Setup e Core
- [ ] 1.1. Instalar `highlight.js` (`pnpm add highlight.js`)
- [ ] 1.2. Criar `src/lib/highlighter.ts` — inicialização singleton do Shiki com `getHighlighterCore`
- [ ] 1.3. Criar `src/lib/language-detect.ts` — wrapper de `highlight.js` auto-detect
- [ ] 1.4. Definir mapa de linguagens suportadas com lazy imports

### Fase 2 — Componentes do Editor
- [ ] 2.1. Criar `src/components/ui/code-editor/editor-root.tsx` — container com CSS Grid stack, border/glow condicional (roastMode)
- [ ] 2.2. Criar `src/components/ui/code-editor/editor-textarea.tsx` — input layer com texto transparente, auto-indent, caret condicional, auto-resize via scrollHeight
- [ ] 2.3. Criar `src/components/ui/code-editor/editor-highlight.tsx` — highlight layer com Shiki
- [ ] 2.4. Criar `src/components/ui/code-editor/editor-line-numbers.tsx` — coluna de line numbers estilo VS Code
- [ ] 2.5. Criar `src/components/ui/code-editor/editor-toolbar.tsx` — toolbar com filename condicional + language selector
- [ ] 2.6. Criar `src/components/ui/code-editor/language-selector.tsx` — `<select>` nativo estilizado com opção "Auto-Detect"
- [ ] 2.7. Criar `src/components/ui/code-editor/index.tsx` — export namespace (Client Component)

### Fase 3 — Integração
- [ ] 3.1. Atualizar `src/app/page.tsx` para usar o novo `<CodeEditor>` no lugar do `<textarea>` cru
- [ ] 3.2. Conectar detecção automática de linguagem ao estado do editor
- [ ] 3.3. Conectar seleção manual de linguagem (override)
- [ ] 3.4. Conectar ROAST MODE ao visual do editor (border, glow, caret, placeholder, filename)

### Fase 4 — Polimento
- [ ] 4.1. Implementar auto-indent (Tab, Enter, `}`)
- [ ] 4.2. Adicionar sincronização de scroll entre textarea e highlight layer
- [ ] 4.3. Garantir que o editor funcione corretamente com SSR (NoSSR wrapper se necessário)
- [ ] 4.4. Rodar `pnpm check` (Biome) para lint/format
- [ ] 4.5. Testar com snippets de diferentes linguagens

---

## ⚠️ Pontos de Atenção

1. **Shiki v4 API:** `getHighlighterCore` + WASM é diferente da v1 usada no ray-so — verificar sintaxe de imports de themes/langs
2. **Line numbers:** Coluna separada à esquerda (VS Code style) com `line-height`, fonte e padding idênticos ao textarea para alinhamento perfeito
3. **Auto-resize:** Via `scrollHeight` — reset para `auto` antes de medir para evitar shrink bugs
4. **Scroll sync:** Se o conteúdo ultrapassar a altura, textarea e highlight precisam scrollar juntos
5. **SSR:** Shiki WASM é client-side → pode precisar de `NoSSR` ou loading state
6. **Convenções do projeto:** Named exports apenas, `ComponentProps<"element">`, `cn()` para classes, `tv({})` para variantes
