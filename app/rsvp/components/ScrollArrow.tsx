"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

interface ScrollArrowProps {
  targetId: string; // ✅ Explicitly define 'targetId' as a string
}

const ScrollArrow: React.FC<ScrollArrowProps> = ({ targetId }) => {
  useEffect(() => {
    // Animate arrow movement
    gsap.fromTo(
      ".scroll-arrow",
      { y: 0 },
      { y: 15, repeat: -1, yoyo: true, duration: 0.5 }
    );

    return () => {
      gsap.killTweensOf(".scroll-arrow");
    };
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById(targetId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="absolute bottom-8 left-0 right-0 flex justify-center">
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
  );
};

export default ScrollArrow;
