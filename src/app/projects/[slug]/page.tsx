"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useI18n } from "../../../i18n/I18nProvider";
import ProjectGallery from "../../../components/ProjectGallery";

// Archeon project images configuration
const archeonImages = [
  // Mobile app screenshots (in logical order)
  {
    src: "/project/archeon/archeon_welcom.PNG",
    alt: "Welcome Screen",
    category: "mobile" as const,
  },
  {
    src: "/project/archeon/archeon_login.PNG",
    alt: "Login Screen",
    category: "mobile" as const,
  },
  {
    src: "/project/archeon/archeon_dashboard.PNG",
    alt: "Dashboard",
    category: "mobile" as const,
  },
  {
    src: "/project/archeon/archeon_search.PNG",
    alt: "Intelligent Search",
    category: "mobile" as const,
  },
  {
    src: "/project/archeon/archeon_categories.PNG",
    alt: "Categories",
    category: "mobile" as const,
  },
  {
    src: "/project/archeon/archeon_document.PNG",
    alt: "Document View",
    category: "mobile" as const,
  },
  {
    src: "/project/archeon/archeon_scan.PNG",
    alt: "Document Scan",
    category: "mobile" as const,
  },
  {
    src: "/project/archeon/archeon_scanner.PNG",
    alt: "Scanner",
    category: "mobile" as const,
  },
  {
    src: "/project/archeon/archeon_brain.PNG",
    alt: "AI Second Brain",
    category: "mobile" as const,
  },

  {
    src: "/project/archeon/archeon_notif.PNG",
    alt: "Notifications",
    category: "mobile" as const,
  },
  {
    src: "/project/archeon/archeon_profile.PNG",
    alt: "User Profile",
    category: "mobile" as const,
  },
  {
    src: "/project/archeon/archeon_price.PNG",
    alt: "Pricing Plans",
    category: "mobile" as const,
  },
  // Architecture diagrams
  {
    src: "/project/archeon/archeon_shcema.png",
    alt: "Brain Schema",
    category: "architecture" as const,
  },
  {
    src: "/project/archeon/archeon_content_schema.png",
    alt: "Content Schema",
    category: "architecture" as const,
  },
  // Monitoring dashboards
  {
    src: "/project/archeon/archeon_monitoring_overview.png",
    alt: "Monitoring Overview",
    category: "monitoring" as const,
  },
  {
    src: "/project/archeon/archeon_monitoring_api.png",
    alt: "API Metrics",
    category: "monitoring" as const,
  },
  {
    src: "/project/archeon/archeon_monitoring_llm.png",
    alt: "LLM Metrics",
    category: "monitoring" as const,
  },
  {
    src: "/project/archeon/archeon_monitoring_logs.png",
    alt: "Centralized Logs",
    category: "monitoring" as const,
  },
];

// Syntrix project images configuration
const syntrixImages = [
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.09.13.png",
    alt: "Syntrix Admin System Dashboard with user metrics and activity logs",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.10.07.png",
    alt: "User invitation modal with role assignment and organization selection",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.10.25.png",
    alt: "Automated account setup invitation email template in MailDev",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.10.38.png",
    alt: "User registration and profile completion form interface",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.11.18.png",
    alt: "Agent Portal client management list showing individual and business categories",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.11.26.png",
    alt: "Client creation workflow showing selection between Individual and Business profiles",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.11.41.png",
    alt: "Comprehensive business information and documentation onboarding form",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.11.55.png",
    alt: "Client profile overview showing business summary and KYC status",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.12.36.png",
    alt: "Compliance review interface for approving or rejecting submitted business details",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.13.38.png",
    alt: "Action required email notification for client information updates",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.13.55.png",
    alt: "Onboarding Correction Mode interface highlighting fields requiring updates after review",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.14.17.png",
    alt: "Document Management system showing review status and secure upload zones for legal files",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.16.47.png",
    alt: "Visual Shareholders Tree mapping ultimate beneficial owners (UBOs) and ownership percentages",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.17.02.png",
    alt: "Pending Reviews queue in the Agent Portal showing form submissions awaiting approval",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.17.07.png",
    alt: "Detailed business form review with historical rejection reasons and field comparison",
    category: "platform" as const,
  },
  {
    src: "/project/syntrix/Screenshot 2026-01-05 at 14.17.24.png",
    alt: "Submitted Documents review panel showing individual file approval and rejection statuses",
    category: "platform" as const,
  },
];
// Project configuration mapping slugs to translation keys
const projectConfigs = [
  {
    slug: "archeon-ai-second-brain",
    key: "archeon",
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
    links: {},
  },
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
      demo: "https://chat-app-front.mooo.com/?fromPortfolio=true",
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
      platform: "https://dev.syntrix.ae/",
      website: "https://www.syntrix.ae",
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
  {
    slug: "voice-controlled-train-route-finder",
    key: "voiceTrain",
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
    links: {
      github: "https://github.com/soymustamahti/T-AIA-901-TLS_5",
    },
  },
  {
    slug: "jumbot-automated-deployment-bot",
    key: "jumbot",
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
    slug: "my-actual-enterprise-hr-platform",
    key: "myActual",
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

  // Helper function to check if translation exists
  const hasTranslation = (key: string) => {
    const value = t(key);
    return value && !value.startsWith("project.");
  };

  const plannedFeaturesStr = hasTranslation(
    `project.${projectKey}.plannedFeatures`
  )
    ? t(`project.${projectKey}.plannedFeatures`)
    : "";
  const plannedFeatures = plannedFeaturesStr
    ? plannedFeaturesStr.split(";").filter((f) => f.trim())
    : [];

  const algorithmsStr = hasTranslation(`project.${projectKey}.algorithms`)
    ? t(`project.${projectKey}.algorithms`)
    : "";
  const algorithms = algorithmsStr
    ? algorithmsStr.split(";").filter((a) => a.trim())
    : [];

  const environmentsStr = hasTranslation(`project.${projectKey}.environments`)
    ? t(`project.${projectKey}.environments`)
    : "";
  const environments = environmentsStr
    ? environmentsStr.split(";").filter((e) => e.trim())
    : [];

  const architectureStr = hasTranslation(`project.${projectKey}.architecture`)
    ? t(`project.${projectKey}.architecture`)
    : "";
  const architecture = architectureStr
    ? architectureStr.split(";").filter((a) => a.trim())
    : [];

  const technicalHighlightsStr = hasTranslation(
    `project.${projectKey}.technicalHighlights`
  )
    ? t(`project.${projectKey}.technicalHighlights`)
    : "";
  const technicalHighlights = technicalHighlightsStr
    ? technicalHighlightsStr.split(";").filter((h) => h.trim())
    : [];

  const userFlowStr = hasTranslation(`project.${projectKey}.userFlow`)
    ? t(`project.${projectKey}.userFlow`)
    : "";
  const userFlow = userFlowStr
    ? userFlowStr.split(";").filter((u) => u.trim())
    : [];

  const notebooksStr = hasTranslation(`project.${projectKey}.notebooks`)
    ? t(`project.${projectKey}.notebooks`)
    : "";
  const notebooks = notebooksStr
    ? notebooksStr.split(";").filter((n) => n.trim())
    : [];

  const dataFlowStr = hasTranslation(`project.${projectKey}.dataFlow`)
    ? t(`project.${projectKey}.dataFlow`)
    : "";
  const dataFlow = dataFlowStr
    ? dataFlowStr.split(";").filter((d) => d.trim())
    : [];

  const usageExamplesStr = hasTranslation(`project.${projectKey}.usageExamples`)
    ? t(`project.${projectKey}.usageExamples`)
    : "";
  const usageExamples = usageExamplesStr
    ? usageExamplesStr.split(";").filter((u) => u.trim())
    : [];

  const technicalComponentsStr = hasTranslation(
    `project.${projectKey}.technicalComponents`
  )
    ? t(`project.${projectKey}.technicalComponents`)
    : "";
  const technicalComponents = technicalComponentsStr
    ? technicalComponentsStr.split(";").filter((c) => c.trim())
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

        {/* Archeon Development Notice */}
        {projectKey === "archeon" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">🚧</div>
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">
                  {t("project.archeon.devNotice.title")}
                </h3>
                <p className="text-textSecondary leading-relaxed">
                  {
                    t("project.archeon.devNotice.description").split(
                      t("project.archeon.devNotice.notAvailable")
                    )[0]
                  }
                  <span className="text-amber-400 font-semibold">
                    {t("project.archeon.devNotice.notAvailable")}
                  </span>
                  {
                    t("project.archeon.devNotice.description").split(
                      t("project.archeon.devNotice.notAvailable")
                    )[1]
                  }
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-textSecondary">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    {t("project.archeon.devNotice.activeDev")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-textSecondary">
                    <span>📱</span>
                    {t("project.archeon.devNotice.comingSoon")}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Archeon Beta Signup */}
        {projectKey === "archeon" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.075 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-500/30"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚡</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-blue-400 mb-2">
                  {t("project.archeon.beta.title")}
                </h3>
                <p className="text-textSecondary leading-relaxed mb-4">
                  {t("project.archeon.beta.description")}
                </p>
                <motion.button
                  onClick={() => {
                    window.location.href = "/#contact";
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 cursor-pointer"
                >
                  <span>📧</span>
                  {t("project.archeon.beta.button")}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Archeon Screenshots Gallery */}
        {projectKey === "archeon" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <span>📸</span> {t("project.archeon.gallery.title")}
            </h2>
            <p className="text-textSecondary mb-6">
              {t("project.archeon.gallery.description")}
            </p>
            <ProjectGallery images={archeonImages} projectName="Archeon" />
          </motion.div>
        )}

        {/* Chat Demo Notice */}
        {projectKey === "chat" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/30"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">🚀</div>
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-2">
                  {t("project.chat.demoNotice.title")}
                </h3>
                <p className="text-textSecondary leading-relaxed">
                  {t("project.chat.demoNotice.description")}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Syntrix Invitation Notice */}
        {projectKey === "syntrix" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 border border-purple-500/30"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">🔒</div>
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-2">
                  {t("project.syntrix.invitationNotice.title")}
                </h3>
                <p className="text-textSecondary leading-relaxed">
                  {t("project.syntrix.invitationNotice.description")}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Syntrix Screenshots Gallery */}
        {projectKey === "syntrix" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
              <span>📸</span> {t("project.syntrix.gallery.title")}
            </h2>
            <p className="text-textSecondary mb-6">
              {t("project.syntrix.gallery.description")}
            </p>
            <ProjectGallery images={syntrixImages} projectName="Syntrix" />
          </motion.div>
        )}

        {/* Content */}
        <div className="space-y-8">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
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
              <h2 className="text-2xl font-bold text-accent mb-4">User Flow</h2>
              <ul className="space-y-3">
                {userFlow.map((step: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65 + index * 0.05 }}
                    className="flex items-start gap-3 text-textSecondary text-lg"
                  >
                    <span className="text-accent mt-1 text-xl">
                      {index + 1}.
                    </span>
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Technical Components (for Voice Train) */}
          {technicalComponents.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">
                Technical Components
              </h2>
              <ul className="space-y-3">
                {technicalComponents.map((component: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="flex items-start gap-3 text-textSecondary text-lg"
                  >
                    <span className="text-accent mt-1 text-xl">⚙️</span>
                    <span>{component}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Notebooks (for Voice Train) */}
          {notebooks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">
                Jupyter Notebooks
              </h2>
              <ul className="space-y-3">
                {notebooks.map((notebook: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.75 + index * 0.05 }}
                    className="flex items-start gap-3 text-textSecondary text-lg"
                  >
                    <span className="text-accent mt-1 text-xl">📓</span>
                    <span>{notebook}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Data Flow (for Voice Train) */}
          {dataFlow.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">Data Flow</h2>
              <ul className="space-y-3">
                {dataFlow.map((step: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="flex items-start gap-3 text-textSecondary text-lg"
                  >
                    <span className="text-accent mt-1 text-xl">→</span>
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Usage Examples (for Voice Train) */}
          {usageExamples.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
            >
              <h2 className="text-2xl font-bold text-accent mb-4">
                Usage Examples
              </h2>
              <ul className="space-y-3">
                {usageExamples.map((example: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.85 + index * 0.05 }}
                    className="flex items-start gap-3 text-textSecondary text-lg"
                  >
                    <span className="text-accent mt-1 text-xl">💻</span>
                    <span>{example}</span>
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

              {projectConfig.links.website && (
                <motion.a
                  href={projectConfig.links.website}
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
                  Web Site
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
              {projectConfig.links.platform && (
                <motion.a
                  href={projectConfig.links.platform}
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
                  Platform Link
                </motion.a>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
