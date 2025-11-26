import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { VisualEditing } from "next-sanity/visual-editing";
import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DisableDraftMode } from "@/components/DisableDraftMode"
import { draftMode } from "next/headers";
import { SanityLive } from "@workspace/sanity-utils/live";

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
        {/* VisualEditing must always be rendered for Presentation Tool connection */}
        <VisualEditing />
        
        {isDraftMode && <DisableDraftMode />}

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SanityLive />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
