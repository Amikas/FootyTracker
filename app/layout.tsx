import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "./providers"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap' // Add this for better font loading performance
})

export const metadata: Metadata = {
  title: "Footy Tracker - Performance Monitoring for Football Players",
  description:
    "Track and analyze your football training performance with automated data collection and personalized insights.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'