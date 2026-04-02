# Implementação do Banco de Dados: Drizzle ORM + PostgreSQL

## 📋 Contexto
Com a página da interface já visualmente encaminhada conforme o Pencil, precisamos agora de uma camada de persistência para salvar os "Roasts" submetidos. O banco de dados servirá para alimentar a página de "Resultados" (`/roast/[id]`) e também o *Leaderboard da Vergonha*.

---

## 🏗 Estrutura de Tabelas (Esquema Drizzle)

Analisando a interface `Screen 2 - Roast Results` e `Screen 3 - Shame Leaderboard` desenhada no Pencil, nós exibimos as seguintes informações num Roast:
- **Score (anotado em X/10)**: e.g. 3.5/10
- **Badge do Veredito**: Pelo score, ganha um título como "Critical", "Warning", "Good".
- **Roast Quote**: Uma frase única como *"this code looks like it was written during a power outage... in 2005."*
- **Summary**: Resumo descritivo da análise do código.
- **Código Submetido e Linguagem**: O input original feito pelo usuário.
- **Issues Grid**: Múltiplos cartões de análise (ex: "Optimization", "Security").
- **Diff Box (Suggested Fix)**: Código transformado/corrigido gerado pelo AI.

Isso nos leva ao modelo relacional de **2 tabelas principais**:

### 1. `submissions` (A Entidade Principal do Roast)
Armazena a submissão, a nota oficial e as strings devolvidas pelo agente analista do código.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` (PK) | Identificador único acessado pela URL gerada. |
| `code` | `text` | Código original injetado na landing page. |
| `language` | `varchar` | Linguagem identificada (ex: `javascript`, `python`). |
| `score` | `numeric(3, 1)` | Nota float de 0.0 a 10.0. |
| `roastQuote` | `text` | A frase sarcástica/ofensa oficial. |
| `summary` | `text` | Resumo descritivo da análise. |
| `fixedCode` | `text` | Código com a sugestão de correção (o diff em si é calculado dinamicamente na página via componente usando o original `code` x `fixedCode`). |
| `createdAt` | `timestamp` | Serve para ordenação no Leaderboard. |

### 2. `issues` (As Sugestões de Análise/Cards)
Ligação 1:N com as submissões. Representam os warnings e erros específicos achados no "Analisys Section".

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` (PK) | Identificador. |
| `submissionId` | `uuid` (FK) | Relacionamento para a tabela `submissions`. |
| `title` | `varchar` | O nome explícito do erro (ex: `using var instead of const`). |
| `description` | `text` | O texto longo da explicação do bug. |
| `issueType` | `enum` | Tipo categorizado: `optimization`, `vulnerability`, `typing`, `style`, `performance`. |

### Enum: `issueType`

```ts
export const issueTypeEnum = pgEnum('issue_type', [
  'optimization',
  'vulnerability',
  'typing',
  'style',
  'performance',
]);
```

### Relacionamentos Bidirecionais

```ts
export const submissionsRelations = relations(submissions, ({ many }) => ({
  issues: many(issues),
}));

export const issuesRelations = relations(issues, ({ one }) => ({
  submission: one(submissions, {
    fields: [issues.submissionId],
    references: [submissions.id],
  }),
}));
```

Isso permite queries como:
```ts
db.query.submissions.findMany({
  with: { issues: true },
  orderBy: desc(submissions.score),
});
```

---

## 🐳 Infraestrutura (Docker Compose)
Para um setup limpo local, o banco PostgreSQL precisa subir rápido via Docker Compose. Teremos um `docker-compose.yml` na raiz:

```yaml
version: '3.8'
services:
  db:
    image: postgres:18-alpine
    container_name: devroast-postgres
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
      POSTGRES_DB: devroast
    ports:
      - "5432:5432"
    volumes:
      - devroast_pgdata:/var/lib/postgresql/data
      
volumes:
  devroast_pgdata:
```

---

## 🔑 Variáveis de Ambiente

Arquivo `.env.example` na raiz:

```env
DATABASE_URL="postgresql://root:root@localhost:5432/devroast"
```

---

## ✅ TO-DO List para Execução Posterior

### Fase 1 — Configuração Inicial
- [ ] 1.1 Criar arquivo `docker-compose.yml` com Postgres 18-alpine.
- [ ] 1.2 Criar arquivo `.env.example` com a `DATABASE_URL`.
- [ ] 1.3 Instalar pacotes obrigatórios do Drizzle: `pnpm add drizzle-orm postgres` e dependências de dev: `pnpm add -D drizzle-kit typescript tsx @types/pg dotenv`.

### Fase 2 — Modelagem no Drizzle
- [ ] 2.1 Configurar o arquivo `drizzle.config.ts` no diretório raiz do Next.js.
- [ ] 2.2 Criar o arquivo `src/db/schema.ts` exportando as definições das tabelas `submissions` e `issues`, o enum `issueType` e os relacionamentos bidirecionais.
- [ ] 2.3 Criar o setup e exports da conexão real em `src/db/index.ts` usando a URI do Postgres.

### Fase 3 — Migrações e Scripts
- [ ] 3.1 Adicionar scripts úteis ao `package.json` (ex: `db:generate`, `db:push`, `db:studio`).
- [ ] 3.2 Rodar a geração e aplicar a migração no Docker executando `pnpm db:push`.
- [ ] 3.3 Validar tabelas via Drizzle Studio.

### Fase 4 — Seeds (Dados de Exemplo)
- [ ] 4.1 Criar o arquivo `src/db/seed.ts` para inserir os exemplos falsos de Leaderboard usando nossos componentes de UI.
- [ ] 4.2 Executar o script de seed para provisionar o banco e liberar a UI para ser dinâmica!
