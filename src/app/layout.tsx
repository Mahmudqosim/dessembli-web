import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Auth from "@/components/auth/Auth"
import Navbar from "@/components/Navbar"
import { isAuthenticated } from "@/utils/amplify-utils"
import config from "@/../amplify_outputs.json"
import "@aws-amplify/ui-react/styles.css"
import { Amplify } from "aws-amplify"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dessembli",
  description: "Create your own page.",
}

Amplify.configure(config, { ssr: true })

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar isSignedIn={await isAuthenticated()} />
        <Auth>{children}</Auth>
      </body>
    </html>
  )
}
