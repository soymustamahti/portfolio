"use client";

import ParticlesBackground from "../../components/ParticlesBackground";
import ScrollProgress from "../../components/ScrollProgress";
import CustomCursor from "../../components/CustomCursor";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ParticlesBackground />
      <ScrollProgress />
      <CustomCursor />
      {children}
    </>
  );
}
