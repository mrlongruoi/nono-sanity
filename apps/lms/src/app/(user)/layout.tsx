import { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { SanityLive } from "@workspace/sanity-utils/live/live.server"
import Header from "@/components/Header"
import "@workspace/ui/globals.css"

export const metadata: Metadata = {
  title: "LMS App",
  description: "Learning Management System Application",
}

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {children}
        </main>
      </div>

      <SanityLive/>
    </ClerkProvider>
  )
}
