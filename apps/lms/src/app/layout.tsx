import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { VisualEditing } from "next-sanity/visual-editing";
import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DisableDraftMode } from "@/components/DisableDraftMode"
import { draftMode } from "next/headers";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >

        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
