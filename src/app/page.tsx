'use client'
import PricingPage from "@/Components/Pricing Page/PricingPage"
import SmoothScroll from "./SmoothScroll"
import TestimonialsPage from '@/Components/Testimonials/TestimonialsPage';
import WhyChoosePage from '@/Components/WhyChoose/WhyChoosePage';
import LastPortal from '@/Components/End/LastPortal';
import FinalPage from '@/Components/End/FinalPage';
import BountiesSection from '@/Components/Bounties/BountiesSection';
import NavBar3 from '@/Components/NavBar/NavBar3';
import MaskedPage from "@/Components/Home/PortalReveal";
import Footer from "@/Components/Footer/Footerpage";
import { ThemeProvider, useThemeChange } from '@/Components/End/ThemeChangeContext';
import CustomCursor from './../Components/Cursor/Cursor';
import { CursorProvider } from './../Components/Cursor/CursorContext';
import PreloadingElem from './../Components/preloadingComponent';

export default function Home() {
  return (
    <SmoothScroll>
      <ThemeProvider>
        <CursorProvider>
          <HomeElems />
        </CursorProvider>
      </ThemeProvider>
    </SmoothScroll >
  )
}

const HomeElems = () => {
  const { isLoaded } = useThemeChange();

  return (
    <div id="CompleteHomePage" className="bg-[#09090b] w-full min-h-screen overflow-hidden relative">
      <CustomCursor />

      <PreloadingElem />

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
  )
}
