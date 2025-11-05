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

// Create slug from title
const createSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const projects: ProjectDetails[] = [
  {
    title: "Real-Time Chat Application",
    description:
      "Production-ready full-stack chat platform with Google OAuth, direct messaging, group chats, and real-time media sharing.",
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
    category: "Full-Stack / Real-Time",
    impact: "Monorepo with 100+ files, 95% TypeScript",
    fullDescription:
      "A sophisticated enterprise-grade messaging platform built with modern technologies, featuring Google OAuth authentication, direct messaging, group chats with up to 50 members, and real-time media sharing capabilities. The application employs a monorepo architecture with TypeScript throughout (95% of codebase), ensuring complete type safety across the entire stack. Deployed with Docker containerization and Ansible automation for production-ready infrastructure.",
    features: [
      "Google OAuth 2.0 authentication with secure JWT token management and refresh tokens",
      "Real-time bidirectional messaging via WebSockets with Socket.IO and automatic reconnection",
      "Group chats supporting up to 50 concurrent members with role-based permissions",
      "Media sharing with drag-and-drop support (images, GIFs) and presigned URL generation",
      "Typing indicators showing active typists in real-time with debouncing",
      "Message read receipts and delivery status tracking across multiple users",
      "Online/offline status tracking with presence system and last seen timestamps",
      "Infinite scroll for message history with cursor-based pagination",
      "Optimistic UI updates for instant feedback and responsive user experience",
      "Full-screen media viewer with keyboard navigation and touch gestures",
      "Mobile-first responsive design with Tailwind CSS and shadcn/ui components",
      "User search and discovery with real-time filtering",
      "Profile management (bio, website, avatar) with image optimization",
      "Message pagination for performance optimization on large conversations",
      "Real-time notifications for new messages and mentions",
    ],
    challenges: [
      "Custom WebSocket JWT authentication adapter - Built secure middleware for verifying JWT tokens on WebSocket handshake, enabling authentication for real-time connections",
      "Cursor-based pagination strategy - Implemented efficient message history loading using database cursors instead of offset pagination, improving performance by 70% on large datasets",
      "Scalable media storage architecture - Designed and integrated Cloudflare R2 (S3-compatible) with presigned URLs for secure, scalable media delivery without server bottleneck",
      "Real-time state synchronization - Solved complex problem of keeping message state consistent across multiple connected clients using Socket.IO rooms and event broadcasting",
      "Room-based message routing - Developed automatic user subscription system to personal and group rooms on connection for targeted message delivery without overhead",
      "Multi-user read receipt tracking - Implemented efficient read receipt system tracking individual read status for each user in group chats without N+1 query problems",
      "WebSocket connection management - Built robust reconnection logic with exponential backoff and state recovery after network interruptions",
      "Database schema optimization - Designed Prisma models with strategic indexing on frequently queried fields (email, username, roomId, createdAt) for sub-50ms query times",
    ],
    links: {
      github: "https://github.com/mustapha/chat-app",
      demo: "https://chat-app-front.mooo.com",
    },
  },
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
          {projects.map((project, index) => (
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
                  onClick={() => router.push(`/projects/${createSlug(project.title)}`)}
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
