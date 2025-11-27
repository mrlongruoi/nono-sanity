import { FloatingDockClient } from "./FloatingDockClient";
import { getNavigation } from "@workspace/sanity-utils/groq/portfolio";

export async function FloatingDock() {
  const navItems = await getNavigation();

  if (!navItems || navItems.length === 0) {
    return null;
  }

  return <FloatingDockClient navItems={navItems} />;
}
