export type Locale = "en" | "fr";

export interface ProjectConfig {
  key: string;
  slug: string;
  liveDemo?: boolean;
  images?: boolean;
  technologies: string[];
}

export interface ProjectDetails {
  title: string;
  description: string;
  category: string;
  impact?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  stack?: string;
}

export interface Skill {
  category: string;
  items: string[];
  icon: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastState {
  message: string;
  type: ToastType;
}

export type ScrollAnimationType =
  | "fadeIn"
  | "slideUp"
  | "slideIn"
  | "scale"
  | "parallax";

export interface ResumeLanguage {
  code: Locale;
  label: string;
  flag: string;
  subtitle: string;
}
