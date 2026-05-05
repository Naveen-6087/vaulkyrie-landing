import Navbar from "@/components/Navbar";
import SitePreloader from "@/components/SitePreloader";
import Hero from "@/components/Hero";
import VaultModels from "@/components/VaultModels";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import DevicePairingSection from "@/components/DevicePairingSection";
import ThresholdSigningSection from "@/components/ThresholdSigningSection";
import UmbraStory from "@/components/UmbraStory";
import QuantumSection from "@/components/QuantumSection";
import FAQ from "@/components/FAQ";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SitePreloader />
      <Navbar />
      <main>
        <Hero />
        <VaultModels />
        <Features />
        <HowItWorks />
        <DevicePairingSection />
        <ThresholdSigningSection />
        <UmbraStory />
        <QuantumSection />
        <FAQ />
        <GetStarted />
      </main>
      <Footer />
    </>
  );
}
