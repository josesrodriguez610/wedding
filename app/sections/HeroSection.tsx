"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { slides } from "../utils/variables";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(slides[0]); // Store
  const [scrollIconAnimation, setScrollIconAnimation] = useState(false);
  const [isPhoneView, setIsPhoneView] = useState(false); // Tracks if the viewport is a phone

  useEffect(() => {
    // Check if the viewport is smaller than 640px
    const handleResize = () => {
      setIsPhoneView(window.innerWidth < 640);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const setScreenHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setScreenHeight();
    window.addEventListener("resize", setScreenHeight);

    return () => window.removeEventListener("resize", setScreenHeight);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const currentIndex = slides.indexOf(prevSlide);
        const nextIndex = (currentIndex + 1) % slides.length;

        if (nextIndex === slides.length - 1 && scrollIconAnimation === false) {
          setScrollIconAnimation(true);
        }

        return slides[nextIndex]; // Update the current slide
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  });

  useEffect(() => {
    if (scrollIconAnimation) {
      // Animate the arrow when on the last slide
      gsap.fromTo(
        ".scroll-arrow",
        { y: 0 },
        { y: 15, repeat: -1, yoyo: true, duration: 0.5 }
      );
    } else {
      // Remove animation if leaving the last slide
      gsap.killTweensOf(".scroll-arrow");
    }
  }, [scrollIconAnimation]);

  const scrollToNextSection = () => {
    console.log("hi");
    const nextSection = document.getElementById("information-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { image, text, layout } = currentSlide;
  const isTextLeft = layout === "text-left";

  return (
    <div
      id="hero-section-container"
      className="h-[calc(var(--vh)*100)] w-full bg-gray-100 flex items-center justify-center"
    >
      <div
        className={`flex ${
          isPhoneView
            ? isTextLeft
              ? "flex-col"
              : "flex-col-reverse"
            : isTextLeft
            ? "flex-row"
            : "flex-row-reverse"
        } w-full h-full`}
      >
        {/* Image Section */}
        <div
          id="image-container"
          className="flex-1 w-full h-1/2 sm:h-full relative"
        >
          <Image
            id="image-hero"
            src={image}
            alt="Hero Image"
            fill
            style={{ objectFit: "cover" }}
            priority
            loading="eager"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 w-full h-1/2 sm:h-full flex items-center justify-center p-8 bg-[var(--top-background)]">
          <div className="text-[var(--top-text-color)] font-thin">
            <h1
              id="text-first"
              className="leading-[40px] text-[32px] sm:leading-[80px] sm:text-[76px]"
            >
              {text.primary}
              <br />
              {text.secondary}
            </h1>
            <h1
              id="text-second"
              style={{ fontFamily: "var(--font-canopee)" }}
              className="pt-4 sm:pt-10 leading-[50px] text-[36px] sm:leading-[110px] sm:text-[96px] text-right"
            >
              {text.highlight}
            </h1>
          </div>
        </div>
      </div>
      {/* Arrow Section */}
      {scrollIconAnimation && (
        <div className="absolute bottom-8 w-full flex justify-center">
          <div className="scroll-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-[var(--top-text-color)] cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={scrollToNextSection}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
