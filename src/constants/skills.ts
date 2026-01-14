import type { Skill } from "@/types";

export const SKILLS: Skill[] = [
  {
    category: "AI & RAG Systems",
    icon: "🧠",
    items: [
      "Graph RAG",
      "LangChain",
      "OpenAI API",
      "Prompt Engineering",
      "Fireworks AI",
    ],
  },
  {
    category: "Knowledge Graphs",
    icon: "🔮",
    items: [
      "Neo4j",
      "Graphiti",
      "pgvector",
      "Pinecone",
      "Elasticsearch",
      "Redis",
    ],
  },
  {
    category: "NLP & Machine Learning",
    icon: "🤖",
    items: [
      "NER",
      "Text Embeddings",
      "Semantic Search",
      "Classification",
      "RL",
      "PyTorch",
    ],
  },
  {
    category: "Backend & APIs",
    icon: "⚙️",
    items: ["NestJS", "FastAPI", "Node.js", "Python", "GraphQL", "Celery"],
  },
  {
    category: "Frontend & Mobile",
    icon: "💻",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "Expo",
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "☁️",
    items: ["Docker", "BullMQ", "CI/CD", "Ansible", "RabbitMQ"],
  },
] as const;
