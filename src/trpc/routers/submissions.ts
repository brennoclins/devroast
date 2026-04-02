import { avg, count } from "drizzle-orm";
import { submissions } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "../init";

export const submissionsRouter = createTRPCRouter({
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
});
