'use client'
import PricingPage from "@/Components/Pricing Page/PricingPage"
import SmoothScroll from "./SmoothScroll"
import TestimonialsPage from '@/Components/Testimonials/TestimonialsPage';
import WhyChoosePage from '@/Components/WhyChoose/WhyChoosePage';
import LastPortal from '@/Components/End/LastPortal';
import FinalPage from '@/Components/End/FinalPage';
import NavBarAll from '@/Components/NavBar/NavBarAll';
import BountiesSection from '@/Components/Bounties/BountiesSection';
import { ThemeProvider } from '@/Components/End/ThemeChangeContext';
import NavBar3 from '@/Components/NavBar/NavBar3';
import MaskedPage from "@/Components/Home/PortalReveal";
import Footer from "@/Components/Footer/Footerpage";

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
