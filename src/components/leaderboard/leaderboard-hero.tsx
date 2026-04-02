export function LeaderboardHero() {
  return (
    <section className="flex flex-col items-center text-center gap-4 pt-20 pb-12 px-10">
      <div className="flex items-center gap-3">
        <span className="text-[32px] font-bold text-accent-green">
          {"\u003E"}
        </span>
        <h1 className="text-[28px] font-bold font-mono text-zinc-50 tracking-tight">
          shame_leaderboard
        </h1>
      </div>
      <p className="text-zinc-500 font-mono text-sm">
        {"// the most roasted code on the internet"}
      </p>
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
        <span>2,847 submissions</span>
        <span>·</span>
        <span>avg score: 4.2/10</span>
      </div>
    </section>
  );
}
