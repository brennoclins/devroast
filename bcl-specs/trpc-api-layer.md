# tRPC API Layer — Especificação

## 📋 Contexto

Implementar tRPC v11 como camada de API/backend do projeto, integrado com Next.js 16 App Router, Drizzle ORM e TanStack React Query. A integração seguirá o padrão oficial de Server Components, permitindo prefetch em RSC e hooks tipados em Client Components.

---

## 🔍 Documentação de Referência

- [tRPC v11 — TanStack React Query Setup](https://trpc.io/docs/client/tanstack-react-query/setup)
- [tRPC v11 — Server Components](https://trpc.io/docs/client/tanstack-react-query/server-components)
- [tRPC v11 — Next.js App Router](https://trpc.io/docs/client/nextjs/app-router-setup)

---

## 📐 Arquitetura

### Stack
| Camada | Tecnologia |
|---|---|
| API | tRPC v11 (`@trpc/server`, `@trpc/client`) |
| Client Integration | `@trpc/tanstack-react-query` |
| State/Cache | `@tanstack/react-query` |
| Validação | `zod` |
| Adapter | `@trpc/server/adapters/fetch` (Next.js Route Handlers) |
| ORM | Drizzle ORM (já configurado) |
| DB | PostgreSQL 18 (já configurado) |

### Estrutura de Arquivos
```
src/
├── trpc/
│   ├── init.ts              # tRPC init (context, router, procedure helpers)
│   ├── query-client.ts      # QueryClient factory (SSR-safe)
│   ├── client.tsx           # Client Components entry (TRPCReactProvider, useTRPC)
│   ├── server.ts            # Server Components entry (prefetch, HydrateClient, caller)
│   └── routers/
│       ├── _app.ts          # AppRouter (combina todos os sub-routers)
│       ├── submissions.ts   # Submissions router (CRUD + leaderboard)
│       └── roast.ts         # Roast router (submit, get result)
├── app/
│   ├── api/
│   │   └── trpc/
│   │       └── [trpc]/
│   │           └── route.ts # Fetch adapter handler (GET + POST)
│   └── layout.tsx           # Atualizado com TRPCReactProvider
└── components/
    └── trpc-provider.tsx    # Wrapper para montar provider no layout
```

---

## 🔧 Implementação

### 1. Dependências

```bash
pnpm add @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query zod client-only server-only
```

### 2. tRPC Init (`src/trpc/init.ts`)

```ts
import { initTRPC } from "@trpc/server";
import { cache } from "react";
import { db } from "@/db";

export const createTRPCContext = cache(async () => {
  return { db };
});

const t = initTRPC.context<typeof createTRPCContext>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
```

### 3. QueryClient Factory (`src/trpc/query-client.ts`)

```ts
import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}
```

### 4. Client Provider (`src/trpc/client.tsx`)

```tsx
"use client";

import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { useState } from "react";
import { makeQueryClient } from "./query-client";
import type { AppRouter } from "./routers/_app";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
  })();
  return `${base}/api/trpc`;
}

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(
    () =>
      createTRPCClient<AppRouter>({
        links: [httpBatchLink({ url: getUrl() })],
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
```

### 5. Server Proxy (`src/trpc/server.ts`)

```ts
import "server-only";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createTRPCContext } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";

export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});
export const caller = appRouter.createCaller(createTRPCContext);

export function HydrateClient({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

export function prefetch(queryOptions: ReturnType<typeof trpc.hello.queryOptions>) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(queryOptions);
}
```

### 6. API Route Handler (`src/app/api/trpc/[trpc]/route.ts`)

```ts
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/routers/_app";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
```

### 7. AppRouter (`src/trpc/routers/_app.ts`)

```ts
import { createTRPCRouter } from "../init";
import { submissionsRouter } from "./submissions";
import { roastRouter } from "./roast";

export const appRouter = createTRPCRouter({
  submissions: submissionsRouter,
  roast: roastRouter,
});

export type AppRouter = typeof appRouter;
```

---

## 🗄 Routers

### Submissions Router (`src/trpc/routers/submissions.ts`)

```ts
import { baseProcedure, createTRPCRouter } from "../init";
import { submissions, issues } from "@/db/schema";
import { desc, count, avg } from "drizzle-orm";

export const submissionsRouter = createTRPCRouter({
  // GET /api/trpc/submissions.list
  list: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.submissions.findMany({
      orderBy: desc(submissions.score),
      with: { issues: true },
      limit: 50,
    });
    return data;
  }),

  // GET /api/trpc/submissions.stats
  stats: baseProcedure.query(async ({ ctx }) => {
    const [totalResult] = await ctx.db
      .select({ value: count() })
      .from(submissions);
    const [avgResult] = await ctx.db
      .select({ value: avg(submissions.score) })
      .from(submissions);
    return {
      totalSubmissions: totalResult.value,
      avgScore: parseFloat(Number(avgResult.value).toFixed(1)),
    };
  }),

  // GET /api/trpc/submissions.byId
  byId: baseProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query.submissions.findFirst({
        where: eq(submissions.id, input.id),
        with: { issues: true },
      });
      if (!result) throw new TRPCError({ code: "NOT_FOUND" });
      return result;
    }),
});
```

### Roast Router (`src/trpc/routers/roast.ts`)

```ts
import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { submissions, issues } from "@/db/schema";

export const roastRouter = createTRPCRouter({
  // POST /api/trpc/roast.submit
  submit: baseProcedure
    .input(
      z.object({
        code: z.string().min(1),
        language: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: Call AI agent here
      const result = await ctx.db.transaction(async (tx) => {
        const [submission] = await tx
          .insert(submissions)
          .values({
            code: input.code,
            language: input.language,
            score: "5.0", // placeholder
            roastQuote: "placeholder",
            summary: "placeholder",
            fixedCode: input.code,
          })
          .returning();

        // TODO: Insert issues from AI response
        return submission;
      });

      return { id: result.id };
    }),

  // GET /api/trpc/roast.byId
  byId: baseProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query.submissions.findFirst({
        where: eq(submissions.id, input.id),
        with: { issues: true },
      });
      if (!result) throw new TRPCError({ code: "NOT_FOUND" });
      return result;
    }),
});
```

---

## 🔄 Integração com Layout

### `src/app/layout.tsx`

```tsx
import { TRPCReactProvider } from "@/trpc/client";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <TRPCReactProvider>
          <Navbar />
          <main>{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
```

---

## 📝 Uso em Server Components

### Prefetch + Hydration

```tsx
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export default async function LeaderboardPage() {
  prefetch(trpc.submissions.list.queryOptions());
  prefetch(trpc.submissions.stats.queryOptions());

  return (
    <HydrateClient>
      <LeaderboardHero />
      <LeaderboardList />
    </HydrateClient>
  );
}
```

### Server Caller (dados diretos no servidor)

```tsx
import { caller } from "@/trpc/server";

export default async function RoastResultPage({ params }) {
  const { id } = await params;
  const result = await caller.roast.byId({ id });
  return <RoastHero result={result} />;
}
```

---

## 📝 Uso em Client Components

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function SubmissionsList() {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(trpc.submissions.list.queryOptions());

  if (isLoading) return <div>Loading...</div>;
  return <div>{data?.length} submissions</div>;
}
```

---

## ✅ TODOs

### Fase 1 — Setup
- [ ] 1.1. Instalar dependências (`@trpc/server`, `@trpc/client`, `@trpc/tanstack-react-query`, `@tanstack/react-query`, `zod`, `client-only`, `server-only`)
- [ ] 1.2. Criar `src/trpc/init.ts` (context, router, procedure helpers)
- [ ] 1.3. Criar `src/trpc/query-client.ts` (QueryClient factory)
- [ ] 1.4. Criar `src/trpc/client.tsx` (TRPCReactProvider, useTRPC)
- [ ] 1.5. Criar `src/trpc/server.ts` (prefetch, HydrateClient, caller, trpc proxy)
- [ ] 1.6. Criar `src/app/api/trpc/[trpc]/route.ts` (fetch adapter handler)

### Fase 2 — Routers
- [ ] 2.1. Criar `src/trpc/routers/_app.ts` (AppRouter)
- [ ] 2.2. Criar `src/trpc/routers/submissions.ts` (list, stats, byId)
- [ ] 2.3. Criar `src/trpc/routers/roast.ts` (submit, byId)

### Fase 3 — Integração
- [ ] 3.1. Atualizar `src/app/layout.tsx` com `TRPCReactProvider`
- [ ] 3.2. Migrar `src/app/leaderboard/page.tsx` para usar tRPC (prefetch + HydrateClient)
- [ ] 3.3. Migrar `src/app/roast/[id]/page.tsx` para usar tRPC (caller)
- [ ] 3.4. Criar Client Components com `useTRPC` hooks onde necessário

### Fase 4 — Polimento
- [ ] 4.1. Adicionar tratamento de erros (TRPCError)
- [ ] 4.2. Adicionar loading states com Suspense
- [ ] 4.3. Rodar `pnpm check` (Biome)
- [ ] 4.4. Testar fluxo completo (submit → leaderboard → result)

---

## ⚠️ Pontos de Atenção

1. **`server-only`**: O arquivo `src/trpc/server.ts` deve ter `import "server-only"` para evitar import acidental no client
2. **`client-only`**: O arquivo `src/trpc/client.tsx` deve ter `"use client"` no topo
3. **QueryClient per-request**: No servidor, sempre criar novo QueryClient por request (usar `cache()` do React)
4. **Browser singleton**: No browser, reutilizar QueryClient para evitar re-criação durante suspense
5. **`import type`**: Sempre usar `import type` para `AppRouter` no client para evitar bundling de código server
6. **Drizzle context**: O `db` é injetado via contexto do tRPC — disponível em todas as procedures
7. **Zod validation**: Todas as inputs devem ser validadas com Zod via `.input(z.object({...}))`
8. **TRPCError**: Usar `TRPCError` do `@trpc/server` para erros tipados (NOT_FOUND, BAD_REQUEST, etc)
