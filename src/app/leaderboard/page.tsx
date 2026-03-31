import type { Metadata } from "next";
import { LeaderboardHero } from "@/components/leaderboard/leaderboard-hero";
import { LeaderboardList } from "@/components/leaderboard/leaderboard-list";

export const metadata: Metadata = {
  title: "Shame Leaderboard | DevRoast",
  description:
    "The most roasted code on the internet. See the worst pieces of code ranked by our AI judge.",
  openGraph: {
    title: "Shame Leaderboard | DevRoast",
    description:
      "The most roasted code on the internet. See the worst pieces of code ranked by our AI judge.",
    type: "website",
  },
};

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col items-center w-full pb-20">
      <LeaderboardHero />
      <LeaderboardList />
    </div>
  );
}
