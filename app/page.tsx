import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProcessSteps from "@/components/ProcessSteps";
import About from "@/components/About";
import CoreServices from "@/components/CoreServices";
import StatsDark from "@/components/StatsDark";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getCMSContent } from "@/lib/sheets";
import { OutletsProvider } from "@/context/OutletsContext";

export default async function Home() {
  const { packages, faqs, testimonials, outlets } = await getCMSContent();

  return (
    <OutletsProvider outlets={outlets}>
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#03070C] text-gray-900 dark:text-[#F8FAFC] transition-colors duration-300">
        {/* Top Sticky Navigation */}
        <Navbar />

        {/* Main One-Page Content Sections */}
        <main className="flex-1">
          <Hero />
          <ProcessSteps />
          <About outlets={outlets} />
          <CoreServices />
          <StatsDark />
          <Packages items={packages} />
          <Testimonials items={testimonials} />
          <FAQ items={faqs} />
          <CTA />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </OutletsProvider>
  );
}
