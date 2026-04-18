import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import DevicePairingSection from "@/components/DevicePairingSection";
import QuantumSection from "@/components/QuantumSection";
import Security from "@/components/Security";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <DevicePairingSection />
        <QuantumSection />
        <Security />
        <GetStarted />
      </main>
      <Footer />
    </>
  );
}
