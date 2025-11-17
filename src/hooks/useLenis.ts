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
      });

      function raf(time: number) {
        if (!lenis) return;
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
