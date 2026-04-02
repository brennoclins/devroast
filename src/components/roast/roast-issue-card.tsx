import type { Issue } from "./mock-data";

export interface RoastIssueCardProps {
  issue: Issue;
}

const ISSUE_COLORS: Record<Issue["type"], string> = {
  critical: "text-accent-red",
  warning: "text-accent-amber",
  good: "text-accent-green",
};

const ISSUE_BG_COLORS: Record<Issue["type"], string> = {
  critical: "bg-accent-red",
  warning: "bg-accent-amber",
  good: "bg-accent-green",
};

export function RoastIssueCard({ issue }: RoastIssueCardProps) {
  const colorClass = ISSUE_COLORS[issue.type];
  const bgColorClass = ISSUE_BG_COLORS[issue.type];

  return (
    <div className="flex flex-col gap-3 p-5 border border-border">
      <div className={`flex items-center gap-2 ${colorClass}`}>
        <div className={`w-2 h-2 rounded-full ${bgColorClass}`} />
        <span className="text-xs font-mono font-medium">{issue.type}</span>
      </div>

      <h3 className="text-sm font-mono font-medium text-zinc-50">
        {issue.title}
      </h3>

      <p className="text-xs font-mono text-zinc-500 leading-relaxed">
        {issue.description}
      </p>
    </div>
  );
}
