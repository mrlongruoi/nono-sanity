import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@workspace/ui/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import Header from "@/components/header/Header"
import { SidebarInset, SidebarProvider } from "@workspace/ui"
import { AppSidebar } from "@/components/app-sidebar"
import { SanityLive } from "@workspace/sanity-utils/live/live.server"
import { VisualEditing } from "next-sanity/visual-editing"
import { draftMode } from "next/headers"
import { DisableDraftMode } from "@/components/DisableDraftMode"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Reddit App",
  description: "Reddit Application",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
        >
          <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
              <Header />

              <div className="flex flex-col">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>

          {/* Live content API - always rendered */}
          <SanityLive />
          
          {/* Visual editing overlay - only in draft mode */}
          {isDraftMode && (
            <>
              <VisualEditing />
              <DisableDraftMode />
            </>
          )}
        </body>
      </html>
    </ClerkProvider>
  )
}
