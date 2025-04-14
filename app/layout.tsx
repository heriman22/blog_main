import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    template: "%s | Heritier Akilimali",
    default: "Heritier Akilimali's Blog", 
  },
  description: "Personal blog by Heritier Akilimali featuring articles on web development, Next.js, and Sanity CMS",
  keywords: ["Next.js", "Sanity", "Web Development", "Heritier Akilimali", "Blog"],
  authors: [{ name: "Heritier Akilimali" }],
  creator: "Heritier Akilimali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://heritierakilimali.com",
    siteName: "Heritier Akilimali's Blog",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
