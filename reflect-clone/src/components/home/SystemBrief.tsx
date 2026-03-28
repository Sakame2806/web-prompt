"use client";

import { motion, type Variants } from "framer-motion";

const PILLARS = [
  {
    title: "Hyper-Perception",
    body: "Powered by YOLOv11, Aura V identifies high-risk objects and environmental hazards with millisecond latency.",
  },
  {
    title: "Contextual Cognition",
    body: "Using Gemini 2.5 Flash, Alice understands the world not just as pixels, but as a meaningful, multimodal narrative.",
  },
  {
    title: "Semantic Memory",
    body: "With a persistent ChromaDB vector store, the system remembers where you've been and what you've seen, creating a searchable visual journal.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SystemBrief() {
  return (
    <section className="relative z-10 bg-[#050505] px-6 py-24 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="mb-12 text-center text-[11px] uppercase tracking-[0.35em] text-white/25">
          One System. Total Awareness.
        </p>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {PILLARS.map((pillar) => (
            <motion.article
              key={pillar.title}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#050505] p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 65% at 50% 40%, rgba(54,209,255,0.1) 0%, transparent 75%)",
                }}
              />

              <h3
                className="relative z-10 mb-4 text-3xl font-light tracking-tight text-white"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {pillar.title}
              </h3>
              <p className="relative z-10 text-sm leading-relaxed text-white/50 md:text-[15px]">
                {pillar.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
