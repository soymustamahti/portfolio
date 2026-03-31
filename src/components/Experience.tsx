"use client";

import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionTitle } from "./ui";

import type { ExperienceItem } from "@/types";
import TimelineDot from "./experience/TimelineDot";
import ExperienceCard from "./experience/ExperienceCard";
import ExperienceModal from "./experience/ExperienceModal";
import Timeline from "./experience/Timeline";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_QUERY_PARAM = "experience";
const EXPERIENCE_SCROLL_TARGET = "experience";

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [selectedExperienceId, setSelectedExperienceId] = useState<
    string | null
  >(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const egobisProjectArchitecture = t("project.archeon.architecture")
    .split(";")
    .filter(Boolean);
  const egobisProjectFeatures = t("project.archeon.features")
    .split(";")
    .filter(Boolean);
  const egobisProjectResults = [
    t("project.archeon.impact"),
    egobisProjectFeatures[1],
    egobisProjectFeatures[2],
    egobisProjectFeatures[7],
    egobisProjectFeatures[13],
  ].filter(Boolean);

  const experiences: ExperienceItem[] = useMemo(
    () => [
      {
        id: "egobis",
        title: t("exp.syntrix.title"),
        company: t("exp.syntrix.company"),
        location: t("exp.syntrix.location"),
        period: t("exp.syntrix.period"),
        description: t("exp.syntrix.points").split(";").filter(Boolean),
        stack: t("exp.syntrix.stack"),
        detailsSections: [
          {
            title: t("experience.contextAndObjectives"),
            items: [
              t("project.archeon.description"),
              t("project.archeon.fullDescription"),
            ].filter(Boolean),
          },
          {
            title: t("experience.technicalEnvironment"),
            items: egobisProjectArchitecture,
          },
          {
            title: t("experience.achievements"),
            items: egobisProjectFeatures,
          },
          {
            title: t("experience.results"),
            items: egobisProjectResults,
          },
        ],
        relatedProjectHref: "/projects/egobis-ai-knowledge-management",
        relatedProjectTitle: "Egobis",
      },
      {
        id: "actual",
        title: t("exp.actual.title"),
        company: t("exp.actual.company"),
        location: t("exp.actual.location"),
        period: t("exp.actual.period"),
        description: t("exp.actual.points").split(";").filter(Boolean),
        stack: t("exp.actual.stack"),
        detailsSections: [
          {
            title: t("experience.contextAndObjectives"),
            items: t("exp.actual.context").split(";").filter(Boolean),
          },
          {
            title: t("experience.technicalEnvironment"),
            items: t("exp.actual.environment").split(";").filter(Boolean),
          },
          {
            title: t("experience.achievements"),
            items: t("exp.actual.points").split(";").filter(Boolean),
          },
          {
            title: t("experience.results"),
            items: t("exp.actual.results").split(";").filter(Boolean),
          },
        ],
      },
      {
        id: "bizness",
        title: t("exp.bizness.title"),
        company: t("exp.bizness.company"),
        location: t("exp.bizness.location"),
        period: t("exp.bizness.period"),
        description: t("exp.bizness.points").split(";").filter(Boolean),
        stack: t("exp.bizness.stack"),
        detailsSections: [
          {
            title: t("experience.contextAndObjectives"),
            items: t("exp.bizness.context").split(";").filter(Boolean),
          },
          {
            title: t("experience.technicalEnvironment"),
            items: t("exp.bizness.environment").split(";").filter(Boolean),
          },
          {
            title: t("experience.achievements"),
            items: t("exp.bizness.points").split(";").filter(Boolean),
          },
          {
            title: t("experience.results"),
            items: t("exp.bizness.results").split(";").filter(Boolean),
          },
        ],
      },
      {
        id: "jump",
        title: t("exp.jump.title"),
        company: t("exp.jump.company"),
        location: t("exp.jump.location"),
        period: t("exp.jump.period"),
        description: t("exp.jump.points").split(";").filter(Boolean),
        stack: t("exp.jump.stack"),
        detailsTabs: [
          {
            id: "mission-1",
            label: t("experience.mission1"),
            sections: [
              {
                title: t("experience.contextAndObjectives"),
                items: t("exp.jump.mission1.context").split(";").filter(Boolean),
              },
              {
                title: t("experience.technicalEnvironment"),
                items: t("exp.jump.mission1.environment")
                  .split(";")
                  .filter(Boolean),
              },
              {
                title: t("experience.achievements"),
                items: t("exp.jump.mission1.achievements")
                  .split(";")
                  .filter(Boolean),
              },
              {
                title: t("experience.results"),
                items: t("exp.jump.mission1.results").split(";").filter(Boolean),
              },
            ],
          },
          {
            id: "mission-2",
            label: t("experience.mission2"),
            sections: [
              {
                title: t("experience.contextAndObjectives"),
                items: t("exp.jump.mission2.context").split(";").filter(Boolean),
              },
              {
                title: t("experience.technicalEnvironment"),
                items: t("exp.jump.mission2.environment")
                  .split(";")
                  .filter(Boolean),
              },
              {
                title: t("experience.achievements"),
                items: t("exp.jump.mission2.achievements")
                  .split(";")
                  .filter(Boolean),
              },
              {
                title: t("experience.results"),
                items: t("exp.jump.mission2.results").split(";").filter(Boolean),
              },
            ],
          },
        ],
      },
    ],
    [egobisProjectArchitecture, egobisProjectFeatures, egobisProjectResults, t]
  );
  const selectedExperience =
    experiences.find((experience) => experience.id === selectedExperienceId) ??
    null;
  const experienceParam = searchParams.get(EXPERIENCE_QUERY_PARAM);

  const updateExperienceQueryParam = useCallback(
    (experienceId: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (experienceId) {
        params.set(EXPERIENCE_QUERY_PARAM, experienceId);
        params.set("scrollTo", EXPERIENCE_SCROLL_TARGET);
      } else {
        params.delete(EXPERIENCE_QUERY_PARAM);

        if (params.get("scrollTo") === EXPERIENCE_SCROLL_TARGET) {
          params.delete("scrollTo");
        }
      }

      const queryString = params.toString();
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      const href = queryString
        ? `${pathname}?${queryString}${hash}`
        : `${pathname}${hash}`;

      router.replace(href, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const handleOpenExperience = useCallback(
    (experienceId: string) => {
      setSelectedExperienceId(experienceId);
      updateExperienceQueryParam(experienceId);
    },
    [updateExperienceQueryParam]
  );

  const handleCloseExperience = useCallback(() => {
    setSelectedExperienceId(null);
    updateExperienceQueryParam(null);
  }, [updateExperienceQueryParam]);

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

  useEffect(() => {
    if (!experienceParam) {
      setSelectedExperienceId(null);
      return;
    }

    const matchingExperience = experiences.find(
      (experience) => experience.id === experienceParam
    );

    setSelectedExperienceId(matchingExperience?.id ?? null);
  }, [experienceParam, experiences]);

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
                key={exp.id}
                className={`experience-card relative flex flex-col md:flex-row gap-8 items-stretch ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <TimelineDot />
                <ExperienceCard
                  experience={exp}
                  index={index}
                  onOpen={handleOpenExperience}
                />
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ExperienceModal
        experience={selectedExperience}
        onClose={handleCloseExperience}
      />
    </section>
  );
};

export default Experience;
