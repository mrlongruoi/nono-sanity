import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { VisualEditing } from "next-sanity/visual-editing";
import "@workspace/ui/globals.css"
import { DisableDraftMode } from "@/components/DisableDraftMode"
import { draftMode } from "next/headers";
import { SanityLive } from "@workspace/sanity-utils/live/live.server";
import { Providers } from "@workspace/ui/providers";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "LMS App",
  description: "Learning Management System Application",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
          
          {/* Live content API - always rendered */}
          <SanityLive />
          
          {/* Visual editing overlay - only in draft mode */}
          {isDraftMode && (
            <>
              <VisualEditing />
              <DisableDraftMode />
            </>
          )}
        </Providers>
      </body>
    </html>
  )
}
