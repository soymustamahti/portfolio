"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";
import TiltCard from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

// Project configuration mapping to translation keys
const projectConfigs = [
  {
    key: "archeon",
    slug: "archeon-ai-second-brain",
    liveDemo: "https://archeon.mustapha-elhachmimahti.com",
    technologies: [
      "Graph RAG",
      "Neo4j",
      "Graphiti",
      "FastAPI",
      "NestJS",
      "pgvector",
      "LLaMA 3.1",
      "Celery",
      "React Native",
      "Next.js",
      "TypeScript",
      "Python",
      "Docker",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    key: "chat",
    slug: "real-time-chat-application",
    liveDemo: "https://chat.mustapha-elhachmimahti.com",
    technologies: [
      "Next.js 15",
      "NestJS",
      "Socket.IO",
      "PostgreSQL",
      "Prisma",
      "TypeScript",
      "Tailwind CSS",
      "Cloudflare R2",
      "Docker",
      "Ansible",
    ],
  },
  {
    key: "syntrix",
    slug: "syntrix-legal-services-platform",
    liveDemo: "https://syntrix.mustapha-elhachmimahti.com",
    technologies: [
      "Next.js 15",
      "React 19",
      "NestJS 11",
      "TypeScript 5",
      "Tailwind CSS 4",
      "Docker Compose",
      "Yarn Workspaces",
      "ESLint",
      "Prettier",
      "Jest",
    ],
  },
  {
    key: "coverLetter",
    slug: "ai-powered-cover-letter-generator",
    liveDemo: "https://coverletter.mustapha-elhachmimahti.com",
    technologies: [
      "React 18",
      "TypeScript",
      "Plasmo",
      "NestJS 11",
      "Prisma",
      "OpenAI (DeepSeek)",
      "Google OAuth",
      "Passport.js",
      "JWT",
      "PDF-Lib",
      "Tesseract.js",
      "jsPDF",
      "Docker",
      "PostgreSQL",
    ],
  },
  {
    key: "voiceTrain",
    slug: "voice-controlled-train-route-finder",
    technologies: [
      "Python 3.x",
      "BERT (Transformers)",
      "spaCy 3.7",
      "Neo4j 5.25",
      "TensorFlow/Keras",
      "Speech Recognition",
      "PyAudio",
      "Vosk (Offline STT)",
      "Pandas",
      "Jupyter Notebook",
      "Docker",
      "Graph Algorithms (Dijkstra)",
    ],
  },
  {
    key: "rlSuite",
    slug: "reinforcement-learning-suite",
    technologies: [
      "Python 3.x",
      "Gymnasium",
      "PyTorch",
      "NumPy",
      "TensorBoard",
      "OpenCV",
      "ALE",
      "Pygame",
      "Matplotlib",
      "CUDA",
    ],
  },
  {
    key: "jumbot",
    slug: "jumbot-automated-deployment-bot",
    technologies: [
      "BoltJS",
      "NestJS",
      "RabbitMQ",
      "MongoDB",
      "TypeORM",
      "Docker",
      "Kubernetes",
      "GitLab CI/CD",
      "Slack API",
      "Node.js",
      "TypeScript",
      "Bash Scripting",
      "PostgreSQL",
    ],
  },
];

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
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/90 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center"
            >
              <div className="relative">
                {/* Spinning loader */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full mx-auto mb-4"
                />
                {/* Pulsing center dot */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-5 left-1/2 -translate-x-1/2 w-6 h-6 bg-accent rounded-full"
                />
              </div>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-textPrimary text-lg font-semibold"
              >
                Loading project...
              </motion.p>
              {navigatingProject && (
                <p className="text-textSecondary text-sm mt-2">
                  {navigatingProject
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            {projectConfigs.map((projectConfig, index) => {
              const title = t(`project.${projectConfig.key}.title`);
              const description = t(`project.${projectConfig.key}.description`);
              const category = t(`project.${projectConfig.key}.category`);
              const impact = t(`project.${projectConfig.key}.impact`);

              return (
                <div
                  key={index}
                  ref={(el) => {
                    projectsRef.current[index] = el;
                  }}
                  className="h-full"
                >
                  <TiltCard
                    className="h-full"
                    tiltStrength={10}
                    glareEffect={true}
                  >
                    <motion.div
                      className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300 hover:shadow-2xl group cursor-pointer h-full flex flex-col"
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      onClick={() => handleProjectClick(projectConfig.slug)}
                    >
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                          {category}
                        </span>
                        {projectConfig.liveDemo && (
                          <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-3 py-1 rounded-full flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            {t("common.liveDemo")}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-textPrimary mb-3 group-hover:text-accent transition-colors duration-300">
                        {title}
                      </h3>

                      <p className="text-textSecondary text-sm mb-4 leading-relaxed line-clamp-3">
                        {description}
                      </p>

                      {impact && (
                        <p className="text-accent text-sm font-semibold mb-4">
                          📊 {impact}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 mb-4 flex-grow">
                        {projectConfig.technologies.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-primary/50 text-textSecondary text-xs rounded border border-accent/30 hover:border-accent hover:text-textPrimary transition-all duration-300 h-fit"
                          >
                            {tech}
                          </span>
                        ))}
                        {projectConfig.technologies.length > 6 && (
                          <span className="px-2 py-1 text-textSecondary text-xs h-fit">
                            +{projectConfig.technologies.length - 6} more
                          </span>
                        )}
                      </div>

                      {/* Click to view details indicator */}
                      <div className="mt-auto pt-4 border-t border-accent/20">
                        <div className="flex items-center justify-between text-accent group-hover:text-accentHover transition-colors duration-300">
                          <span className="text-sm font-semibold">
                            {t("common.viewDetails")}
                          </span>
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="group-hover:translate-x-1 transition-transform duration-300"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </motion.svg>
                        </div>
                      </div>
                    </motion.div>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
