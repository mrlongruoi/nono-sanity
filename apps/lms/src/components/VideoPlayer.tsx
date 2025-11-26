"use client";

import { useEffect, useState } from "react";

interface VideoPlayerProps {
  url: string;
}

/**
 * Extract YouTube video ID from various URL formats
 */
function getYouTubeVideoId(url: string): string | null {
  try {
    // Handle URLs without protocol
    let urlToParse = url.trim();
    if (urlToParse.startsWith('.')) {
      urlToParse = 'https://' + urlToParse.substring(1);
    } else if (!urlToParse.startsWith('http://') && !urlToParse.startsWith('https://')) {
      if (urlToParse.includes('youtube.com') || urlToParse.includes('youtu.be')) {
        urlToParse = 'https://' + urlToParse;
      }
    }

    const urlObj = new URL(urlToParse);
    
    // Check if it's a YouTube URL
    const isYouTube = 
      urlObj.hostname.includes('youtube.com') || 
      urlObj.hostname.includes('youtu.be');
    
    if (!isYouTube) return null;
    
    // Extract video ID
    if (urlObj.hostname.includes('youtu.be')) {
      // Short URL: https://youtu.be/VIDEO_ID
      const pathParts = urlObj.pathname.slice(1).split('/');
      return pathParts[0] || null;
    } else if (urlObj.pathname.includes('/embed/')) {
      // Embed URL: https://www.youtube.com/embed/VIDEO_ID
      const embedParts = urlObj.pathname.split('/embed/');
      return embedParts[1]?.split('/')[0] || null;
    } else {
      // Watch URL: https://www.youtube.com/watch?v=VIDEO_ID
      return urlObj.searchParams.get('v');
    }
  } catch (error) {
    console.error('Failed to extract YouTube video ID:', error);
    return null;
  }
}

export const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const videoId = getYouTubeVideoId(url);
  
  // Debug logging
  useEffect(() => {
    console.log("🎥 VideoPlayer - Original URL:", url);
    console.log("🆔 VideoPlayer - Extracted Video ID:", videoId);
  }, [url, videoId]);
  
  if (!mounted) {
    return (
      <div className="relative aspect-video bg-muted animate-pulse rounded-lg" />
    );
  }
  
  if (!videoId) {
    return (
      <div className="relative aspect-video bg-muted rounded-lg flex flex-col items-center justify-center p-6 text-center">
        <p className="text-sm font-medium mb-2">Invalid YouTube URL</p>
        <p className="text-xs text-muted-foreground">Could not extract video ID from: {url}</p>
      </div>
    );
  }
  
  if (hasError) {
    return (
      <div className="relative aspect-video bg-muted rounded-lg flex flex-col items-center justify-center p-6 text-center">
        <p className="text-sm font-medium mb-2">Failed to load video</p>
        <p className="text-xs text-muted-foreground mb-4">Video ID: {videoId}</p>
        <button 
          onClick={() => setHasError(false)}
          className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }
  
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=1`;
  
  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        key={videoId}
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full border-0"
        onError={() => {
          console.error("❌ YouTube iframe failed to load");
          setHasError(true);
        }}
        onLoad={() => console.log("✅ YouTube iframe loaded for video:", videoId)}
      />
    </div>
  );
};