import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://continuum.studio"), // REPLACE: Update with actual URL
  title: "Continuum | Training people actually finish.",
  description:
    "Premium training videos, decks, and PDFs—delivered at production speed. First cut in 48 hours, final in 3 business days. Two revision rounds included.",
  keywords: [
    "training videos",
    "corporate training",
    "microlearning",
    "compliance training",
    "training production",
    "e-learning",
    "video production",
    "training assets",
    "LMS content",
  ],
  authors: [{ name: "Continuum" }],
  creator: "Continuum",
  publisher: "Continuum",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://continuum.studio", // REPLACE: Update with actual URL
    siteName: "Continuum",
    title: "Continuum | Training people actually finish.",
    description:
      "Premium training videos, decks, and PDFs—delivered at production speed. First cut in 48 hours, final in 3 business days.",
    images: [
      {
        url: "/og-image.png", // REPLACE: Add actual OG image
        width: 1200,
        height: 630,
        alt: "Continuum - Training people actually finish",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Continuum | Training people actually finish.",
    description:
      "Premium training videos, decks, and PDFs—delivered at production speed.",
    images: ["/og-image.png"], // REPLACE: Add actual OG image
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external resources if any */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip Link for Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Film Grain Overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {children}
      </body>
    </html>
  );
}
