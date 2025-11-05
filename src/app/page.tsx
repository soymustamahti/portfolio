"use client";

import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import ParticlesBackground from "../components/ParticlesBackground";
import ScrollProgress from "../components/ScrollProgress";
import CustomCursor from "../components/CustomCursor";
import { useLenis } from "../hooks/useLenis";

export default function Home() {
  useLenis();

  return (
    <>
      <ParticlesBackground />
      <ScrollProgress />
      <CustomCursor />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
