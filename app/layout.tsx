import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Laverie Premium Laundry | Fresh Clothes. Same Day.",
  description:
    "Professional laundry service for your everyday life. 12-hour hotel express laundry, gentle eco-friendly fabric care, and seamless doorstep pickup.",
  keywords: [
    "Laverie Laundry",
    "Hotel Laundry Express",
    "Same Day Laundry",
    "Premium Dry Clean",
    "Bespoke Fabric Care",
  ],
  icons: {
    icon: "/logo/laverie-logo.png",
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
    <html lang="id" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
