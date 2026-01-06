"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useI18n } from "@/i18n/I18nProvider";
import { PROJECT_CONFIGS } from "@/constants";
import { slugToTitle } from "@/utils";
import { LoadingOverlay, SectionTitle } from "./ui";
import ProjectCard from "./projects/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();
  const { t } = useI18n();
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingProject, setNavigatingProject] = useState<string | null>(
    null
  );

  const handleProjectClick = (slug: string) => {
    setIsNavigating(true);
    setNavigatingProject(slug);
    // Add a small delay to show the loading animation
    setTimeout(() => {
      router.push(`/projects/${slug}`);
    }, 300);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on title
      gsap.to(".projects-title", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Stagger animation for project cards
      projectsRef.current.forEach((project, index) => {
        if (project) {
          gsap.from(project, {
            opacity: 0,
            y: 100,
            rotateX: -15,
            scale: 0.85,
            duration: 1,
            delay: index * 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: project,
              start: "top 90%",
              end: "top 60%",
              toggleActions: "play none none reverse",
              scrub: 0.5,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={isNavigating}
        title="Loading project..."
        subtitle={
          navigatingProject ? slugToTitle(navigatingProject) : undefined
        }
      />

      <section
        id="projects"
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          <SectionTitle className="projects-title">
            {t("sections.projects")}
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {PROJECT_CONFIGS.map((projectConfig, index) => (
              <div
                key={projectConfig.key}
                ref={(el) => {
                  projectsRef.current[index] = el;
                }}
                className="h-full"
              >
                <ProjectCard
                  projectConfig={projectConfig}
                  onClick={() => handleProjectClick(projectConfig.slug)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
