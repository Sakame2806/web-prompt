"use client";

import { Button } from "@/components/ui/Button"
import { StarBorder } from "@/components/ui/StarBorder"
import { GradientText } from "@/components/ui/GradientText"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative w-full max-w-[1800px] mx-auto z-10 p-0 m-0 border-0 flex items-center min-h-[447px] bg-transparent">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full px-8 lg:px-[120px]">

                {/* Left Side: Text container matching EXACTLY 440x313, 0 padding/border/margin with flex gap */}
                <motion.div
                    className="flex flex-col items-start text-left w-full max-w-[440px] gap-[46px] p-0 m-0 border-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-[52px] md:text-[64px] font-medium tracking-tight text-white leading-[1.05] p-0 m-0">
                        <GradientText>
                            See World<br />Through Sound
                        </GradientText>
                    </h1>

                    <p className="text-[17px] leading-[1.6] text-zinc-400 font-normal p-0 m-0 max-w-[400px]">
                        Reflect builds the world&apos;s best daily notes app. Fast, flexible, and always ready.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 p-0 m-0">
                        <StarBorder as="button" color="#00E5E5" speed="3s">
                            <span className="text-[15px] font-medium transition-colors">Get Demo &rarr;</span>
                        </StarBorder>
                        <Button className="relative overflow-hidden group h-12 px-6 rounded-lg bg-black text-white border border-white/20 hover:border-teal-500/30 text-[15px] font-medium transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <span className="relative z-10">Check my AI score</span>
                        </Button>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
