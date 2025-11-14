"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";
import TiltCard from "./TiltCard";
import { ProjectDetails } from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

// Project configuration mapping to translation keys
const projectConfigs = [
  {
    key: "chat",
    slug: "real-time-chat-application",
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
  {
    key: "myActual",
    slug: "my-actual-enterprise-hr-platform",
    technologies: [
      "React",
      "TypeScript",
      "React Native",
      "Expo",
      "Laravel",
      "PHP",
      "PostgreSQL",
      "Elasticsearch",
      "Redis",
      "Google Cloud Platform",
      "Kubernetes",
      "BigQuery",
      "GitHub Actions",
    ],
  },
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();
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
              >
                <TiltCard className="h-full" tiltStrength={10} glareEffect={true}>
                  <motion.div
                    className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300 hover:shadow-2xl group cursor-pointer h-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => router.push(`/projects/${projectConfig.slug}`)}
                  >
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-textPrimary mb-3 group-hover:text-accent transition-colors duration-300">
                      {title}
                    </h3>

                    <p className="text-textSecondary text-sm mb-4 leading-relaxed">
                      {description}
                    </p>

                    {impact && (
                      <p className="text-accent text-sm font-semibold mb-4">
                        📊 {impact}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {projectConfig.technologies.map((tech) => (
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
