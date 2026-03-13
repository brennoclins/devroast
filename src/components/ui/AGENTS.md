# UI Component Guidelines

Este documento define os padrões para criação de novos componentes na pasta `src/components/ui`. Todos os componentes devem seguir rigorosamente estas regras para manter a consistência do projeto.

## 1. Estrutura de Arquivos
- Localização: `src/components/ui/AGENTS.md`
- Nome do arquivo: kebab-case (ex: `button.tsx`, `input-field.tsx`)
- Documentação de diretório: Sempre use `AGENTS.md` (todo em maiúsculas) para arquivos de instrução de agentes dentro das pastas.

## 2. Tecnologias e Tokens
- **Tailwind CSS v4**: Para estilização baseada em tokens.
- **Tokens do Design**:
  - `--color-accent-green`: #10B981
  - `--color-accent-red`: #EF4444
  - `--color-bg-page`: #0A0A0A
  - `--color-bg-input`: #111111
  - `--color-border-primary`: #2A2A2A
- **Desenvolvimento**: `tailwind-variants`, `base-ui`, `shiki`.

## 3. Componentes Implementados
- **Button**: Variantes primary, secondary, outline, ghost.
- **Badge**: Status critical, warning, good.
- **Switch**: Toggle com label (v-variants slots).
- **Card**: Container para análises.
- **DiffLine**: Linhas de comparação de código.
- **CodeBlock**: Server component com Shiki (tema Vesper).
- **Named Exports**: Nunca usar `default exports`. Use `export function Component() {}`.
- **TypeScript**:
  - Sempre extender as propriedades nativas do elemento HTML correspondente (ex: `ComponentProps<"div">`).
  - Definir a interface de Props exportada como `[Nome]Props`.
- **Estilização**:
  - Definir a variável de estilos usando `tv({})` fora do componente.
  - Priorizar o uso de tokens do sistema de design (ex: `text-zinc-50`, `bg-zinc-950`).

## 4. Exemplo de Implementação

```tsx
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/utils/cn";

const componentStyles = tv({
  base: "text-base font-medium",
  variants: {
    variant: {
      primary: "text-green-500",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface MyComponentProps
  extends ComponentProps<"div">,
    VariantProps<typeof componentStyles> {}

export function MyComponent({ className, variant, ...props }: MyComponentProps) {
  return (
    <div
      className={cn(componentStyles({ variant }), className)}
      {...props}
    />
  );
}
```

## 5. Integração com Pencil
- Antes de implementar, verifique o arquivo `.pen` correspondente para identificar cores, espaçamentos e tipografia originais.
- Mapeie as variáveis do Pencil para classes do Tailwind ou variáveis CSS no `globals.css`.
