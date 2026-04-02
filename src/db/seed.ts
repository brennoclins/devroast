import "dotenv/config";
import { db } from "./index";
import { issues, submissions } from "./schema";

async function main() {
  console.log("🌱 Seeding database...");

  const submission1 = await db
    .insert(submissions)
    .values({
      code: "function check(a) { if (a == true) { return true } else { return false } }",
      language: "javascript",
      score: "1.2",
      roastQuote:
        "this code looks like it was written during a power outage... in 2005.",
      summary:
        "Multiple anti-patterns detected including redundant boolean comparison and unnecessary else block.",
      fixedCode: "function check(a) {\n  return Boolean(a);\n}",
    })
    .returning({ id: submissions.id });

  await db.insert(issues).values([
    {
      submissionId: submission1[0].id,
      title: "Redundant boolean comparison",
      description:
        "Comparing a value to true with == is redundant. Use the value directly or cast with Boolean().",
      issueType: "style",
    },
    {
      submissionId: submission1[0].id,
      title: "Unnecessary else after return",
      description:
        "When the if branch returns, the else block is unnecessary. Remove it to reduce nesting.",
      issueType: "optimization",
    },
    {
      submissionId: submission1[0].id,
      title: "Using loose equality (==)",
      description:
        "Use strict equality (===) to avoid unexpected type coercion bugs.",
      issueType: "vulnerability",
    },
  ]);

  const submission2 = await db
    .insert(submissions)
    .values({
      code: "const data = JSON.parse(JSON.stringify(oldData)); // deep clone",
      language: "typescript",
      score: "2.4",
      roastQuote:
        "deep cloning with JSON is the coding equivalent of duct tape.",
      summary:
        "JSON-based deep clone is fragile and loses functions, undefined, and special types.",
      fixedCode: "const data = structuredClone(oldData);",
    })
    .returning({ id: submissions.id });

  await db.insert(issues).values([
    {
      submissionId: submission2[0].id,
      title: "JSON stringify/parse loses data",
      description:
        "This approach drops undefined, functions, Symbols, Date objects, and circular references.",
      issueType: "vulnerability",
    },
    {
      submissionId: submission2[0].id,
      title: "Use structuredClone instead",
      description:
        "Modern browsers and Node.js support structuredClone for safe deep cloning.",
      issueType: "optimization",
    },
  ]);

  const submission3 = await db
    .insert(submissions)
    .values({
      code: "try { doSomething() } catch (e) { console.log('error happened') }",
      language: "javascript",
      score: "3.1",
      roastQuote:
        "swallowing errors like this is how bugs get adopted and raised by wolves.",
      summary:
        "Error is caught but not handled meaningfully. No re-throw, no logging of details, no recovery.",
      fixedCode:
        "try {\n  doSomething();\n} catch (e) {\n  console.error('Failed to execute:', e);\n  throw e;\n}",
    })
    .returning({ id: submissions.id });

  await db.insert(issues).values([
    {
      submissionId: submission3[0].id,
      title: "Silent error swallowing",
      description:
        "Catching an error and only logging a generic message hides the actual problem and makes debugging impossible.",
      issueType: "performance",
    },
    {
      submissionId: submission3[0].id,
      title: "No error re-throw or recovery",
      description:
        "After catching, either handle the error properly, re-throw it, or provide a fallback.",
      issueType: "typing",
    },
  ]);

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
