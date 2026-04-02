import { relations } from "drizzle-orm";
import {
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const issueTypeEnum = pgEnum("issue_type", [
  "optimization",
  "vulnerability",
  "typing",
  "style",
  "performance",
]);

export const submissions = pgTable("submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull(),
  language: varchar("language", { length: 50 }).notNull(),
  score: numeric("score", { precision: 3, scale: 1 }).notNull(),
  roastQuote: text("roast_quote").notNull(),
  summary: text("summary").notNull(),
  fixedCode: text("fixed_code").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const submissionsRelations = relations(submissions, ({ many }) => ({
  issues: many(issues),
}));

export const issues = pgTable("issues", {
  id: uuid("id").defaultRandom().primaryKey(),
  submissionId: uuid("submission_id")
    .notNull()
    .references(() => submissions.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  issueType: issueTypeEnum("issue_type").notNull(),
});

export const issuesRelations = relations(issues, ({ one }) => ({
  submission: one(submissions, {
    fields: [issues.submissionId],
    references: [submissions.id],
  }),
}));
