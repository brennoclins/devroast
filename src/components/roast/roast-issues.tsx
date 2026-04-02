import type { Issue } from "./mock-data";
import { RoastIssueCard } from "./roast-issue-card";

export interface RoastIssuesProps {
  issues: Issue[];
}

export function RoastIssues({ issues }: RoastIssuesProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono font-bold text-accent-green">
          {"//"}
        </span>
        <span className="text-sm font-mono font-bold text-zinc-50">
          detailed_analysis
        </span>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {issues.map((issue) => (
          <RoastIssueCard key={issue.title} issue={issue} />
        ))}
      </div>
    </div>
  );
}
