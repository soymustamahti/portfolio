"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";
import TiltCard from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  impact?: string;
}

const projects: Project[] = [
  {
    title: "Syntrix - Plateforme Compliance SaaS",
    description:
      "Plateforme complète de gestion de compliance et anti-fraude pour institutions financières avec modules FATCA/CRS et intégration CoreBanking.",
    technologies: ["NextJS", "React", "NestJS", "PostgreSQL", "Kubernetes"],
    category: "SaaS / FinTech",
    impact: "3 clients grands comptes",
  },
  {
    title: "Application Mobile Cross-Platform",
    description:
      "Développement d'une application mobile React Native/Expo avec architecture performante et expérience utilisateur optimisée.",
    technologies: ["React Native", "Expo", "TypeScript", "Redux"],
    category: "Mobile",
    impact: "250 000+ téléchargements",
  },
  {
    title: "Plateforme Web Complexe",
    description:
      "Application React/TypeScript avec interfaces avancées, gestion d'état optimisée et performances améliorées de 30%.",
    technologies: ["React", "TypeScript", "Redux", "Tailwind CSS"],
    category: "Web Application",
    impact: "50 000+ utilisateurs actifs",
  },
  {
    title: "Architecture Microservices",
    description:
      "Conception et implémentation d'une architecture event-driven avec APIs RESTful et WebSockets pour communications temps réel.",
    technologies: ["NestJS", "PostgreSQL", "Redis", "RabbitMQ", "Docker"],
    category: "Backend / Architecture",
    impact: "Haute disponibilité et scalabilité",
  },
  {
    title: "Module Anti-Fraude Temps Réel",
    description:
      "Système de détection d'incidents et alerting automatique avec monitoring temps réel et analytics avancées.",
    technologies: ["NestJS", "Redis", "Elasticsearch", "WebSockets"],
    category: "Security / AI",
    impact: "Détection en temps réel",
  },
  {
    title: "Pipeline Data Engineering",
    description:
      "Intégration BigQuery pour analytics métier avec pipelines de données haute disponibilité et dashboards interactifs.",
    technologies: ["BigQuery", "GCP", "Node.js", "Data Processing"],
    category: "Data Engineering",
    impact: "Analytics métier à grande échelle",
  },
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useI18n();

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
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className="projects-title text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {t("sections.projects")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                projectsRef.current[index] = el;
              }}
            >
              <TiltCard
                className="h-full"
                tiltStrength={10}
                glareEffect={true}
              >
                <motion.div
                  className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300 hover:shadow-2xl group cursor-pointer h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-textPrimary mb-3 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-textSecondary text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {project.impact && (
                    <p className="text-accent text-sm font-semibold mb-4">
                      📊 {project.impact}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/50 text-textSecondary text-xs rounded border border-accent/30 hover:border-accent hover:text-textPrimary transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
