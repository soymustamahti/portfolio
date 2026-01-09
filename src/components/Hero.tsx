"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useI18n } from "@/i18n/I18nProvider";
import { CONTACT_INFO } from "@/constants";
import { scrollToSection } from "@/utils";
import MagneticButton from "./MagneticButton";
import { GradientText, PulseDot, GlassBadge } from "./ui";

const FloatingOrbs = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    className="absolute inset-0 overflow-hidden pointer-events-none"
  >
    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
    <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
    <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
  </div>
));
FloatingOrbs.displayName = "FloatingOrbs";

interface ContactItemProps {
  icon: string;
  children: React.ReactNode;
  href?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, children, href }) => {
  const content = (
    <>
      <span className="text-xl">{icon}</span>
      {children}
    </>
  );

  const className =
    "flex items-center gap-2 group transition-transform hover:scale-105 duration-300";

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
};

const ScrollIndicator: React.FC<{ text: string }> = ({ text }) => (
  <motion.div
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
  >
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs text-textSecondary uppercase tracking-wider">
        {text}
      </span>
      <motion.svg
        className="w-6 h-6 text-accent"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </motion.svg>
    </div>
  </motion.div>
);

import React from "react";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useI18n();

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
        );

      const ctaChildren = ctaRef.current?.children;
      if (ctaChildren && ctaChildren.length) {
        tl.from(
          ctaChildren,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4"
        );
      }

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

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      <FloatingOrbs ref={orbsRef} />

      <div className="relative z-10 text-center max-w-6xl mx-auto pt-20 sm:pt-0">
        <h1 ref={titleRef} className="mb-6 px-4">
          <GradientText
            className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight block"
            animate
          >
            {t("hero.title")}
          </GradientText>
          <GradientText
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide mt-2 block"
            animate
          >
            El Hachmi Mahti
          </GradientText>
        </h1>

        <div
          ref={subtitleRef}
          className="inline-block px-4 sm:px-8 py-2 sm:py-3 glass rounded-full mb-6 sm:mb-8"
        >
          <div className="text-base sm:text-xl md:text-2xl lg:text-3xl text-textPrimary font-semibold flex items-center justify-center min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem] lg:min-h-[3.5rem]">
            <TypeAnimation
              key={`subtitle-${locale}`}
              sequence={[
                1200, // Wait before starting
                t("hero.subtitle"),
              ]}
              wrapper="span"
              speed={50}
              cursor={true}
              repeat={0}
            />
          </div>
        </div>

        <div
          ref={descRef}
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-textSecondary mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem] px-4"
        >
          <TypeAnimation
            key={`description-${locale}`}
            sequence={[
              2000, // Wait for subtitle to finish
              `${t("hero.description.part1")}\n${t(
                "hero.description.part2"
              )}${t("hero.description.highlight")}.`,
            ]}
            wrapper="p"
            speed={70}
            cursor={true}
            repeat={0}
            style={{ whiteSpace: "pre-line" }}
          />
        </div>

        <div className="text-xs sm:text-sm md:text-lg text-textSecondary mb-8 sm:mb-10 flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-x-4 md:gap-x-6 gap-y-2 sm:gap-y-3 px-4">
          <ContactItem icon="📍">
            <span className="text-center group-hover:text-textPrimary transition-colors">
              {t("resume.location")}
            </span>
          </ContactItem>

          <span className="hidden sm:inline text-accent/30">|</span>

          <ContactItem icon="📧" href={`mailto:${CONTACT_INFO.email}`}>
            <span className="underline hover:text-textPrimary break-all text-center transition-colors text-xs sm:text-sm md:text-base">
              {CONTACT_INFO.email}
            </span>
          </ContactItem>

          <span className="hidden sm:inline text-accent/30">|</span>

          <ContactItem icon="📱" href={`tel:${CONTACT_INFO.phoneRaw}`}>
            <span className="hover:text-textPrimary text-center transition-colors">
              {CONTACT_INFO.phone}
            </span>
          </ContactItem>
        </div>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full px-4 sm:px-0"
        >
          <MagneticButton strength={0.4}>
            <motion.button
              onClick={() => scrollToSection("projects")}
              className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-base sm:text-lg overflow-hidden shadow-lg shadow-blue-500/50 w-full sm:w-auto"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t("common.viewProjects")}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </MagneticButton>

          <MagneticButton strength={0.4}>
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="relative px-8 py-4 sm:px-10 sm:py-5 glass rounded-full font-semibold text-base sm:text-lg text-textPrimary border-2 border-accent/50 hover:border-accent overflow-hidden group w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{t("common.contactMe")}</span>
              <motion.div
                className="absolute inset-0 bg-accent/10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </MagneticButton>
        </div>

        <GlassBadge
          animate
          className="mt-10 sm:mt-16 mb-20 sm:mb-32"
          icon={<PulseDot color="green" />}
        >
          <span className="text-xs sm:text-sm text-textSecondary">
            {t("common.available")}
          </span>
        </GlassBadge>

        <ScrollIndicator text={t("common.scroll")} />
      </div>
    </section>
  );
};

export default Hero;
