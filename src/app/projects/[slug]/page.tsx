"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useI18n } from "../../../i18n/I18nProvider";

// Project configuration mapping slugs to translation keys
const projectConfigs = [
  {
    slug: "real-time-chat-application",
    key: "chat",
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
    links: {
      demo: "https://chat-app-front.mooo.com",
    },
  },
  {
    slug: "syntrix-legal-services-platform",
    key: "syntrix",
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
    links: {
      demo: "https://syntrix-dev.mooo.com",
    },
  },
  {
    slug: "ai-powered-cover-letter-generator",
    key: "coverLetter",
    technologies: [
      "React 18",
      "TypeScript",
      "Plasmo Framework",
      "NestJS 11",
      "Prisma ORM",
      "OpenAI API (DeepSeek)",
      "Google OAuth 2.0",
      "Passport.js",
      "JWT Authentication",
      "PDF-Lib",
      "Tesseract.js (OCR)",
      "jsPDF",
      "Docker",
      "PostgreSQL",
    ],
    links: {
      github: "https://github.com/soymustamahti/cover-letter",
    },
  },
  {
    slug: "reinforcement-learning-suite",
    key: "rlSuite",
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
    links: {
      github: "https://github.com/soymustamahti/T-AIA-902-TLS_3",
    },
  },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useI18n();
  const slug = params.slug as string;

  // Find the project config matching the slug
  const projectConfig = projectConfigs.find((p) => p.slug === slug);

  if (!projectConfig) {
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

  // Build project from translations
  const projectKey = projectConfig.key;
  const title = t(`project.${projectKey}.title`);
  const description = t(`project.${projectKey}.description`);
  const category = t(`project.${projectKey}.category`);
  const impact = t(`project.${projectKey}.impact`);
  const fullDescription = t(`project.${projectKey}.fullDescription`);

  // Parse semicolon-separated lists
  const featuresStr = t(`project.${projectKey}.features`);
  const features = featuresStr
    ? featuresStr.split(";").filter((f) => f.trim())
    : [];

  const challengesStr = t(`project.${projectKey}.challenges`);
  const challenges = challengesStr
    ? challengesStr.split(";").filter((c) => c.trim())
    : [];

  const plannedFeaturesStr = t(`project.${projectKey}.plannedFeatures`);
  const plannedFeatures = plannedFeaturesStr
    ? plannedFeaturesStr.split(";").filter((f) => f.trim())
    : [];

  const algorithmsStr = t(`project.${projectKey}.algorithms`);
  const algorithms = algorithmsStr
    ? algorithmsStr.split(";").filter((a) => a.trim())
    : [];

  const environmentsStr = t(`project.${projectKey}.environments`);
  const environments = environmentsStr
    ? environmentsStr.split(";").filter((e) => e.trim())
    : [];

  const architectureStr = t(`project.${projectKey}.architecture`);
  const architecture = architectureStr
    ? architectureStr.split(";").filter((a) => a.trim())
    : [];

  const technicalHighlightsStr = t(`project.${projectKey}.technicalHighlights`);
  const technicalHighlights = technicalHighlightsStr
    ? technicalHighlightsStr.split(";").filter((h) => h.trim())
    : [];

  const userFlowStr = t(`project.${projectKey}.userFlow`);
  const userFlow = userFlowStr
    ? userFlowStr.split(";").filter((u) => u.trim())
    : [];

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
            {category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-textPrimary mt-4 mb-3">
            {title}
          </h1>
          {impact && (
            <p className="text-accent text-lg font-semibold">📊 {impact}</p>
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
              {fullDescription || description}
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
              {projectConfig.technologies.map((tech: string) => (
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
          {features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">
                Key Features
              </h2>
              <ul className="space-y-3">
                {features.map((feature: string, index: number) => (
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
          {challenges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">
                Technical Challenges
              </h2>
              <ul className="space-y-3">
                {challenges.map((challenge: string, index: number) => (
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

          {/* Planned Features (for Syntrix) */}
          {plannedFeatures.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">
                Planned Features
              </h2>
              <ul className="space-y-3">
                {plannedFeatures.map((feature: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-start gap-3 text-textSecondary text-lg"
                  >
                    <span className="text-accent mt-1 text-xl">🔮</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Algorithms (for RL Suite) */}
          {algorithms.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">
                Algorithms
              </h2>
              <ul className="space-y-3">
                {algorithms.map((algorithm: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-start gap-3 text-textSecondary text-lg"
                  >
                    <span className="text-accent mt-1 text-xl">🧠</span>
                    <span>{algorithm}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Environments (for RL Suite) */}
          {environments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">
                Environments
              </h2>
              <ul className="space-y-3">
                {environments.map((environment: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-start gap-3 text-textSecondary text-lg"
                  >
                    <span className="text-accent mt-1 text-xl">🎮</span>
                    <span>{environment}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Architecture (for Cover Letter) */}
          {architecture.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">
                Architecture
              </h2>
              <ul className="space-y-3">
                {architecture.map((item: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-start gap-3 text-textSecondary text-lg"
                  >
                    <span className="text-accent mt-1 text-xl">🏗️</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Technical Highlights (for Cover Letter) */}
          {technicalHighlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">
                Technical Highlights
              </h2>
              <ul className="space-y-3">
                {technicalHighlights.map((highlight: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-start gap-3 text-textSecondary text-lg"
                  >
                    <span className="text-accent mt-1 text-xl">💡</span>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* User Flow (for Cover Letter) */}
          {userFlow.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">
                User Flow
              </h2>
              <ul className="space-y-3">
                {userFlow.map((step: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65 + index * 0.05 }}
                    className="flex items-start gap-3 text-textSecondary text-lg"
                  >
                    <span className="text-accent mt-1 text-xl">{index + 1}.</span>
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Links */}
          {projectConfig.links && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 pt-8 border-t border-accent/20"
            >
              {projectConfig.links.github && (
                <motion.a
                  href={projectConfig.links.github}
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
              {projectConfig.links.demo && (
                <motion.a
                  href={projectConfig.links.demo}
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
