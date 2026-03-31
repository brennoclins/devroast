# 🤖 DevRoast - Regras Globais & Info do Projeto

## 🧠 Sobre o Projeto
**DevRoast** é uma aplicação web feita para julgar o código alheio com uma proposta estética minimalista, rigorosa e levemente sarcástica.
- **Core Stack**: Next.js 16 (App Router), React 19, Tailwind CSS v4.
- **Ferramental**: Biome (Linter/Formatter), Shiki (Syntax Highlighting), Base UI (Primitivos Headless) e Tailwind Variants.

## 🧱 Arquitetura de UI
- **Composition Pattern**: Componentes de Interface devem sempre que possível ser divididos usando notação de ponto para alta flexibilidade. Exemplo: `<Switch.Root>`, `<TableRow.Code>`, etc.
- **Reuso**: Componentes globais estúpidos (dumb components) vivem exclusivamente em `src/components/ui`.
- **APIs de Next.js**: Páginas e subcomponentes tendem a ser renderizados primeiro no Servidor (RSC). `"use client"` é restrito a arquivos lógicos de Contexto local e interação (como `<Switch>`).
- Quando componentes utilizarem a _Object Composition_ sob "use client", obrigatoriamente exportar as partes nomeadamente (ex: `export { Root, Component }`) e consumir o arquivo por namespace-import (`import * as Nome from '...'`) para evitar bugs de serialização no Next.js.

## 📐 Qualidade de Código (Padrões Globais)

1. **Exports Nomeados**: Prefira sempre `export function NomeDaFuncao(...)`. `export default` é restrito a rotas e layouts do Next.js.
2. **Tipagem HTML**: Todo componente base estende os atributos originais do HTML. Ex: `export interface Props extends ComponentProps<"div">`.
3. **Gerenciamento de Estilos**: Classes Tailwind mescladas com o utilitário `cn(...)` e variações construídas majoritariamente pelo `tv({...})`.
4. **Clean Code Automático**: O Biome é o árbitro. Todo código só entra se passar no crivo da formatação unificada (execute `pnpm check`).
5. **Cores/Tokens da Marca**: Preservar o fundo mecânico (`#0A0A0A`, `#111111`) pincelado apenas nos destaques semânticos (Verde Escuro para o Roast Mode, Vermelho/Amarelo/Verde para as pontuações de código).
