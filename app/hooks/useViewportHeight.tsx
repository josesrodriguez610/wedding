import { useEffect } from "react";

const useViewportHeight = () => {
  useEffect(() => {
    const setScreenHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setScreenHeight(); // ✅ Set initial viewport height
    window.addEventListener("resize", setScreenHeight); // ✅ Update on resize

    return () => window.removeEventListener("resize", setScreenHeight); // ✅ Cleanup
  }, []);
};

export default useViewportHeight;
