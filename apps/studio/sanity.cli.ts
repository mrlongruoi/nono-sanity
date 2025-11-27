import {defineCliConfig} from 'sanity/cli'

// Use env vars or fallback to hardcoded values for CLI commands
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '51lh57k2'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: 'app-lms',
  deployment: {
    appId: 'pai8iij9fnj14hhrsfs0f3f6',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  },
})
