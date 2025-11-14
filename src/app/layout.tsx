import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "../i18n/I18nProvider";
import LocaleToggle from "../components/LocaleToggle";
import HowItsMadeModal from "../components/HowItsMadeModal";

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
          <HowItsMadeModal />
          <div className="fixed top-4 right-4 z-50">
            <LocaleToggle />
          </div>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
