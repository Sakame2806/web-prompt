"use client";

import { motion } from "framer-motion";
import { ScrollRevealWords } from "@/components/ui/ScrollRevealWords";

export default function HeroSplit() {
  return (
    <section className="relative min-h-screen bg-transparent text-white px-6 md:px-20">
      <div className="relative z-10 min-h-screen mx-auto w-full max-w-6xl flex items-center justify-center">
        <div className="w-full text-center space-y-8 md:space-y-10">
          <ScrollRevealWords
            text="Think in Aura"
            className="text-5xl md:text-8xl font-light tracking-tighter text-white"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mx-auto max-w-3xl text-lg md:text-2xl text-white/50 leading-relaxed font-light"
          >
            Aura V is the ultimate cognitive co-pilot for driven minds. It provides a dynamic,
            3D-accelerated workspace that organizes your thoughts, accelerates your workflow, and
            empowers your creativity.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
