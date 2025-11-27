"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";

/**
 * Disable Draft Mode component
 * Displays a button in draft mode to exit preview
 */
export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  // Only show in draft mode
  if (environment !== "live") return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 transition-colors z-50"
    >
      Disable Draft Mode
    </a>
  );
}
