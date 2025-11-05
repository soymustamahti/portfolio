"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";
import TiltCard from "./TiltCard";

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
      // Parallax effect on title
      gsap.to(".skills-title", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Enhanced stagger animation for skill cards
      skillsRef.current.forEach((skill, index) => {
        if (skill) {
          // Main reveal animation
          gsap.from(skill, {
            opacity: 0,
            y: 80,
            rotateX: -10,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: skill,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none reverse",
              scrub: 0.5,
            },
          });

          // Floating animation disabled to prevent overlap
          // gsap.to(skill, {
          //   y: -3,
          //   duration: 3 + index * 0.1,
          //   ease: "sine.inOut",
          //   repeat: -1,
          //   yoyo: true,
          //   delay: index * 0.2,
          // });
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
        <motion.h2
          className="skills-title text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {t("sections.skills")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              ref={(el) => {
                skillsRef.current[index] = el;
              }}
            >
              <TiltCard className="h-full" tiltStrength={12} glareEffect={true}>
                <motion.div
                  className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/60 transition-all duration-300 hover:shadow-2xl group h-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.span
                      className="text-4xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {skill.icon}
                    </motion.span>
                    <h3 className="text-xl font-bold text-accent">
                      {skill.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, itemIndex) => (
                      <motion.span
                        key={item}
                        className="px-3 py-1 bg-primary/50 text-textSecondary text-sm rounded-full border border-accent/30 hover:border-accent hover:text-textPrimary transition-all duration-300"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIndex * 0.05, duration: 0.3 }}
                        whileHover={{ y: -2, scale: 1.05 }}
                      >
                        {item}
                      </motion.span>
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

export default Skills;
