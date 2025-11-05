"use client";

import { useRef } from "react";
import { useScrollAnimations } from "../hooks/useScrollAnimations";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollAnimations(sectionRef, "fadeIn");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          À propos de moi
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-secondary/50 backdrop-blur-sm p-8 rounded-2xl border border-accent/20 hover:border-accent/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-accent">
                Présentation
              </h3>
              <p className="text-textSecondary leading-relaxed mb-6">
                Ingénieur logiciel passionné par le développement full-stack et
                l&apos;intelligence artificielle. Je combine expertise technique
                et vision produit pour créer des solutions innovantes à fort
                impact.
              </p>
              <p className="text-textSecondary leading-relaxed">
                J&apos;expérimente continuellement avec les technologies
                émergentes (RAG, blockchain, NLP) et transforme des idées
                complexes en produits concrets, de la conception au déploiement
                à grande échelle.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:transform hover:scale-105">
              <h4 className="text-xl font-semibold mb-2 text-accent">
                📍 Localisation
              </h4>
              <p className="text-textSecondary">Toulouse, Occitanie, France</p>
            </div>

            <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:transform hover:scale-105">
              <h4 className="text-xl font-semibold mb-2 text-accent">
                🌍 Langues
              </h4>
              <div className="grid grid-cols-2 gap-2 text-textSecondary">
                <span>🇫🇷 Français (Natif)</span>
                <span>🇦🇪 Arabe (Natif)</span>
                <span>🇪🇸 Espagnol (Natif)</span>
                <span>🇪🇸 Catalan (Natif)</span>
                <span>🇬🇧 Anglais (Courant)</span>
                <span>🇮🇹 Italien (Conv.)</span>
              </div>
            </div>

            <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:transform hover:scale-105">
              <h4 className="text-xl font-semibold mb-2 text-accent">
                🎓 Formation
              </h4>
              <ul className="space-y-2 text-textSecondary">
                <li>• Master Architecte Logiciel - EPITECH</li>
                <li>• Bachelor DevOps - EPSI (Distinction)</li>
                <li>• Développeur Web - SIMPLON</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
