import "dotenv/config";
import { db } from "./index";
import { issues, submissions } from "./schema";

const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "go",
  "rust",
  "php",
  "ruby",
  "sql",
  "bash",
];

const CODE_SNIPPETS: Record<string, string[]> = {
  javascript: [
    "var x = 10;\nfor (var i = 0; i < x; i++) {\n  console.log(i);\n}",
    "eval(prompt('enter code'))\ndocument.write(response)",
    "const data = JSON.parse(JSON.stringify(oldData))",
    "function check(a) { if (a == true) { return true } else { return false } }",
    "try { doSomething() } catch (e) { console.log('error') }",
  ],
  typescript: [
    "const x: any = getData()\nconst y: any = processData(x)",
    "interface User { name: string }\nconst u: User = null as any",
    "type Result = any\nfunction process(r: Result): any { return r }",
  ],
  python: [
    "import os\nos.system('rm -rf /')\nprint('done')",
    "x = []\nfor i in range(1000):\n    x.append(i * 2)",
    "def foo(a, b, c, d, e, f, g, h, i, j):\n    return a + b + c",
  ],
  java: [
    'public static void main(String[] args) {\n  System.out.println("hello");\n}',
    "List<String> list = new ArrayList<>();\nfor (int i = 0; i < 100; i++) list.add(String.valueOf(i));",
  ],
  go: [
    'func main() {\n  fmt.Println("hello")\n}',
    "var result []int\nfor i := 0; i < 100; i++ {\n  result = append(result, i)\n}",
  ],
  rust: [
    'fn main() {\n  let x = vec![1, 2, 3];\n  println!("{:?}", x);\n}',
    "let mut s = String::new();\nfor i in 0..100 {\n  s.push_str(&i.to_string());\n}",
  ],
  php: [
    "<?php\n$x = $_GET['input'];\necho $x;",
    "<?php\n$arr = [];\nfor ($i = 0; $i < 100; $i++) {\n  $arr[] = $i;\n}",
  ],
  ruby: [
    "x = []\n100.times { |i| x << i * 2 }",
    "def calculate(a, b)\n  return a + b\nend",
  ],
  sql: [
    "SELECT * FROM users WHERE password = 'admin'",
    "SELECT u.*, o.* FROM users u JOIN orders o ON u.id = o.user_id",
  ],
  bash: [
    "#!/bin/bash\nfor i in {1..100}; do\n  echo $i\ndone",
    "curl http://api.example.com/data | jq '.[]'",
  ],
};

const ISSUE_TEMPLATES: Record<
  string,
  {
    type: "optimization" | "vulnerability" | "typing" | "style" | "performance";
    title: string;
    description: string;
  }[]
> = {
  javascript: [
    {
      type: "vulnerability",
      title: "using var instead of const/let",
      description: "var is function-scoped and leads to hoisting bugs.",
    },
    {
      type: "vulnerability",
      title: "eval usage detected",
      description: "eval is dangerous and opens XSS vulnerabilities.",
    },
    {
      type: "performance",
      title: "JSON stringify/parse loses data",
      description: "This approach drops undefined, functions, and Symbols.",
    },
    {
      type: "vulnerability",
      title: "loose equality comparison",
      description: "Use === instead of == to avoid type coercion bugs.",
    },
    {
      type: "performance",
      title: "silent error swallowing",
      description: "Catching errors without proper handling hides bugs.",
    },
    {
      type: "style",
      title: "clear function naming",
      description: "Function names clearly communicate intent.",
    },
    {
      type: "optimization",
      title: "single responsibility",
      description: "The function does one thing well.",
    },
  ],
  typescript: [
    {
      type: "typing",
      title: "excessive any usage",
      description: "Using any defeats the purpose of TypeScript.",
    },
    {
      type: "typing",
      title: "type assertion with as any",
      description: "Casting to any bypasses type checking.",
    },
    {
      type: "style",
      title: "interface usage",
      description: "Proper use of interfaces for type definitions.",
    },
  ],
  python: [
    {
      type: "vulnerability",
      title: "os.system with unsanitized input",
      description: "Shell injection vulnerability detected.",
    },
    {
      type: "performance",
      title: "inefficient list building",
      description: "Use list comprehension instead of append in a loop.",
    },
    {
      type: "style",
      title: "descriptive variable names",
      description: "Variable names are clear and self-documenting.",
    },
  ],
  java: [
    {
      type: "typing",
      title: "raw type usage",
      description: "Use parameterized types instead of raw types.",
    },
    {
      type: "style",
      title: "proper main method signature",
      description: "Standard entry point is correctly defined.",
    },
  ],
  go: [
    {
      type: "vulnerability",
      title: "missing error handling",
      description: "Errors should be checked and handled explicitly.",
    },
    {
      type: "style",
      title: "idiomatic Go patterns",
      description: "Code follows Go conventions and best practices.",
    },
  ],
  rust: [
    {
      type: "optimization",
      title: "unnecessary mutability",
      description: "Prefer immutable bindings when possible.",
    },
    {
      type: "style",
      title: "ownership model respected",
      description: "No unnecessary cloning or borrowing.",
    },
  ],
  php: [
    {
      type: "vulnerability",
      title: "unsanitized user input",
      description: "Direct echo of $_GET without sanitization is an XSS risk.",
    },
    {
      type: "style",
      title: "short array syntax not used",
      description: "Use [] instead of array() for modern PHP.",
    },
  ],
  ruby: [
    {
      type: "performance",
      title: "imperative loop pattern",
      description: "Use map/each_with_object for cleaner code.",
    },
    {
      type: "style",
      title: "idiomatic Ruby",
      description: "Code follows Ruby conventions.",
    },
  ],
  sql: [
    {
      type: "performance",
      title: "SELECT * usage",
      description: "Explicitly list columns instead of using SELECT *.",
    },
    {
      type: "vulnerability",
      title: "hardcoded credentials",
      description: "Never hardcode passwords or secrets in queries.",
    },
  ],
  bash: [
    {
      type: "vulnerability",
      title: "unquoted variables",
      description: "Always quote variables to prevent word splitting.",
    },
    {
      type: "style",
      title: "proper shebang line",
      description: "Script starts with correct interpreter declaration.",
    },
  ],
};

const VERDICTS = [
  "needs_serious_help",
  "barely_functional",
  "could_be_worse",
  "mediocre_at_best",
  "acceptable_i_guess",
  "actually_not_bad",
  "surprisingly_decent",
  "wait_this_is_good",
];

const QUOTES = [
  "this code looks like it was written during a power outage... in 2005.",
  "i've seen better code in a fortune cookie.",
  "this is what happens when you skip the documentation.",
  "my cat walked on the keyboard and produced better code.",
  "this code has more issues than a self-help book.",
  "i'm not saying this is bad, but it's definitely not good.",
  "the compiler is crying. i can hear it.",
  "this code is the reason aliens won't talk to us.",
  "even stack overflow would reject this answer.",
  "this looks like code generated by a random word generator.",
  "i've seen cleaner code in a spaghetti factory.",
  "this function has more bugs than a rainforest.",
  "if this code were a person, it would need therapy.",
  "this is the kind of code that keeps senior devs up at night.",
  "the only thing this code compiles is my disappointment.",
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomScore(): number {
  return Math.round((Math.random() * 9 + 1) * 10) / 10;
}

function randomLines(code: string): number {
  return code.split("\n").length;
}

async function main() {
  console.log("🌱 Seeding 1000 submissions...");

  const batchSize = 100;
  let total = 0;

  for (let batch = 0; batch < 10; batch++) {
    const entries: {
      code: string;
      language: string;
      score: string;
      roastQuote: string;
      summary: string;
      fixedCode: string;
    }[] = [];

    for (let i = 0; i < batchSize; i++) {
      const lang = randomFrom(LANGUAGES);
      const snippets = CODE_SNIPPETS[lang];
      const code = randomFrom(snippets);
      const score = randomScore();
      const lineCount = randomLines(code);

      entries.push({
        code,
        language: lang,
        score: score.toFixed(1),
        roastQuote: randomFrom(QUOTES),
        summary: `Code scored ${score}/10. ${randomFrom(VERDICTS).replace(/_/g, " ")}.`,
        fixedCode: `// Fixed version of the ${lang} code\n// Original had ${Math.floor(Math.random() * 5 + 1)} issues\n${code}`,
      });
    }

    const inserted = await db
      .insert(submissions)
      .values(entries)
      .returning({ id: submissions.id });

    for (let i = 0; i < inserted.length; i++) {
      const entry = entries[i];
      const lang = entry.language;
      const templates = ISSUE_TEMPLATES[lang] ?? ISSUE_TEMPLATES.javascript;
      const issueCount = Math.floor(Math.random() * 3) + 1;
      const selectedIssues: typeof templates = [];
      const usedIndices = new Set<number>();

      while (
        selectedIssues.length < issueCount &&
        usedIndices.size < templates.length
      ) {
        const idx = Math.floor(Math.random() * templates.length);
        if (!usedIndices.has(idx)) {
          usedIndices.add(idx);
          selectedIssues.push(templates[idx]);
        }
      }

      if (selectedIssues.length > 0) {
        await db.insert(issues).values(
          selectedIssues.map((issue) => ({
            submissionId: inserted[i].id,
            title: issue.title,
            description: issue.description,
            issueType: issue.type,
          })),
        );
      }
    }

    total += batchSize;
    console.log(`  ✓ ${total}/1000 submissions inserted`);
  }

  console.log("✅ Seed1000 completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed1000 failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
