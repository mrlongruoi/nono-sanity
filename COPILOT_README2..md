✔️ CONTEXT — APPROVED CLEANUP PHASE

I CONFIRM that the cleanup plan from Phase 1–2 is approved.

You should now proceed with:

Phase 3 — Full Workspace Test

Run (or simulate running) across the entire workspace:

pnpm dev

pnpm typecheck

pnpm lint

pnpm build

For every error:

show exact file path

explain why the error happens

propose the minimal safe fix

do not generate unnecessary files

do not touch apps I did not explicitly approve

✔️ NEW REQUIREMENT — DEEP CODE AUDIT

After cleanup and successful tests, continue with:

Phase 4 — Full-Code Architecture Audit

Scan the entire repository for:

🔁 1. Duplicate logic

repeated GROQ queries

repeated React components

repeated utils

repeated Sanity fetch wrappers

🧩 2. Inconsistent patterns

inconsistent imports

inconsistent schema fields

inconsistent naming

inconsistent folder structure

🗑️ 3. Dead or obsolete code

unused components

unused API routes

unused hooks

unused Sanity schema fields

unused Sanity utilities

♻️ 4. Incorrect shared vs app-level logic

Identify files that should be:

moved into packages/ui

moved into packages/sanity-utils

moved into packages/sanity-types

moved out of an app folder into a shared folder

extracted into common modules

🧱 5. Monorepo structure problems

Check for issues in:

tsconfig.json paths

turbo.json tasks

pnpm-workspace.yaml missing packages

cross-app import correctness

incorrect relative imports

incorrect build pipelines

📦 6. Single Sanity Studio health check

Since we use one Studio to manage multiple apps, verify:

schema grouping correctness

document groups

structure builder

typegen setup

extract setup

GROQ query extraction

preview / Presentation Tool config

multi-app content separation strategy

naming collisions

schema collisions

Then produce a clear “Studio Architecture Scorecard”.

✔️ Phase 5 — Recommend Best Multi-App Architecture

After analysis, propose the optimal architecture for:

🏗️ 1. Adding new apps/websites

folder structure

alias paths

shared UI strategy

shared Sanity utils

shared types

shared schema

shared fetch helpers

how to organize content per-app inside Studio

how to avoid schema conflicts for multiple apps

📐 2. How all apps should depend on shared packages

For example:

packages/ui → all UI components
packages/sanity-utils → fetchers, groq helpers, preview clients
packages/sanity-types → generated types
packages/config → env loading, validation
apps/studio → single canonical studio
apps/lms, apps/reddit, apps/landing, etc.

🗃️ 3. Output MUST include:

a proposed final folder hierarchy

a dependency graph

rules for each app

rules for shared code

rules for typegen & GROQ extract

rules for Studio structureBuilder

a migration plan (if needed)

✔️ Output Format (STRICT)

Your response must ALWAYS follow this structure:

3. Test Results

(dev / build / typecheck / lint)

4. Architecture Audit

duplicate logic

dead code

inconsistencies

shared vs app boundaries

Sanity Studio quality score

problems found

5. Proposed Multi-App Architecture

folder structure

dependency graph

Sanity structure

shared package plan

cross-app logic

future scalability plan

6. Next Files Needed From Me

List any file paths you require to continue refining.

🚀 Your next action (MANDATORY):

Start with:

“Phase 3: Running full workspace tests…”
→ Then continue logically to Phase 4 and Phase 5.

End of file.