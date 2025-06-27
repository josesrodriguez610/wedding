"use client";
import HeroSection from "./sections/HeroSection";
// import InformationSection from "./sections/InformationSection";
import LocationSection from "./sections/LocationSection";
import StoryOfUsSection from "./sections/StoryOfUsSection";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer";
import VisitingSection from "./sections/VisitingSection";
import WhatsGoingDown from "./sections/WhatsGoingDown";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash) {
      const section = document.getElementById(
        window.location.hash.substring(1)
      );
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth", block: "start" }); // ✅ Scroll properly

          // ✅ Wait for the scroll animation to complete (~600ms delay)
          setTimeout(() => {
            router.replace("/", { scroll: false }); // ✅ Removes hash without reloading
          }, 600);
        }, 100); // Small delay ensures section is in view
      }
    }
  }, [router]);

  return (
    <div>
      <HeroSection />
      {/* <InformationSection /> */}
      <LocationSection />
      <StoryOfUsSection />
      <WhatsGoingDown />
      <VisitingSection />

      <Footer />
    </div>
  );
}
