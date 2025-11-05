"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = (
  ref: RefObject<HTMLElement | null>,
  animation: "fadeIn" | "slideLeft" | "slideRight" | "slideUp" | "scale"
) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    let animationConfig = {};

    switch (animation) {
      case "fadeIn":
        animationConfig = { opacity: 0, y: 50 };
        break;
      case "slideLeft":
        animationConfig = { opacity: 0, x: -100 };
        break;
      case "slideRight":
        animationConfig = { opacity: 0, x: 100 };
        break;
      case "slideUp":
        animationConfig = { opacity: 0, y: 100 };
        break;
      case "scale":
        animationConfig = { opacity: 0, scale: 0.8 };
        break;
    }

    gsap.from(element, {
      ...animationConfig,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [ref, animation]);
};
