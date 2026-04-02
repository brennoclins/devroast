"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { AnimatedNumber } from "./animated-number";

export function StatsSection() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.submissions.stats.queryOptions());

  return (
    <div className="flex items-center gap-8">
      <div className="flex items-baseline gap-2">
        <AnimatedNumber value={data?.totalSubmissions ?? 0} />
        <span className="text-sm font-mono text-zinc-600">submissions</span>
      </div>
      <span className="text-zinc-700">·</span>
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-mono text-zinc-600">avg score:</span>
        <AnimatedNumber value={data?.avgScore ?? 0} decimals={1} />
        <span className="text-sm font-mono text-zinc-600">/10</span>
      </div>
    </div>
  );
}
