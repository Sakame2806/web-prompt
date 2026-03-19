"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function FinalCTA() {
    return (
        <section className="w-full py-32 px-6">
            <div className="max-w-[1000px] mx-auto w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-[2rem] p-12 md:p-20 text-center overflow-hidden border border-white/10 bg-[#050505]"
                >
                    {/* Radial Glow Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/40 via-[#050505] to-[#050505] pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                            Ready to experience the world differently?
                        </h2>
                        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
                            Securely synced across your devices with customizable voices, languages, and alert frequencies. Join the SmartAV waitlist today.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="#"
                                className="bg-[#00E5E5] hover:bg-cyan-400 text-black font-semibold rounded-lg px-8 py-3 transition-colors"
                            >
                                Join Waitlist
                            </Link>
                            <Link
                                href="#"
                                className="bg-transparent border border-white/20 text-white hover:bg-white/5 rounded-lg px-8 py-3 transition-colors"
                            >
                                Read the Docs
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
