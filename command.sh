node -e "require('fs').rmSync('./packages/sanity-utils/dist', { recursive: true, force: true })"

pnpm -w -F @workspace/sanity-utils run build

pnpm -w -F studio run typegen

pnpm -w build

pnpm -w lint