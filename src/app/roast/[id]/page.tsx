import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOCK_ROAST_RESULT } from "@/components/roast/mock-data";
import { RoastCode } from "@/components/roast/roast-code";
import { RoastDiff } from "@/components/roast/roast-diff";
import { RoastHero } from "@/components/roast/roast-hero";
import { RoastIssues } from "@/components/roast/roast-issues";

export function generateMetadata(): Metadata {
  return {
    title: `Roast Result | DevRoast`,
    description: `See the full analysis and roast for this submission.`,
  };
}

export default async function RoastResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const result = { ...MOCK_ROAST_RESULT, id };

  return (
    <div className="flex flex-col items-center w-full pb-20">
      <div className="w-full max-w-[960px] px-10 flex flex-col gap-10 pt-10">
        <RoastHero result={result} />
        <RoastCode result={result} />
        <RoastIssues issues={result.issues} />
        <RoastDiff diff={result.diff} />
      </div>
    </div>
  );
}
