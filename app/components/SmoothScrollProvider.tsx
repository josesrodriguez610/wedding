// components/SmoothScrollProvider.js
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScrollProvider = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Adjust for the smoothness duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing function
      // smooth: true, // Enable smooth scrolling
    });

    // Animation frame for Lenis
    const animate = (time) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Clean up Lenis on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
