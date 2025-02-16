"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SplitType from "split-type";
import Link from "next/link";
import Image from "next/image";
import ScrollArrow from "../rsvp/components/ScrollArrow";
import useViewportHeight from "../hooks/useViewportHeight";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function InformationSection() {
  const [showArrow, setShowArrow] = useState(false);

  useViewportHeight();

  useEffect(() => {
    // Split the text into words and characters
    new SplitType("#wedding-section-title", {
      types: "words,chars",
    });

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#top-half", // Element to trigger the animation
        start: "top 80%", // Start when the top of #top-half hits 80% of the viewport
        end: "bottom 60%", // End when the bottom of #top-half hits 60% of the viewport
        toggleActions: "play none none none", // Play the animation when in view
      },
    });

    //Animate the "We're getting married!" text
    tl.to(".char", {
      y: 0, // Start off-screen to the left
      stagger: 0.05,
      delay: 0.1,
      duration: 0.11, // Animation duration
      ease: "power3.out", // Smooth easing
    });

    // Animate the date text after the title animation
    tl.from("#wedding-section-date", {
      x: "-200%", // Start off-screen to the left
      opacity: 0, // Start fully transparent
      duration: 2.3, // Animation duration
      ease: "power3.out", // Smooth easing
      // onComplete: () => {
      //   // Add the border to #top-half
      //   const topHalf = document.querySelector("#top-half");
      //   if (topHalf) {
      //     topHalf.style.border = "2px solid var(--top-text-color)";
      //   }
      // },
    });

    // Animate video and set it to loop after animation
    tl.fromTo(
      ".video-container",
      {
        width: "100px",
        height: "100px",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        opacity: 0, // Start hidden
      },
      {
        width: "100%",
        height: "100vh",
        top: "0",
        left: "0",
        x: "0",
        y: "0",
        opacity: 1, // Gradually fade in

        duration: 0.8,
        ease: "power3.out",
        // scrollTrigger: {
        //   trigger: "#video-section",
        //   start: "top center",
        //   end: "bottom center",
        //   toggleActions: "play none none none",
        // },
        onComplete: () => {
          setShowArrow(true);
        },
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div
      id="information-section"
      className="relative w-full h-screen flex flex-col text-[var(--top-background)]"
    >
      {/* Top Half */}
      <div
        id="top-half"
        className="flex flex-col items-center justify-center space-y-4 p-4"
      >
        <div id="section-title">
          <div id="wedding-section-title">
            <h1
              id="wedding-text"
              className="text-[var(--top-background)] uppercase m-0 text-[20px] sm:text-[70px]"
            >
              We are getting married!
            </h1>
          </div>

          <h2
            id="wedding-section-date"
            className="text-[10px] sm:text-[26px] mb-6"
          >
            October 4, 2025 | New Orleans, LA
          </h2>
        </div>
        {/* <RSVP /> */}
      </div>

      {/* Video Section  desktop*/}
      <div className="video-container inset-0 z-0">
        <Image
          className="hidden lg:block"
          id="image-hero"
          src="/2.jpg"
          alt="Hero Image"
          fill
          style={{ objectFit: "cover" }}
          priority
          loading="eager"
        />
        <Image
          className="block lg:hidden"
          id="image-hero"
          src="/5.jpg"
          alt="Hero Image"
          fill
          style={{ objectFit: "cover" }}
          priority
          loading="eager"
        />

        <div className="information-hero absolute inset-0 flex justify-center items-center z-10">
          <div id="option-info" className="flex w-full">
            <div className="flex">
              <div className="button-info w-full text-center pt-3 mt-auto">
                <Link
                  href="/rsvp"
                  className="w-full relative inline-block px-4 py-2 font-medium group"
                >
                  <div className="flex max-w-sm rounded-xl border border-[var(--top-text-color)] p-0.5 shadow-lg">
                    <button className="flex-1 font-bold text-xl bg-white px-6 py-3 rounded-xl text-[var(--top-text-color)]">
                      RSVP
                    </button>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="button-info w-full text-center pt-3 mt-auto">
                <Link
                  href="/registry"
                  className="w-full relative inline-block px-4 py-2 font-medium group"
                >
                  <div className="flex max-w-sm rounded-xl border border-[var(--top-text-color)] p-0.5 shadow-lg">
                    <button className="flex-1 font-bold text-xl bg-white px-6 py-3 rounded-xl text-[var(--top-text-color)]">
                      REGISTRY
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ✅ Scroll Arrow Positioned at Bottom of the Visible Screen */}
      {/* ✅ Keep Scroll Arrow Fixed at the Bottom */}
      {showArrow && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <ScrollArrow targetId="location-section" />
        </div>
      )}
    </div>
  );
}
