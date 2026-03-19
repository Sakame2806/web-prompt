"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
    "Next.js",
    "React",
    "Tailwind CSS",
    "TypeScript",
    "Framer Motion",
    "Supabase",
    "Vercel",
    "Node.js"
];

// Duplicate items twice for a seamless loop
const MARQUEE_ITEMS = [...TECH_STACK, ...TECH_STACK];

export function CarouselSection() {
    return (
        <section className="relative w-full py-24 overflow-hidden bg-transparent flex flex-col items-center">
            {/* Subtle Heading */}
            <div className="mb-12 text-center">
                <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
                    Powered by cutting-edge technology
                </p>
            </div>

            {/* Carousel Container with Mask Image */}
            <div className="w-full max-w-[1400px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">

                {/* Scrolling Track */}
                <motion.div
                    className="flex gap-16 lg:gap-24 w-max pr-16 lg:pr-24"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30, // Adjusted duration for smoother scrolling
                        ease: "linear",
                    }}
                >
                    {MARQUEE_ITEMS.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center shrink-0 cursor-default group"
                        >
                            <span className="text-xl md:text-2xl font-bold tracking-tight text-zinc-600 transition-colors duration-300 group-hover:text-white">
                                {item}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
