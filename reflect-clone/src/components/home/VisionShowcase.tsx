"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const SCENE_DURATION_MS = 8000;

const SCENES = [
  {
    id: "scene-1",
    tagline: "Introducing AuraVision",
    title: "See the World\nBeyond Direct Sight",
    description:
      "AuraVision is an AI-powered assistive system designed to grant real-time environmental awareness to those with visual impairments.",
    quote:
      '"Welcome. I am Alice, your vision companion. I will guide you through your environment safely and intuitively."',
    image: "/Cinematic-introduction/hero.png",
    imageAlt: "Vision Hero",
    imageLeft: false,
    finalScene: false,
  },
  {
    id: "scene-2",
    tagline: "Real-Time Perception",
    title: "Intelligent Edge\nSpatial Awareness",
    description:
      "Powered by YOLOv26, our system detects hazards, objects, and people in milliseconds, mapping their exact location relative to you.",
    quote: '"Object detected: Chair. Position: Two meters ahead, slightly to your left."',
    image: "/Cinematic-introduction/detection.png",
    imageAlt: "Spatial Detection",
    imageLeft: true,
    finalScene: false,
  },
  {
    id: "scene-3",
    tagline: "Agentic Reasoning",
    title: "Alice: Your Smart\nVision Partner",
    description:
      "Using Google Gemini, Alice does not just list objects. She understands context and provides natural-language guidance for safe navigation.",
    quote:
      '"There is a small step up ahead. Please adjust your path to the right to maintain a clear trajectory."',
    image: "/Cinematic-introduction/alice.png",
    imageAlt: "Alice Interaction",
    imageLeft: false,
    finalScene: false,
  },
  {
    id: "scene-4",
    tagline: "Persistent Context",
    title: "A Vision Engine\nWith Memory",
    description:
      "Integrated RAG with ChromaDB allows Alice to remember what she saw. Ask about past observations and get instant answers.",
    quote:
      '"User: Alice, where did I see my keys? Alice: You left them on the wooden desk in the living room at 10:15 AM."',
    image: "/Cinematic-introduction/memory.png",
    imageAlt: "Visual Memory",
    imageLeft: true,
    finalScene: false,
  },
  {
    id: "scene-5",
    tagline: "AuraVision 2026",
    title: "The Future of\nIndependence",
    description: "Redefining accessibility through the power of agentic AI and computer vision.",
    quote: '"The world is yours to explore. I will be here to show you the way."',
    image: "/Cinematic-introduction/hero.png",
    imageAlt: "AuraVision Finale",
    imageLeft: false,
    finalScene: true,
  },
] as const;

export function VisionShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SCENES.length);
    }, SCENE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [currentIndex]);

  const progress = useMemo(
    () => ((currentIndex + 1) / SCENES.length) * 100,
    [currentIndex],
  );

  const currentScene = SCENES[currentIndex];
  const titleLines = currentScene.title.split("\n");

  return (
    <section className="relative z-10 overflow-hidden bg-[#030712] pb-12 pt-4 md:pb-16">
      <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#36d1ff]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-[#f43f5e]/20 blur-[120px]" />

      <div className="relative mx-auto w-[95vw] max-w-[1400px] overflow-hidden border border-white/10 bg-black shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85),0_0_40px_rgba(54,209,255,0.15)]">
        <div className="relative aspect-video">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentScene.image}
                alt=""
                fill
                priority={currentIndex === 0}
                className="scale-110 object-cover opacity-40 blur-[45px]"
                sizes="100vw"
              />

              <div className="absolute inset-0 p-4 sm:p-8 md:p-10 lg:p-14">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                  className={`grid h-full w-full gap-8 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl md:p-10 ${
                    currentScene.finalScene ? "grid-cols-1 place-items-center text-center" : "grid-cols-1 lg:grid-cols-2"
                  }`}
                >
                  {currentScene.finalScene ? (
                    <div className="flex max-w-4xl flex-col items-center gap-5">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#36d1ff]">
                        {currentScene.tagline}
                      </span>
                      <h2 className="text-balance text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl">
                        {titleLines.map((line, idx) => (
                          <span key={line}>
                            {line}
                            {idx < titleLines.length - 1 ? <br /> : null}
                          </span>
                        ))}
                      </h2>
                      <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                        {currentScene.description}
                      </p>
                      <blockquote className="relative mt-3 max-w-2xl rounded-2xl border-b-4 border-[#36d1ff] bg-[#36d1ff]/10 px-6 py-5 text-base italic leading-relaxed text-white/90 md:text-lg">
                        <span className="absolute right-4 top-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#36d1ff]">
                          Alice
                        </span>
                        {currentScene.quote}
                      </blockquote>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`flex flex-col justify-center gap-5 ${
                          currentScene.imageLeft ? "order-2 lg:order-2" : "order-1"
                        }`}
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#36d1ff]">
                          {currentScene.tagline}
                        </span>
                        <h2 className="text-balance text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
                          {titleLines.map((line, idx) => (
                            <span key={line}>
                              {line}
                              {idx < titleLines.length - 1 ? <br /> : null}
                            </span>
                          ))}
                        </h2>
                        <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                          {currentScene.description}
                        </p>
                        <blockquote className="relative mt-2 max-w-xl rounded-r-2xl border-l-4 border-[#36d1ff] bg-[#36d1ff]/10 px-5 py-4 text-sm italic leading-relaxed text-white/90 md:text-base">
                          <span className="absolute right-4 top-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#36d1ff]">
                            Alice
                          </span>
                          {currentScene.quote}
                        </blockquote>
                      </div>

                      <div
                        className={`flex items-center justify-center ${
                          currentScene.imageLeft ? "order-1 lg:order-1" : "order-2"
                        }`}
                      >
                        <motion.div
                          animate={{ y: [0, -12, 0] }}
                          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          className="relative h-[260px] w-full max-w-[430px] overflow-hidden rounded-[24px] md:h-[320px]"
                        >
                          <Image
                            src={currentScene.image}
                            alt={currentScene.imageAlt}
                            fill
                            className="object-contain drop-shadow-[0_0_32px_rgba(54,209,255,0.45)]"
                            sizes="(max-width: 1024px) 80vw, 450px"
                          />
                        </motion.div>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-white/10">
            <motion.div
              className="h-full bg-[#36d1ff] shadow-[0_0_15px_#36d1ff]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
