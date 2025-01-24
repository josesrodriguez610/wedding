"use client";

import { useEffect } from "react";
import Registry from "../components/Registry";
import RSVP from "../components/RSVP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SplitType from "split-type";
import Link from "next/link";
// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function InformationSection() {
  useEffect(() => {
    // Split the text into words and characters
    const splitTitle = new SplitType("#wedding-section-title", {
      types: "words, chars",
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
      duration: 2.8, // Animation duration
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
          // Target the visible video based on the viewport
          const desktopVideo = document.querySelector(".video-desktop");
          const mobileVideo = document.querySelector(".video-mobile");

          // Check if desktop or mobile video is visible
          const isDesktop = window.innerWidth >= 1024; // Adjust breakpoint if needed
          const video = isDesktop ? desktopVideo : mobileVideo;

          if (video) {
            video.muted = true;
            video.loop = true;
            video.play();
          }
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
      className="bg-[#fbcbbc] w-full h-screen flex flex-col text-[var(--top-background)]"
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

      {/* Video Section */}
      <div className="video-container inset-0 z-0">
        <video
          className="video-desktop w-full h-full object-cover hidden lg:block"
          src="/movies/mia-and-millie.mp4"
          type="video/mp4"
        >
          Your browser does not support the video tag.
        </video>
        <video
          className="video-mobile w-full h-full object-cover block lg:hidden"
          src="/movies/mia-and-millie-phone-vertical.mp4"
          type="video/mp4"
        >
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 flex justify-center items-center z-10">
          <div id="option-info" className="flex justify-around w-full">
            <div className="flex flex-col items-center">
              <div className="max-w-xs px-4">
                <p className="text-image-info text-white text-lg font-semibold">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className="button-info w-full text-center pt-3 mt-auto">
                <Link
                  href="/rsvp"
                  className="w-full relative inline-block px-4 py-2 font-medium group"
                >
                  <span className="absolute inset-0 w-full h-full transition-transform ease-in-out transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-[var(--top-background)] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-[var(--top-text-color)] border-2 border-[var(--top-background)] group-hover:border-[var(--top-text-color)] group-hover:bg-[var(--top-background)]"></span>
                  <span className="relative text-[var(--top-background)] text-3xl font-bold group-hover:text-[var(--top-text-color)] ease-in-out">
                    RSVP
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="max-w-xs px-4">
                <p className="text-image-info text-white text-lg font-semibold">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className="button-info w-full text-center pt-3 mt-auto">
                <Link
                  href="/registry"
                  className="w-full relative inline-block px-4 py-2 font-medium group"
                >
                  <span className="absolute inset-0 w-full h-full transition-transform ease-in-out transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-[var(--top-background)] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-[var(--top-text-color)] border-2 border-[var(--top-background)] group-hover:border-[var(--top-text-color)] group-hover:bg-[var(--top-background)]"></span>
                  <span className="relative text-[var(--top-background)] text-3xl font-bold group-hover:text-[var(--top-text-color)] ease-in-out">
                    REGISTRY
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
