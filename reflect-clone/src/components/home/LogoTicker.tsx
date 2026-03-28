"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const LOGOS = [
  { src: "/image src/Logo_1.png", alt: "Logo 1" },
  { src: "/image src/Logo_2.png", alt: "Logo 2" },
  { src: "/image src/Logo_3.webp", alt: "Logo 3" },
  { src: "/image src/Logo_4.png", alt: "Logo 4" },
  { src: "/image src/Logo_5.png", alt: "Logo 5" },
  { src: "/image src/Logo_6.png", alt: "Logo 6" },
  { src: "/image src/Logo_8.png", alt: "Logo 8" },
] as const;

const TICKER_LOGOS = [...LOGOS, ...LOGOS];

export function LogoTicker() {
  return (
    <section className="relative z-10">
      <div
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden bg-transparent border-0 [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]"
        style={{ WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)" }}
      >
        <motion.div
          className="flex w-max items-center gap-12 pr-12 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity, repeatType: "loop" }}
        >
          {TICKER_LOGOS.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="group flex shrink-0 items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={240}
                height={80}
                className="h-20 w-auto object-contain mix-blend-screen opacity-30 drop-shadow-[0_0_8px_rgba(54,209,255,0.1)] transition-all duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_0_24px_rgba(54,209,255,0.35)]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
