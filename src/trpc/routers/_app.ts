import { createTRPCRouter } from "../init";
import { submissionsRouter } from "./submissions";

export const appRouter = createTRPCRouter({
  submissions: submissionsRouter,
});

export type AppRouter = typeof appRouter;
