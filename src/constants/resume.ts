import type { ResumeLanguage } from "@/types";

export const RESUME_LANGUAGES: ResumeLanguage[] = [
  {
    code: "en",
    label: "English",
    flag: "🇬🇧",
    subtitle: "View EN resume",
  },
  {
    code: "fr",
    label: "Français",
    flag: "🇫🇷",
    subtitle: "Voir CV FR",
  },
] as const;
