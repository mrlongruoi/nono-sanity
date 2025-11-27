import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@workspace/ui/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import Header from "@/components/header/Header"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SanityLive } from "@workspace/sanity-utils/live"
import { VisualEditingOverlay } from "@/components/VisualEditingOverlay"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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

          <SanityLive />
          <VisualEditingOverlay />
        </body>
      </html>
    </ClerkProvider>
  )
}
