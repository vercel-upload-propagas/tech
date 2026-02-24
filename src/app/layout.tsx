import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Tech Blog - Tutoriais Práticos de Tecnologia",
    template: "%s | Tech Blog",
  },
  description:
    "Aprenda como fazer qualquer coisa relacionada a tecnologia. Tutoriais práticos e passo a passo sobre aplicativos, ferramentas digitais e desenvolvimento.",
  keywords: [
    "tecnologia",
    "tutoriais",
    "programação",
    "desenvolvimento",
    "aplicativos",
    "ferramentas digitais",
    "guia passo a passo",
    "como fazer",
  ],
  authors: [{ name: "Tech Blog" }],
  creator: "Tech Blog",
  publisher: "Tech Blog",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "Tech Blog",
    title: "Tech Blog - Tutoriais Práticos de Tecnologia",
    description:
      "Aprenda como fazer qualquer coisa relacionada a tecnologia. Tutoriais práticos e passo a passo.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tech Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog - Tutoriais Práticos de Tecnologia",
    description:
      "Aprenda como fazer qualquer coisa relacionada a tecnologia. Tutoriais práticos e passo a passo.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      noimageindex: false,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: "/",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Tech Blog",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/favicon.svg`,
  },
  description:
    "Tutoriais práticos de tecnologia, aplicativos e ferramentas digitais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLd),
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
        >
          Pular para o conteúdo
        </a>
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID &&
          process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID !== "ca-pub-xxxxxxxx" && (
            <Script
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
              strategy="afterInteractive"
              crossOrigin="anonymous"
            />
          )}
        {children}
      </body>
    </html>
  );
}
