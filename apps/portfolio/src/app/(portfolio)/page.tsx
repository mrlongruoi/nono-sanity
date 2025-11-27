import PortfolioContent from "@/components/PortfolioContent";

// Force dynamic rendering to avoid defineLive execution at build time
export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="min-h-screen">
      <PortfolioContent />
    </main>
  );
}
