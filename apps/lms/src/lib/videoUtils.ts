/**
 * Sanitizes YouTube URLs for ReactPlayer compatibility
 * Removes problematic query parameters that can cause player failures
 * Auto-fixes URLs missing protocol (https://)
 */
export function sanitizeYouTubeUrl(url: string): string {
  try {
    // Handle URLs missing protocol
    let urlToParse = url.trim();
    
    // If URL starts with a dot or domain without protocol, prepend https://
    if (urlToParse.startsWith('.')) {
      urlToParse = 'https://' + urlToParse.substring(1);
    } else if (!urlToParse.startsWith('http://') && !urlToParse.startsWith('https://')) {
      // Check if it looks like a URL without protocol
      if (urlToParse.includes('youtube.com') || urlToParse.includes('youtu.be')) {
        urlToParse = 'https://' + urlToParse;
      }
    }
    
    const urlObj = new URL(urlToParse);
    
    // Check if it's a YouTube URL
    const isYouTube = 
      urlObj.hostname.includes('youtube.com') || 
      urlObj.hostname.includes('youtu.be');
    
    if (!isYouTube) {
      // Not a YouTube URL, return as-is (Vimeo, direct files, etc.)
      return urlToParse;
    }
    
    // Extract video ID from various YouTube URL formats
    let videoId: string | null = null;
    
    if (urlObj.hostname.includes('youtu.be')) {
      // Short URL: https://youtu.be/VIDEO_ID
      const pathParts = urlObj.pathname.slice(1).split('/');
      videoId = pathParts[0] || null;
    } else if (urlObj.pathname.includes('/embed/')) {
      // Embed URL: https://www.youtube.com/embed/VIDEO_ID
      const embedParts = urlObj.pathname.split('/embed/');
      const videoPart = embedParts[1]?.split('/')[0];
      videoId = videoPart || null;
    } else {
      // Watch URL: https://www.youtube.com/watch?v=VIDEO_ID
      videoId = urlObj.searchParams.get('v');
    }
    
    if (!videoId) {
      // Couldn't extract video ID, return fixed URL
      return urlToParse;
    }
    
    // Return clean watch URL format (best compatibility with ReactPlayer)
    return `https://www.youtube.com/watch?v=${videoId}`;
  } catch (error) {
    // Invalid URL, return original with helpful console warning
    console.warn('Failed to sanitize video URL:', url, error);
    
    // Last resort: if it looks like a YouTube URL without protocol, try to fix it
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const fixed = url.startsWith('.') ? 'https://' + url.substring(1) : 'https://' + url;
      console.log('Attempting to fix malformed YouTube URL:', url, '->', fixed);
      return fixed;
    }
    
    return url;
  }
}
