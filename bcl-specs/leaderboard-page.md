# Shame Leaderboard Page — Especificação

## 📋 Contexto

Página de leaderboard que exibe as submissões de código com piores scores, ordenadas do pior para o melhor. Por enquanto, conterá apenas dados estatísticos renderizados via SSR para indexação SEO.

---

## 🎨 Design (Pencil — Screen 3)

### Layout Geral
- **Width**: 1440px (full-width)
- **Padding**: `40px` vertical, `80px` horizontal
- **Background**: `#0A0A0A`

### Navbar (reutilizado)
- Logo: `>` (verde `#10B981`) + `devroast` (branco)
- Link ativo: `leaderboard` (zinc-500)

### Hero Section
| Elemento | Estilo |
|---|---|
| Título | `>` verde (#10B981, 32px) + `shame_leaderboard` (branco, 28px, bold, JetBrains Mono) |
| Subtítulo | `// the most roasted code on the internet` (zinc-500, 14px, IBM Plex Mono) |
| Stats Row | `2,847 submissions` · `avg score: 4.2/10` (zinc-600, 12px, gap 8px) |

### Leaderboard Entries
Cada entrada consiste em:

**Meta Row** (48px, border-bottom):
- **Esquerda**: Rank (`#` zinc-600 + número amber #F59E0B, 14px bold) + Score (`score:` zinc-600 + valor red #EF4444, 14px bold)
- **Direita**: Linguagem (zinc-500, 12px) + Linhas (zinc-600, 12px)

**Code Block** (120px):
- **Line Numbers**: 40px wide, fundo #0F0F0F, border-right, texto zinc-600, 12px
- **Code Content**: Syntax highlighted, padding [14, 16], gap 6px entre linhas

---

## 📐 Arquitetura

### Rota
- **Path**: `/leaderboard`
- **Renderização**: SSR (Server Component, sem `"use client"`)
- **SEO**: Metadata com title e description

### Estrutura de Arquivos
```
src/
├── app/
│   └── leaderboard/
│       ├── page.tsx              # Server Component (SSR)
│       └── layout.tsx            # Opcional (herda do root)
└── components/
    └── leaderboard/
        ├── leaderboard-hero.tsx   # Hero section com título + stats
        ├── leaderboard-entry.tsx  # Entry individual (meta row + code block)
        └── leaderboard-list.tsx   # Lista de entries
```

### Dados (Por enquanto estáticos)
```ts
interface LeaderboardEntry {
  rank: number;
  score: number;
  language: string;
  lineCount: number;
  code: string;
}
```

Dados mockados para renderização SSR inicial — depois serão substituídos por queries do Drizzle ORM.

---

## 🎨 Design Tokens

| Token | Valor | Uso |
|---|---|---|
| Rank number | `#F59E0B` (amber) | Números do ranking |
| Score value | `#EF4444` (red) | Valores de score |
| Label text | `#4B5563` (zinc-600) | Labels como `#`, `score:`, `lines` |
| Language | `#6B7280` (zinc-500) | Nome da linguagem |
| Line numbers | `#4B5563` (zinc-600) | Números das linhas |
| Line numbers bg | `#0F0F0F` | Fundo da coluna de line numbers |
| Code block bg | `#111111` | Fundo do bloco de código |
| Border | `#2A2A2A` | Bordas dos entries |

---

## ✅ TODOs

### Fase 1 — Setup
- [ ] 1.1. Criar rota `src/app/leaderboard/page.tsx` (Server Component)
- [ ] 1.2. Adicionar metadata para SEO (title, description, openGraph)
- [ ] 1.3. Criar `src/components/leaderboard/leaderboard-hero.tsx`
- [ ] 1.4. Criar `src/components/leaderboard/leaderboard-entry.tsx`
- [ ] 1.5. Criar `src/components/leaderboard/leaderboard-list.tsx`

### Fase 2 — Dados
- [ ] 2.1. Definir interface `LeaderboardEntry`
- [ ] 2.2. Criar dados mockados (5 entries)
- [ ] 2.3. Conectar entries ao componente de listagem

### Fase 3 — Polimento
- [ ] 3.1. Aplicar estilos conforme Pencil (cores, espaçamentos, tipografia)
- [ ] 3.2. Reutilizar `CodeBlock` existente para syntax highlight
- [ ] 3.3. Rodar `pnpm check` (Biome)
- [ ] 3.4. Testar renderização SSR

### Fase 4 — Futuro (DB Integration)
- [ ] 4.1. Substituir dados mockados por query Drizzle ORM
- [ ] 4.2. Adicionar paginação
- [ ] 4.3. Adicionar filtros por linguagem

---

## ⚠️ Pontos de Atenção

1. **SSR puro**: Sem `"use client"` — toda a página é renderizada no servidor
2. **CodeBlock existente**: Reutilizar o componente `src/components/ui/code-block.tsx` (já usa Shiki)
3. **SEO**: Metadata adequada para indexação do leaderboard
4. **Performance**: Como é SSR, os dados são fetchados uma vez por request — ideal para dados estáticos iniciais
