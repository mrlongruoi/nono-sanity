import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

if (!projectId) {
  throw new Error(
    "Missing Sanity Studio project ID. Set SANITY_STUDIO_PROJECT_ID in your environment before running the Studio CLI."
  )
}

if (!dataset) {
  throw new Error(
    "Missing Sanity Studio dataset. Set SANITY_STUDIO_DATASET in your environment before running the Studio CLI."
  )
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
