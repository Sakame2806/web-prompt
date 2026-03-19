"use client";

import { motion } from "framer-motion";

export function FeatureShowcase() {
    return (
        <section className="w-full bg-[#0a0a0a]">
            {/* Main Container */}
            <div className="max-w-[1200px] mx-auto px-6 py-24 flex flex-col gap-32">

                {/* Row 1: Text Left, Image Right */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Text Column */}
                    <div>
                        <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase mb-3 block">
                            Live Command Center
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Total Environmental Awareness
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            The Smart Dashboard provides a continuous, low-latency video feed. Powered by YOLOv26, the Live HUD lets you see exactly what the AI observes, complete with deduplicated object lists, confidence scores, and real-time danger highlighting.
                        </p>
                    </div>

                    {/* Image Column */}
                    <div className="h-[400px] w-full rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(0,229,229,0.1)] flex items-center justify-center">
                        <span className="text-zinc-500 font-medium">Live Camera Panel HUD</span>
                    </div>
                </motion.div>

                {/* Row 2: Image Left, Text Right on Desktop */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Image Column (Order First on Desktop) */}
                    <div className="order-last lg:order-first h-[400px] w-full rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.1)] flex items-center justify-center">
                        <span className="text-zinc-500 font-medium">Live Log Console & Memory</span>
                    </div>

                    {/* Text Column */}
                    <div>
                        <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-3 block">
                            AI Reasoning & Memory
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Unprecedented Transparency
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Keep track of everything with the Live Log Console and Semantic Memory. Alice, your AI guide, synthesizes visual data into natural language, allowing you to search historical data, ask where you left your keys, and export daily activity reports.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
