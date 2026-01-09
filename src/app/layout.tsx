import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "../i18n/I18nProvider";
import { WelcomeBotProvider } from "../context/WelcomeBotContext";
import LocaleToggle from "../components/LocaleToggle";
import WelcomeBot from "../components/WelcomeBot";
import DownloadResumeButton from "../components/DownloadResumeButton";
import AIChatBot from "../components/AIChatBot";
import MobileFloatingMenu from "../components/MobileFloatingMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mustapha El Hachmi Mahti | Software Engineer",
  description:
    "Full-stack software engineer passionate about AI, web development, and building innovative solutions. Specialized in React, TypeScript, NestJS, and modern web technologies.",
  keywords:
    "software engineer, full-stack developer, React, TypeScript, NestJS, AI, machine learning, Toulouse",
  authors: [{ name: "Mustapha El Hachmi Mahti" }],
  openGraph: {
    title: "Mustapha El Hachmi Mahti | Software Engineer",
    description:
      "Full-stack software engineer passionate about AI and modern web technologies",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <WelcomeBotProvider>
            <WelcomeBot />
            {/* Desktop: Show individual buttons */}
            <div className="hidden md:block">
              <DownloadResumeButton />
            </div>
            <AIChatBot />
            {/* Mobile: Consolidated menu */}
            <MobileFloatingMenu />
            {/* Desktop: Top-right navigation */}
            <div className="hidden md:flex fixed top-4 right-4 z-50 items-center gap-3">
              <a
                href="https://github.com/soymustamahti/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/80 backdrop-blur-sm border-2 border-accent/40 hover:border-accent/80 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="View source code on GitHub"
              >
                <svg
                  className="w-5 h-5 text-textSecondary group-hover:text-accent transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <LocaleToggle />
            </div>
            {children}
          </WelcomeBotProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
