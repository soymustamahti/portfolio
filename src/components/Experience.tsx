"use client";

import { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionTitle } from "./ui";

import type { ExperienceItem } from "@/types";
import TimelineDot from "./experience/TimelineDot";
import ExperienceCard from "./experience/ExperienceCard";
import Timeline from "./experience/Timeline";

gsap.registerPlugin(ScrollTrigger);

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
        title: t("exp.syntrix.title"),
        company: t("exp.syntrix.company"),
        location: t("exp.syntrix.location"),
        period: t("exp.syntrix.period"),
        description: t("exp.syntrix.points").split(";").filter(Boolean),
        stack: t("exp.syntrix.stack"),
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
        <SectionTitle>{t("sections.experiences")}</SectionTitle>

        <div className="relative">
          <Timeline
            timelineLineRef={timelineLineRef}
            progressLineRef={progressLineRef}
            arrowRef={arrowRef}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`experience-card relative flex flex-col md:flex-row gap-8 items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <TimelineDot />
                <ExperienceCard experience={exp} index={index} />
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
