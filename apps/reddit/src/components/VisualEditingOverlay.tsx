"use client";

import { VisualEditing } from "next-sanity/visual-editing";
import { useEffect, useState } from "react";

/**
 * Visual Editing Overlay for Sanity Studio integration
 * Renders Sanity's visual editing tools when in draft mode
 */
export function VisualEditingOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server
  if (!mounted) return null;

  return <VisualEditing />;
}
