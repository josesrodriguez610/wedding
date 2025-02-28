"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import "../css/NavBar.css";
import { SignOut } from "./sign-out";

gsap.registerPlugin(CSSRulePlugin);

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const activeItemIndicator = CSSRulePlugin.getRule(
      ".menu-item p#active::after"
    );

    const timeline = gsap.timeline({ paused: true });

    // Define opening animation
    timeline
      .fromTo(
        ".overlay",
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power4.inOut",
        }
      )
      .to(
        ".menu-item p",
        {
          y: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power4.out",
        },
        "-=1"
      )
      .to(
        activeItemIndicator,
        {
          width: "100%",
          duration: 1,
          ease: "power4.out",
          delay: 0.5,
        },
        "<"
      );

    timelineRef.current = timeline;
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      if (isOpen) {
        timelineRef.current.timeScale(1).play();
      } else {
        timelineRef.current.timeScale(2.5).reverse();
      }
    }
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    setIsOpen(false); // Close the menu when navigating
    router.push(path);
  };

  // Highlight the active menu item based on the current route
  const getActiveClass = (path: string) => {
    return pathname === path ? "active" : "";
  };

  // 🔹 Check if the current path is under `/dashboard`
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      <nav className="nav">
        <div className="info">{/* <p>Sergio & Ashley</p> */}</div>
        {/* <div className="logo">
          <p>
            <a href="#">The Elite Portfolio</a>
          </p>
        </div> */}
        {isDashboard && (
          <div className="sign-out-btn">
            <SignOut />
          </div>
        )}
        <div className="toggle-btn">
          <button
            className={`burger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          ></button>
        </div>
      </nav>
      <div className="overlay">
        <div className="overlay-menu">
          {isDashboard ? (
            <>
              <div className="menu-item">
                <p
                  id={getActiveClass("/dashboard")}
                  onClick={() => handleNavigation("/dashboard")}
                >
                  DASHBOARD
                </p>
              </div>
              <div className="menu-item">
                <p
                  id={getActiveClass("/dashboard/analytics")}
                  onClick={() => handleNavigation("/dashboard/analytics")}
                >
                  ANALYTICS
                </p>
              </div>

              <div className="menu-item">
                <p
                  id={getActiveClass("/dashboard/create-user")}
                  onClick={() => handleNavigation("/dashboard/create-user")}
                >
                  CREATE USER
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="menu-item">
                <p
                  id={getActiveClass("/")}
                  onClick={() => handleNavigation("/")}
                >
                  HOME
                </p>
              </div>
              <div className="menu-item">
                <p
                  id={getActiveClass("/rsvp")}
                  onClick={() => handleNavigation("/rsvp")}
                >
                  RSVP
                </p>
              </div>
              <div className="menu-item">
                <p
                  id={getActiveClass("/registry")}
                  onClick={() => handleNavigation("/registry")}
                >
                  REGISTRY
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
