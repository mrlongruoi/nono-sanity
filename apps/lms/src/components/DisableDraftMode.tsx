// src/components/DisableDraftMode.tsx

"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from "next/navigation";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();
  const router = useRouter();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  const handleClick = async () => {
    try {
      const response = await fetch("/api/draft-mode/disable");

      if (!response.ok) {
        const message = await response.text().catch(() => "");
        console.error(
          "Failed to disable draft mode: non-OK response",
          response.status,
          message
        );
        return; // Do not refresh on failure
      }

      router.refresh();
    } catch (error) {
      console.error("Failed to disable draft mode: network or unexpected error", error);
      // In a real app we might show a toast/notification here instead of silently failing
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 text-black right-4 bg-gray-50 px-4 py-2 z-50"
    >
      Disable Draft Mode
    </button>
  );
}