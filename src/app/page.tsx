'use client'
import PricingPage from "@/components/Pricing Page/PricingPage"
import SmoothScroll from "./SmoothScroll"
import TestimonialsPage from '@/components/Testimonials/TestimonialsPage';
import WhyChoosePage from '@/components/WhyChoose/WhyChoosePage';
import LastPortal from '@/components/End/LastPortal';
import FinalPage from '@/components/End/FinalPage';
import NavBarAll from '@/components/NavBar/NavBarAll';
import BountiesSection from '@/components/Bounties/BountiesSection';
import { ThemeProvider } from '@/components/End/ThemeChangeContext';
import NavBar3 from '@/components/NavBar/NavBar3';
import MaskedPage from "@/components/Home/PortalReveal";
import Footer from "@/components/Footer/Footerpage";

export default function Home() {
  return (
    <SmoothScroll>
      <ThemeProvider>
        <div id="CompleteHomePage" className="bg-[#09090b] w-full min-h-screen overflow-hidden relative">
          {/* <NavBarAll /> */}
          <NavBar3 />
          <MaskedPage />
          <BountiesSection />
          <WhyChoosePage />
          <PricingPage />
          <TestimonialsPage />
          <LastPortal />
          <FinalPage />
          <Footer />
        </div>
      </ThemeProvider>
    </SmoothScroll>
  )
}
