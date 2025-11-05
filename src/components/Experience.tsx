"use client";

import { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "../i18n/I18nProvider";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  stack?: string;
}
 

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  const experiences: ExperienceItem[] = useMemo(
    () => [
      {
        title: t("exp.actual.title"),
        company: t("exp.actual.company"),
        location: t("exp.actual.location"),
        period: t("exp.actual.period"),
        description: t("exp.actual.points").split(";").filter(Boolean),
        stack: t("exp.actual.stack"),
      },
      {
        title: t("exp.bizness.title"),
        company: t("exp.bizness.company"),
        location: t("exp.bizness.location"),
        period: t("exp.bizness.period"),
        description: t("exp.bizness.points").split(";").filter(Boolean),
        stack: t("exp.bizness.stack"),
      },
      {
        title: t("exp.jump.title"),
        company: t("exp.jump.company"),
        location: t("exp.jump.location"),
        period: t("exp.jump.period"),
        description: t("exp.jump.points").split(";").filter(Boolean),
        stack: t("exp.jump.stack"),
      },
      {
        title: t("exp.syntrix.title"),
        company: t("exp.syntrix.company"),
        location: t("exp.syntrix.location"),
        period: t("exp.syntrix.period"),
        description: t("exp.syntrix.points").split(";").filter(Boolean),
        stack: t("exp.syntrix.stack"),
      },
    ],
    [t]
  );

  useEffect(() => {
    if (!sectionRef.current || !progressLineRef.current || !arrowRef.current)
      return;

    const ctx = gsap.context(() => {
      // Animate the progress line as you scroll
      gsap.to(progressLineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1, // Smooth scrubbing effect
        },
      });

      // Animate the arrow to follow the line
      gsap.to(arrowRef.current, {
        y: "0",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      // Animate each experience card
      const cards = sectionRef.current?.querySelectorAll(".experience-card");
      cards?.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          {t("sections.experiences")}
        </h2>

        <div className="relative">
          {/* Static timeline line (background) */}
          <div
            ref={timelineLineRef}
            className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-accent/20"
          ></div>

          {/* Animated progress line (grows as you scroll) */}
          <div
            ref={progressLineRef}
            className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-accent to-purple-500 h-0 z-10"
            style={{ top: 0 }}
          >
            {/* Animated arrow at the end of the line */}
            <div
              ref={arrowRef}
              className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 z-20"
              style={{ top: "100%" }}
            >
              {/* Arrow/Triangle pointing down */}
              <div className="relative">
                {/* Glowing circle */}
                <div className="w-6 h-6 bg-accent rounded-full shadow-lg shadow-accent/50 animate-pulse flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

                {/* Arrow pointer */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 top-4"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "8px solid #3b82f6",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`experience-card relative flex flex-col md:flex-row gap-8 items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot with pulse animation */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20">
                  <div className="relative">
                    <div className="w-4 h-4 bg-accent rounded-full border-4 border-primary"></div>
                    {/* Pulse ring */}
                    <div className="absolute top-0 left-0 w-4 h-4 bg-accent rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
                    <h3 className="text-2xl font-bold text-accent mb-2">
                      {exp.title}
                    </h3>
                    <h4 className="text-xl font-semibold text-textPrimary mb-1">
                      {exp.company}
                    </h4>
                    <p className="text-textSecondary text-sm mb-4">
                      {exp.location} | {exp.period}
                    </p>

                    <ul
                      className={`space-y-2 mb-4 ${
                        index % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-textSecondary text-sm">
                          • {item}
                        </li>
                      ))}
                    </ul>

                    {exp.stack && (
                      <div className="pt-4 border-t border-accent/20">
                        <p className="text-xs text-textSecondary">
                          <span className="font-semibold text-accent">{t("labels.stack")}: </span>{" "}
                          {exp.stack}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
