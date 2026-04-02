export interface Issue {
  type: "critical" | "warning" | "good";
  title: string;
  description: string;
}

export interface DiffLine {
  type: "context" | "removed" | "added";
  content: string;
}

export interface RoastResult {
  id: string;
  score: number;
  verdict: string;
  quote: string;
  language: string;
  lineCount: number;
  code: string;
  issues: Issue[];
  diff: DiffLine[];
}

export const MOCK_ROAST_RESULT: RoastResult = {
  id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  score: 3.5,
  verdict: "needs_serious_help",
  quote:
    "this code looks like it was written during a power outage... in 2005.",
  language: "javascript",
  lineCount: 7,
  code: `var total = 0;
for (var i = 0; i < items.length; i++) {
  total = total + items[i].price;
}
return total;`,
  issues: [
    {
      type: "critical",
      title: "using var instead of const/let",
      description:
        "var is function-scoped and leads to hoisting bugs. use const by default, let when reassignment is needed.",
    },
    {
      type: "warning",
      title: "imperative loop pattern",
      description:
        "for loops are verbose and error-prone. use .reduce() or .map() for cleaner, functional transformations.",
    },
    {
      type: "good",
      title: "clear naming conventions",
      description:
        "calculateTotal and items are descriptive, self-documenting names that communicate intent without comments.",
    },
    {
      type: "good",
      title: "single responsibility",
      description:
        "the function does one thing well — calculates a total. no side effects, no mixed concerns, no hidden complexity.",
    },
  ],
  diff: [
    { type: "context", content: "function calculateTotal(items) {" },
    { type: "removed", content: "  var total = 0;" },
    { type: "removed", content: "  for (var i = 0; i < items.length; i++) {" },
    { type: "removed", content: "    total = total + items[i].price;" },
    { type: "removed", content: "  }" },
    { type: "removed", content: "  return total;" },
    {
      type: "added",
      content: "  return items.reduce((sum, item) => sum + item.price, 0);",
    },
    { type: "context", content: "}" },
  ],
};
