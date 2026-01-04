"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProjectGalleryProps {
  images: {
    src: string;
    alt: string;
    category?: "mobile" | "dashboard" | "monitoring" | "architecture";
  }[];
  projectName: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  images,
  projectName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean[]>(
    new Array(images.length).fill(true)
  );

  const handleImageLoad = (index: number) => {
    setIsLoading((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  // Handle body overflow when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
      );
    }
  }, [selectedIndex, images.length]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
      );
    }
  }, [selectedIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, goToPrevious, goToNext]);

  // Get category icon
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "mobile":
        return "📱";
      case "dashboard":
        return "💻";
      case "monitoring":
        return "📊";
      case "architecture":
        return "🏗️";
      default:
        return "🖼️";
    }
  };

  return (
    <>
      {/* Thumbnail Carousel */}
      <div className="relative">
        {/* Scroll container */}
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-4" style={{ minWidth: "max-content" }}>
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative group cursor-pointer flex-shrink-0"
                onClick={() => openLightbox(index)}
              >
                <div
                  className={`relative overflow-hidden rounded-xl border-2 border-accent/20 hover:border-accent transition-all duration-300 ${
                    image.category === "mobile"
                      ? "w-[140px] h-[280px] md:w-[160px] md:h-[320px]"
                      : "w-[280px] h-[180px] md:w-[320px] md:h-[200px]"
                  }`}
                >
                  {/* Loading skeleton */}
                  {isLoading[index] && (
                    <div className="absolute inset-0 bg-primary/50 animate-pulse flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                      isLoading[index] ? "opacity-0" : "opacity-100"
                    }`}
                    sizes="(max-width: 768px) 160px, 320px"
                    onLoad={() => handleImageLoad(index)}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                    <span className="text-white text-sm font-medium flex items-center gap-1">
                      {getCategoryIcon(image.category)} View
                    </span>
                  </div>
                </div>

                {/* Category badge */}
                {image.category && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md capitalize">
                    {image.category}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll indicators */}
        <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>

      {/* Image counter */}
      <div className="text-center mt-2 text-textSecondary text-sm">
        {images.length} screenshots • Scroll to see more • Click to enlarge
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 z-50 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 z-50 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Image container */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`relative ${
                  images[selectedIndex].category === "mobile"
                    ? "w-[300px] h-[600px] md:w-[350px] md:h-[700px]"
                    : "w-[90vw] h-[50vh] md:w-[80vw] md:h-[70vh] lg:w-[70vw] lg:h-[75vh]"
                }`}
              >
                <Image
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Image info bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">
                    {images[selectedIndex].alt}
                  </p>
                  <p className="text-white/60 text-sm">
                    {projectName} •{" "}
                    {images[selectedIndex].category || "Screenshot"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Dots indicator */}
                  <div className="flex gap-1.5">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedIndex(idx);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === selectedIndex
                            ? "bg-accent w-6"
                            : "bg-white/40 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white/60 text-sm ml-4">
                    {selectedIndex + 1} / {images.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default ProjectGallery;
