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
    portfolio: process.env.SANITY_STUDIO_PREVIEW_PORTFOLIO_URL || 'http://localhost:3002',
  }

  // Extract slug from document
  const slug = (doc.slug as {current?: string})?.current

  // Map document types to their respective apps and routes
  switch (doc._type) {
    // LMS content types
    case 'course':
      if (!slug) return null
      return `${baseUrls.lms}/courses/${slug}`
    case 'lesson':
      if (!slug) return null
      return `${baseUrls.lms}/lessons/${slug}`
    
    // Reddit content types
    case 'post':
      if (!slug) return null
      return `${baseUrls.reddit}/post/${slug}`
    case 'subreddit':
      if (!slug) return null
      return `${baseUrls.reddit}/community/${slug}`
    
    // Portfolio content types
    case 'project':
      if (!slug) return null
      return `${baseUrls.portfolio}/projects/${slug}`
    case 'blog':
      if (!slug) return null
      return `${baseUrls.portfolio}/blog/${slug}`
    case 'profile':
      // Profile is singleton, no slug needed
      return baseUrls.portfolio
    case 'achievement':
      return `${baseUrls.portfolio}#achievements`
    case 'skill':
      return `${baseUrls.portfolio}#skills`
    
    default:
      return null
  }
}
