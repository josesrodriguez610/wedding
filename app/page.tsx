"use client";
import HeroSection from "./sections/HeroSection";
import InformationSection from "./sections/InformationSection";
import LocationSection from "./sections/LocationSection";
import StoryOfUsSection from "./sections/StoryOfUsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <InformationSection />
      <LocationSection />
      <StoryOfUsSection />
    </div>
  );
}
