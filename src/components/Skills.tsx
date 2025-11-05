"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "../i18n/I18nProvider";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  category: string;
  items: string[];
  icon: string;
}

const skills: Skill[] = [
  {
    category: "Frontend",
    icon: "💻",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "React Native",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    items: [
      "NestJS",
      "Node.js",
      "APIs RESTful",
      "WebSockets",
      "Microservices",
      "GraphQL",
    ],
  },
  {
    category: "Intelligence Artificielle",
    icon: "🤖",
    items: [
      "NLP",
      "Machine Learning",
      "RAG",
      "LangChain",
      "OpenAI API",
      "Classification",
    ],
  },
  {
    category: "Bases de Données",
    icon: "💾",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Elasticsearch",
      "BigQuery",
      "SAP HANA",
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "☁️",
    items: ["Docker", "Kubernetes", "CI/CD", "GCP", "RabbitMQ", "Monitoring"],
  },
  {
    category: "Mobile",
    icon: "📱",
    items: [
      "React Native",
      "Expo",
      "iOS Development",
      "Android Development",
      "Cross-platform",
      "App Optimization",
    ],
  },
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      skillsRef.current.forEach((skill, index) => {
        if (skill) {
          gsap.from(skill, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skill,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { t } = useI18n();

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          {t("sections.skills")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              ref={(el) => {
                skillsRef.current[index] = el;
              }}
              className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </span>
                <h3 className="text-xl font-bold text-accent">
                  {skill.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-primary/50 text-textSecondary text-sm rounded-full border border-accent/30 hover:border-accent hover:text-textPrimary transition-all duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
