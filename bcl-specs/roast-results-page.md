# Roast Results Page — Especificação

## 📋 Contexto

Página de resultados que exibe a análise completa de um código submetido, incluindo score, roast quote, código original, issues detalhadas e sugestão de correção (diff). A página recebe um parâmetro dinâmico na URL (`id` — UUID) e por enquanto exibirá dados estáticos.

---

## 🎨 Design (Pencil — Screen 2)

### Layout Geral
- **Width**: 1440px (full-width)
- **Padding**: `40px` vertical, `80px` horizontal
- **Background**: `#0A0A0A`

### Navbar (reutilizado)
- Logo: `>` (verde `#10B981`) + `devroast` (branco)
- Link: `leaderboard` (zinc-500)

---

### 1. Score Hero Section
Layout horizontal com gap de 48px:

**Score Ring (180px)**:
- Outer ring: border `#2A2A2A`, 4px, transparente
- Inner ring: gradiente angular (`#EF4444` → `#F59E0B` → `#10B981`), 4px
- Score number: 48px, bold, cor baseada no score (ex: `#F59E0B` para 3.5)
- Label: `/10` (zinc-600, 16px)

**Roast Summary** (flex-1, vertical, gap 16px):
| Elemento | Estilo |
|---|---|
| Badge | Dot (8px, cor do score) + `verdict: needs_serious_help` (cor do score, 13px, 500) |
| Quote | `"this code looks like it was written during a power outage... in 2005."` (branco, 20px, IBM Plex Mono, line-height 1.5) |
| Meta Row | `lang: javascript` · `7 lines` (zinc-600, 12px, gap 16px) |
| Share Row | Botão de share (border, padding [8, 16]) |

---

### 2. Submitted Code Section
Divider horizontal (`#2A2A2A`, 1px)

**Título**: `//` (verde, 14px, bold) + `your_submission` (branco, 14px, bold)

**Code Preview** (424px height):
- **Line Numbers**: 48px wide, fundo `#0F0F0F`, border-right, zinc-600, 12px, padding [16, 12]
- **Code Content**: Syntax highlighted, padding 16px, gap 8px entre linhas

---

### 3. Analysis Section
Divider horizontal (`#2A2A2A`, 1px)

**Título**: `//` (verde, 14px, bold) + `detailed_analysis` (branco, 14px, bold)

**Issues Grid** (2x2, gap 20px):
Cada card:
| Elemento | Estilo |
|---|---|
| Header | Dot (8px, cor do tipo) + label (`critical`/`warning`/`good`, 12px, 500) |
| Title | Texto branco, 13px, 500, font-mono |
| Description | Texto zinc-500, 12px, IBM Plex Mono, line-height 1.5 |
| Container | Padding 20px, border `#2A2A2A`, 1px |

**Tipos de issue e cores:**
| Tipo | Cor |
|---|---|
| `critical` | `#EF4444` (red) |
| `warning` | `#F59E0B` (amber) |
| `good` | `#10B981` (green) |

---

### 4. Diff Section (Suggested Fix)
Divider horizontal (`#2A2A2A`, 1px)

**Título**: `//` (verde, 14px, bold) + `suggested_fix` (branco, 14px, bold)

**Diff Block**:
- **Header**: `your_code.ts → improved_code.ts` (zinc-500, 12px, 500), padding [0, 16], height 40px, border-bottom
- **Body**: Linhas com prefixo de 20px + código, height 28px cada, padding [0, 16]

**Tipos de linha:**
| Tipo | Prefixo | Background | Cor do texto |
|---|---|---|---|
| Context | `  ` | transparente | zinc-600 |
| Removed | `- ` | `#EF444415` | red |
| Added | `+ ` | `#10B98115` | green |

---

## 📐 Arquitetura

### Rota
- **Path**: `/roast/[id]` (dynamic segment — UUID)
- **Renderização**: SSR (Server Component, sem `"use client"`)
- **SEO**: Metadata dinâmica com title e description

### Estrutura de Arquivos
```
src/
├── app/
│   └── roast/
│       └── [id]/
│           └── page.tsx              # Server Component (SSR)
└── components/
    └── roast/
        ├── roast-hero.tsx             # Score ring + roast summary
        ├── roast-code.tsx             # Submitted code section
        ├── roast-issues.tsx           # Issues grid (2x2 cards)
        ├── roast-issue-card.tsx       # Card individual de issue
        ├── roast-diff.tsx             # Diff block (suggested fix)
        └── roast-diff-line.tsx        # Linha individual do diff
```

### Dados (Por enquanto estáticos)
```ts
interface RoastResult {
  id: string;
  score: number;
  verdict: string;
  quote: string;
  language: string;
  lineCount: number;
  code: string;
  issues: Issue[];
  diff: DiffLine[];
}

interface Issue {
  type: "critical" | "warning" | "good";
  title: string;
  description: string;
}

interface DiffLine {
  type: "context" | "removed" | "added";
  content: string;
}
```

---

## 🎨 Design Tokens

| Token | Valor | Uso |
|---|---|---|
| Score (low) | `#EF4444` (red) | Scores < 5 |
| Score (mid) | `#F59E0B` (amber) | Scores 5-7.5 |
| Score (high) | `#10B981` (green) | Scores > 7.5 |
| Critical | `#EF4444` | Issue cards críticas |
| Warning | `#F59E0B` | Issue cards de aviso |
| Good | `#10B981` | Issue cards positivas |
| Removed bg | `#EF444415` | Linhas removidas no diff |
| Added bg | `#10B98115` | Linhas adicionadas no diff |
| Border | `#2A2A2A` | Bordas gerais |
| Divider | `#2A2A2A` | Separadores horizontais |
| Code bg | `#111111` | Fundo de blocos de código |
| Line nums bg | `#0F0F0F` | Fundo de line numbers |

---

## ✅ TODOs

### Fase 1 — Setup
- [ ] 1.1. Criar rota `src/app/roast/[id]/page.tsx` (Server Component)
- [ ] 1.2. Adicionar metadata para SEO (title, description)
- [ ] 1.3. Criar `src/components/roast/roast-hero.tsx`
- [ ] 1.4. Criar `src/components/roast/roast-code.tsx`
- [ ] 1.5. Criar `src/components/roast/roast-issues.tsx`
- [ ] 1.6. Criar `src/components/roast/roast-issue-card.tsx`
- [ ] 1.7. Criar `src/components/roast/roast-diff.tsx`
- [ ] 1.8. Criar `src/components/roast/roast-diff-line.tsx`

### Fase 2 — Dados
- [ ] 2.1. Definir interfaces (`RoastResult`, `Issue`, `DiffLine`)
- [ ] 2.2. Criar dados mockados para um roast de exemplo
- [ ] 2.3. Conectar dados aos componentes

### Fase 3 — Polimento
- [ ] 3.1. Aplicar estilos conforme Pencil (cores, espaçamentos, tipografia)
- [ ] 3.2. Reutilizar `ScoreRing` existente
- [ ] 3.3. Reutilizar `CodeBlock` existente onde aplicável
- [ ] 3.4. Rodar `pnpm check` (Biome)
- [ ] 3.5. Testar renderização SSR

### Fase 4 — Futuro (DB Integration)
- [ ] 4.1. Substituir dados mockados por query Drizzle ORM (busca por UUID)
- [ ] 4.2. Adicionar tratamento de 404 para IDs inexistentes
- [ ] 4.3. Adicionar botão de share com URL copiada

---

## ⚠️ Pontos de Atenção

1. **SSR puro**: Sem `"use client"` — toda a página é renderizada no servidor
2. **ScoreRing existente**: Reutilizar `src/components/ui/score-ring.tsx` (já implementado)
3. **CodeBlock existente**: Reutilizar `src/components/ui/code-block.tsx` para o código submetido
4. **Diff custom**: O diff block é custom — não reutiliza CodeBlock. Precisa de componente próprio com linhas coloridas
5. **Performance**: Shiki no server-side é síncrono após inicialização — ideal para SSR
6. **UUID na URL**: O parâmetro `id` é uma UUID — por enquanto ignorado, dados estáticos
