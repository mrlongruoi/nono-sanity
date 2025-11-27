import type {DocumentActionProps} from 'sanity'

/**
 * Multi-app preview URL resolver for Sanity Presentation Tool
 * Maps document types to their respective Next.js applications
 * 
 * @param props - Document action props from Sanity
 * @returns Preview URL string or null if no preview available
 */
export function resolveProductionUrl(props: DocumentActionProps): string | null {
  const doc = props.published || props.draft
  if (!doc) return null

  const baseUrls = {
    lms: process.env.SANITY_STUDIO_PREVIEW_LMS_URL || 'http://localhost:3000',
    reddit: process.env.SANITY_STUDIO_PREVIEW_REDDIT_URL || 'http://localhost:3001',
  }

  // Extract slug from document
  const slug = (doc.slug as {current?: string})?.current
  if (!slug) return null

  // Map document types to their respective apps and routes
  switch (doc._type) {
    // LMS content types
    case 'course':
      return `${baseUrls.lms}/courses/${slug}`
    case 'lesson':
      return `${baseUrls.lms}/lessons/${slug}`
    
    // Reddit content types
    case 'post':
      return `${baseUrls.reddit}/post/${slug}`
    case 'subreddit':
      return `${baseUrls.reddit}/community/${slug}`
    
    default:
      return null
  }
}
