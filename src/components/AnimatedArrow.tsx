"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const AnimatedArrow: React.FC = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      particles: {
        color: {
          value: ["#3b82f6", "#8b5cf6", "#06b6d4"],
        },
        move: {
          direction: "bottom",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 15,
        },
        opacity: {
          value: { min: 0.3, max: 0.8 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
          },
        },
        shape: {
          type: ["circle", "star"],
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 3,
            minimumValue: 0.5,
          },
        },
        trail: {
          enable: true,
          length: 3,
          fill: {
            color: {
              value: "#3b82f6",
            },
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="relative w-8 h-16 flex items-center justify-center">
      {/* Particles background */}
      {init && (
        <div className="absolute inset-0 w-full h-full">
          <Particles id="arrow-particles" options={particlesOptions} />
        </div>
      )}

      {/* Glowing orb container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Main glowing circle with pulse */}
        <motion.div
          className="relative w-8 h-8 rounded-full flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 20px 5px rgba(59, 130, 246, 0.6)",
              "0 0 30px 10px rgba(139, 92, 246, 0.8)",
              "0 0 20px 5px rgba(59, 130, 246, 0.6)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-400/50"
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              borderTopColor: "rgba(59, 130, 246, 0.9)",
              borderRightColor: "rgba(139, 92, 246, 0.5)",
            }}
          />

          {/* Middle ring */}
          <motion.div
            className="absolute inset-1 rounded-full border-2 border-purple-400/40"
            animate={{ rotate: -360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner core with gradient */}
          <motion.div
            className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* White center dot */}
            <div className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full" />
          </motion.div>

          {/* Pulse waves */}
          {[0, 0.5, 1].map((delay, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 rounded-full border-2 border-blue-400"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{
                scale: 2.5,
                opacity: 0,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: delay,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>

        {/* Animated arrow pointer */}
        <motion.div
          className="relative mt-2"
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Arrow triangle with glow */}
          <motion.div
            style={{
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "12px solid #3b82f6",
              filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))",
            }}
            animate={{
              filter: [
                "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))",
                "drop-shadow(0 0 15px rgba(139, 92, 246, 1))",
                "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Arrow trail effect */}
          {[0, 0.15, 0.3].map((delay, index) => (
            <motion.div
              key={index}
              className="absolute top-0 left-1/2 -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "10px solid rgba(139, 92, 246, 0.4)",
              }}
              animate={{
                y: [0, 10],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: delay,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedArrow;
