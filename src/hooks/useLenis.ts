"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export const useLenis = () => {
  useEffect(() => {
    let lenis: Lenis | undefined;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    // Only initialize Lenis on desktop to avoid mobile scroll issues
    if (isMobile) {
      return;
    }

    const initLenis = () => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: "vertical",
        prevent: (node: Element) => {
          // Prevent Lenis from handling scroll inside chat modal
          return (
            node.closest("[data-lenis-prevent]") !== null ||
            document.documentElement.classList.contains("lenis-stopped")
          );
        },
      });

      function raf(time: number) {
        if (!lenis) return;
        // Check if Lenis should be stopped
        if (document.documentElement.classList.contains("lenis-stopped")) {
          lenis.stop();
        } else {
          lenis.start();
        }
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);
};
