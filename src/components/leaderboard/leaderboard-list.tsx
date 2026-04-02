import { LeaderboardEntry } from "./leaderboard-entry";

const MOCK_ENTRIES = [
  {
    rank: 1,
    score: 1.2,
    language: "javascript",
    lineCount: 3,
    code: 'eval(prompt("enter code"))\ndocument.write(response)\n// trust the user lol',
  },
  {
    rank: 2,
    score: 1.8,
    language: "typescript",
    lineCount: 3,
    code: "const x: any = getData()\nconst y: any = processData(x)\nconst z: any = formatOutput(y)",
  },
  {
    rank: 3,
    score: 2.1,
    language: "sql",
    lineCount: 2,
    code: "SELECT * FROM users\nWHERE password = 'admin'",
  },
  {
    rank: 4,
    score: 2.7,
    language: "python",
    lineCount: 4,
    code: "import os\nos.system('rm -rf /')\nprint('done')\n# cleanup",
  },
  {
    rank: 5,
    score: 3.1,
    language: "javascript",
    lineCount: 3,
    code: "try { doSomething() } catch (e) { console.log('error happened') }",
  },
];

export function LeaderboardList() {
  return (
    <section className="w-full max-w-[960px] px-10 flex flex-col gap-5">
      {MOCK_ENTRIES.map((entry) => (
        <LeaderboardEntry
          key={entry.rank}
          rank={entry.rank}
          score={entry.score}
          language={entry.language}
          lineCount={entry.lineCount}
          code={entry.code}
        />
      ))}
    </section>
  );
}
