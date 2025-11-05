"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useI18n } from "../i18n/I18nProvider";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 1.2,
        delay: 0.2,
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ctaRef.current?.children,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4"
        );

      // Animate floating orbs
      if (orbsRef.current) {
        gsap.to(orbsRef.current.children, {
          y: "random(-30, 30)",
          x: "random(-30, 30)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { t } = useI18n();

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Floating orbs */}
      <div
        ref={orbsRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Name with gradient */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight"
          style={{
            background:
              "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            backgroundSize: "200% auto",
            animation: "shimmer 8s linear infinite",
          }}
        >
          {t("hero.title")}
        </h1>

        {/* Title with glass effect */}
        <div
          ref={subtitleRef}
          className="inline-block px-8 py-3 glass rounded-full mb-8"
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-textPrimary font-semibold">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="text-lg md:text-xl lg:text-2xl text-textSecondary mb-12 max-w-4xl mx-auto leading-relaxed font-light"
        >
          {t("hero.description.part1")}
          <br className="hidden md:block" />
          {t("hero.description.part2")}<span className="text-textPrimary font-medium">{t("hero.description.highlight")}</span>.
        </p>

        {/* Contact line to match resume header */}
        <div className="text-sm md:text-base text-textSecondary mb-8">
          <span className="font-semibold text-textPrimary">{t("resume.title")}</span>
          <span className="mx-3">|</span>
          <span>{t("resume.location")}</span>
          <span className="mx-3">|</span>
          <a href="mailto:mustaelhachmimahti@gmail.com" className="underline hover:text-textPrimary">mustaelhachmimahti@gmail.com</a>
          <span className="mx-3">|</span>
          <a href="tel:+33750018388" className="hover:text-textPrimary">0750018388</a>
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="group relative px-10 py-5 bg-white text-black rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span className="relative z-10">{t("common.viewProjects")}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-semibold">{t("common.discover")}</span>
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="px-10 py-5 glass rounded-full font-semibold text-lg text-textPrimary hover:glass-strong transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40"
          >
            {t("common.contactMe")}
          </button>
        </div>

        {/* Floating badge */}
        <div className="mt-16 mb-32 inline-flex items-center gap-3 glass px-6 py-3 rounded-full float">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-textSecondary">{t("common.available")}</span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-textSecondary uppercase tracking-wider">{t("common.scroll")}</span>
            <svg
              className="w-6 h-6 text-textSecondary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
