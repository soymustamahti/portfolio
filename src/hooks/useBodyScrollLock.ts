"use client";

import { useEffect } from "react";

export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      // Lock scroll
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // Stop Lenis smooth scroll
      document.body.setAttribute("data-lenis-prevent", "true");
      document.documentElement.classList.add("lenis-stopped");
    } else {
      // Unlock scroll
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.removeAttribute("data-lenis-prevent");
      document.documentElement.classList.remove("lenis-stopped");
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.removeAttribute("data-lenis-prevent");
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [isLocked]);
};

export default useBodyScrollLock;
