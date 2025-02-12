import { useState, useEffect } from "react";

export default function useIsPhoneView() {
  const [isPhoneView, setIsPhoneView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPhoneView(window.innerWidth < 640);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isPhoneView;
}
