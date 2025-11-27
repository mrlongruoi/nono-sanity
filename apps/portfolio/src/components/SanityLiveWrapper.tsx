/**
 * SanityLive wrapper component
 * Must be rendered in a Server Component (layout)
 * Provides live updates for draft mode
 */

import { SanityLive as SanityLiveComponent } from "@workspace/sanity-utils/live/live.server";

export function SanityLive() {
  return <SanityLiveComponent />;
}
