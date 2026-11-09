import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Libre_Baskerville, Manrope } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://www.laveriepremiumlaundry.com";
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const canela = localFont({
  src: [
    {
      path: "./fonts/Canela-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Canela-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Canela-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-subheadline",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Laundry Premium Jakarta & Jakarta Utara | Laverie Premium Laundry",
    template: "%s | Laverie Premium Laundry",
  },
  description:
    "Cari laundry premium di Jakarta? Laverie melayani laundry express, perawatan pakaian premium, serta antar jemput di PIK, GreenBay Pluit, dan area Jakarta Utara. Hubungi outlet kami untuk pemesanan.",
  applicationName: "Laverie Premium Laundry",
  keywords: [
    "laundry premium Jakarta",
    "laundry Jakarta Utara",
    "laundry PIK",
    "laundry GreenBay Pluit",
    "laundry Pluit",
    "laundry express Jakarta",
    "laundry antar jemput Jakarta",
    "laundry hotel Jakarta",
    "laundry apartemen Jakarta Utara",
    "laundry premium PIK",
    "laundry premium Pluit",
    "Laverie Premium Laundry",
    "perawatan pakaian premium",
    "dry cleaning Jakarta",
  ],
  authors: [{ name: "Laverie Premium Laundry" }],
  creator: "Laverie Premium Laundry",
  publisher: "Laverie Premium Laundry",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Laverie Premium Laundry",
    title: "Laundry Premium Jakarta & Jakarta Utara | Laverie",
    description:
      "Laundry premium, express, dan antar jemput di PIK serta GreenBay Pluit. Perawatan pakaian profesional untuk hotel, apartemen, dan hunian di Jakarta Utara.",
    images: [
      {
        url: "/images/hero/laverie-hero-clean.jpg",
        alt: "Laverie Premium Laundry Jakarta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laundry Premium Jakarta | Laverie Premium Laundry",
    description:
      "Laundry premium dan express dengan layanan antar jemput di PIK, GreenBay Pluit, dan Jakarta Utara.",
    images: ["/images/hero/laverie-hero-clean.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo/laverie-icon.png",
    shortcut: "/logo/laverie-icon.png",
    apple: "/logo/laverie-icon.png",
  },
  verification: {
    google: "2X7rjRsxv6UETDTSsI76m5HaislNdE5uGmAob0UyeTI",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${libreBaskerville.variable} ${canela.variable} ${manrope.variable} ${jakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased transition-colors duration-300">
        {/* Google Tag Manager fallback for browsers with JavaScript disabled */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PXH657QD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        {/* Initialize dataLayer before loading the GTM container. */}
        <Script
          id="google-tag-manager-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              window.dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
              });
            `,
          }}
        />
        <Script
          id="google-tag-manager"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-PXH657QD"
          strategy="afterInteractive"
        />

        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
