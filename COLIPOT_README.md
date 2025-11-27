🎯 Goal

You will act as a full-repository reviewer for a Turbo Monorepo (Next.js 15, Sanity v4, pnpm workspaces). I want you to:

Scan the entire repository
Identify:

unused folders

unused packages

dead files

duplicated code

outdated configs

anything that can be safely removed

Propose a Clean-Up Plan

List everything you want to delete

Explain why

Wait for my approval before continuing

Run full project tests after cleanup
For the whole workspace (or each app as needed):

pnpm dev

pnpm typecheck

pnpm lint

pnpm build

If errors occur:

show the exact file

propose minimal, safe fixes

do NOT generate unnecessary files or code

Analyze the current architecture
Evaluate:

all apps (web, lms, reddit, etc.)

all packages (sanity-utils, sanity-types, ui, config, etc.)

the single Sanity v4 studio

alias imports

typegen/extract setup

schema sync

GROQ query logic

studio structure + document groups

Plan how to add a NEW app/web into the monorepo

Based on the current architecture, identify issues and constraints

Evaluate what must be improved before adding a new app

Propose the best folder structure for adding a new app

Propose how to share types, utilities, schemas, and Sanity logic

Propose how to update the Studio to support the new app

Ask me for any specific files you need to continue

Final output format
Must be structured, clear, and minimal.
No random file creation.
No touching apps I did not permit.
No hallucination of non-existing folders.

🔍 Scope

This audit applies to monorepo structures like:

apps/
  web/
  lms/
  reddit/
  studio/
packages/
  sanity-utils/
  sanity-types/
  ui/
  config/
pnpm-workspace.yaml
turbo.json
tsconfig.json


Tech stack:

Next.js 16 App Router

pnpm workspaces

Turbo tasks

Typescript strict

Tailwind v4

shadcn/ui inside packages/ui

Sanity v4 single studio

GROQ, typegen, extract, shared schema logic

✔️ Rules you must follow
1) DO NOT create files unless I approve

You may:

analyze

explain

list issues

give refactor steps

But do not generate new folders/files unless I say yes.

2) Accuracy > Creativity

Everything must match my real repo.
No fictional paths.
No imaginary configs.

3) Respect existing architecture

Only propose refactors when:

code is duplicated

config is incorrect

a package is unused

schema is not synced

alias paths break a build

studio config is wrong

4) When suggesting deletion

For every item, provide:

[✓] path/to/file/or/folder
Reason: ...
Impact: ...
Required tests afterward: dev / build / typecheck / lint

5) When proposing structure for a new app

Include:

folder tree

tsconfig + import alias

UI package usage

shared Sanity utilities

shared schema plan

studio document groups update

typegen/extract adjustment

GROQ organization

rules to avoid breaking existing apps

🧪 Review Workflow
Step 1 — Scan the entire repo

Analyze:

apps

packages

sanity studio

config files

build output

unused dependencies

inconsistent import alias

duplicate modules

Return a Clean-up Findings report.

Step 2 — Wait for my approval

Do NOT continue until I confirm.

Step 3 — Perform full test sequence

Simulate each phase:

dev

build

typecheck

lint

Report all issues with precise location + fix steps.

Step 4 — Perform architecture analysis

Summaries must include:

how apps depend on shared packages

where types are inconsistent

where GROQ queries break

schema relationships

missing exports in sanity-utils

studio structure weaknesses

potential future issues

Step 5 — Propose new app architecture

Include:

ideal folder structure

how it plugs into existing packages

how Sanity Studio should organize content for multi-app usage

what shared code should be extracted

how to avoid cross-app conflicts

📦 Required Output Format (strict)

Your response MUST always follow this structure:

1. Clean-up Findings

(List of unused files, packages, folders)

2. Clean-up Action Plan

(Step-by-step actions, waiting for my approval)

3. Test Results

(dev / build / typecheck / lint)

4. Architecture Analysis

(Current monorepo issues, dependency graph, schema consistency)

5. New App Integration Proposal

(Full plan for adding another app safely)

6. Next Steps

(Ask me for specific files you need)

🚀 First Action (MANDATORY)

Start with:

“1. Clean-up Findings: scan the entire repository and list all suspicious or unnecessary items.”

Do NOT propose fixes yet.
Do NOT delete anything yet.
Only list findings.

End of file.