import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import OutletsSection from "@/components/OutletsSection";
import CoreServices from "@/components/CoreServices";
import StatsDark from "@/components/StatsDark";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { getCMSContent } from "@/lib/sheets";
import { OutletsProvider } from "@/context/OutletsContext";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.laveriepremiumlaundry.com/#organization",
      name: "Laverie Premium Laundry",
      url: "https://www.laveriepremiumlaundry.com/",
      logo: "https://www.laveriepremiumlaundry.com/logo/laverie-logo.png",
      sameAs: ["https://www.instagram.com/laverie_laundry/"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.laveriepremiumlaundry.com/#website",
      url: "https://www.laveriepremiumlaundry.com/",
      name: "Laverie Premium Laundry",
      publisher: { "@id": "https://www.laveriepremiumlaundry.com/#organization" },
      inLanguage: "id-ID",
    },
    {
      "@type": "DryCleaningOrLaundry",
      "@id": "https://www.laveriepremiumlaundry.com/#pik",
      name: "Laverie Premium Laundry PIK",
      url: "https://www.laveriepremiumlaundry.com/",
      telephone: "+628170078883",
      description:
        "Layanan laundry premium, laundry express, dan antar jemput di Pantai Indah Kapuk dan Jakarta Utara.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pantai Indah Kapuk",
        addressRegion: "DKI Jakarta",
        addressCountry: "ID",
      },
      openingHours: "Mo-Su 07:30-21:00",
      areaServed: [
        { "@type": "Place", name: "Pantai Indah Kapuk, Jakarta Utara" },
        { "@type": "City", name: "Jakarta Utara" },
      ],
      parentOrganization: { "@id": "https://www.laveriepremiumlaundry.com/#organization" },
      image: "https://www.laveriepremiumlaundry.com/images/hero/laverie-hero-clean.jpg",
    },
    {
      "@type": "DryCleaningOrLaundry",
      "@id": "https://www.laveriepremiumlaundry.com/#greenbay",
      name: "Laverie Premium Laundry GreenBay",
      url: "https://www.laveriepremiumlaundry.com/",
      telephone: "+628170078884",
      description:
        "Layanan laundry premium, valet express, dan antar jemput di GreenBay Pluit, Bay Walk Mall, dan Jakarta Utara.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bay Walk Mall, Jl. Pluit Karang Ayu Barat LGMF 3, RT.20/RW.2",
        addressLocality: "Pluit, Penjaringan",
        addressRegion: "DKI Jakarta",
        postalCode: "14450",
        addressCountry: "ID",
      },
      openingHours: "Mo-Su 07:00-22:00",
      areaServed: [
        { "@type": "Place", name: "GreenBay Pluit, Jakarta Utara" },
        { "@type": "Place", name: "Pluit, Penjaringan" },
        { "@type": "City", name: "Jakarta Utara" },
      ],
      parentOrganization: { "@id": "https://www.laveriepremiumlaundry.com/#organization" },
      image: "https://www.laveriepremiumlaundry.com/images/hero/laverie-hero-clean.jpg",
    },
  ],
};

export default async function Home() {
  const { packages, faqs, testimonials, outlets, products } = await getCMSContent();

  return (
    <OutletsProvider outlets={outlets}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#03070C] text-gray-900 dark:text-[#F8FAFC] transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Philosophy />
          <CoreServices />
          <Packages items={packages} products={products} />
          <FAQ items={faqs} />
          <OutletsSection outlets={outlets} />
          <Testimonials items={testimonials} />
          <StatsDark />
        </main>
        <Footer outlets={outlets} />
      </div>
    </OutletsProvider>
  );
}
