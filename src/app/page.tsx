"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Languages from "../components/Languages";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import ParticlesBackground from "../components/ParticlesBackground";
import ScrollProgress from "../components/ScrollProgress";
import CustomCursor from "../components/CustomCursor";
import { useLenis } from "../hooks/useLenis";

function ScrollHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if there's a hash in the URL or scrollTo parameter
    const scrollTo = searchParams.get("scrollTo");
    const hash = window.location.hash.replace("#", "");
    const targetId = scrollTo || hash;

    if (targetId) {
      // Wait for page to fully render
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      // Only scroll to top if no hash/scrollTo parameter
      window.scrollTo(0, 0);
    }

    // For browsers that support scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, [searchParams]);

  return null;
}

export default function Home() {
  useLenis();

  return (
    <>
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>
      <ParticlesBackground />
      <ScrollProgress />
      <CustomCursor />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Languages />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
