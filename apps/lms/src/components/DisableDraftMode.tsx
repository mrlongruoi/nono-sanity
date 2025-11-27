// src/components/DisableDraftMode.tsx

"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from "next/navigation";

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();
  const router = useRouter();

  // Only show the disable draft mode button when outside of Presentation Tool
  // environment === "presentation" means we're INSIDE Presentation Tool (hide button)
  // environment === "live" or "unknown" means we're on the actual website (show button)
  if ((environment as string) === "presentation") {
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
      className="fixed bottom-4 right-4 bg-white text-black border-2 border-black px-4 py-2 rounded-md shadow-lg hover:bg-gray-100 transition-colors z-50 font-medium"
    >
      Disable Draft Mode
    </button>
  );
}