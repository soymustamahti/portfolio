"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProjectDetails } from "../../../components/ProjectModal";

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
      github: "https://github.com/soymustamahti/chat-app",
      demo: "https://chat-app-front.mooo.com",
    },
  },
];

// Create slug from title
const createSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const project = projects.find((p) => createSlug(p.title) === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-textPrimary mb-4">
            Project Not Found
          </h1>
          <button
            onClick={() => router.push("/#projects")}
            className="px-6 py-3 bg-accent hover:bg-accentHover text-white rounded-lg font-semibold transition-all duration-300"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push("/#projects")}
          className="flex items-center gap-2 text-textSecondary hover:text-accent transition-colors duration-300 mb-8 cursor-pointer"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-textPrimary mt-4 mb-3">
            {project.title}
          </h1>
          {project.impact && (
            <p className="text-accent text-lg font-semibold">
              📊 {project.impact}
            </p>
          )}
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-accent mb-4">Description</h2>
            <p className="text-textSecondary leading-relaxed text-lg">
              {project.fullDescription || project.description}
            </p>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-accent mb-4">
              Technologies
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-primary/50 text-textPrimary rounded-lg border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">
                Key Features
              </h2>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-start gap-3 text-textSecondary text-lg"
                  >
                    <span className="text-accent mt-1 text-xl">✓</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">
                Technical Challenges
              </h2>
              <ul className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-start gap-3 text-textSecondary text-lg"
                  >
                    <span className="text-accent mt-1 text-xl">⚡</span>
                    <span>{challenge}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Links */}
          {project.links && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-8 border-t border-accent/20"
            >
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accentHover text-white rounded-lg font-semibold transition-all duration-300"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </motion.a>
              )}
              {project.links.demo && (
                <motion.a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-primary/50 hover:bg-accent/20 text-textPrimary border border-accent/30 hover:border-accent rounded-lg font-semibold transition-all duration-300"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </motion.a>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
