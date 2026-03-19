"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const placeholderImg = "/showcase/placeholder.jpg";

const CARDS = [
  { id: 1, top: "10%", left: "7%", width: "19rem", height: "13rem", driftX: -62, driftY: -120, depth: -130, delay: 0.05, hideMobile: true },
  { id: 2, top: "12%", left: "31%", width: "10rem", height: "10rem", driftX: -14, driftY: -84, depth: -80, delay: 0.12, hideMobile: true },
  { id: 3, top: "10%", right: "10%", width: "16rem", height: "12rem", driftX: 58, driftY: -110, depth: -120, delay: 0.19, hideMobile: true },
  { id: 4, top: "52%", left: "7%", width: "12rem", height: "15rem", driftX: -55, driftY: 118, depth: -110, delay: 0.26, hideMobile: false },
  { id: 5, top: "47%", left: "27%", width: "12rem", height: "15rem", driftX: -20, driftY: 76, depth: -90, delay: 0.33, hideMobile: true },
  { id: 6, top: "44%", right: "28%", width: "10rem", height: "15rem", driftX: 18, driftY: 72, depth: -90, delay: 0.4, hideMobile: true },
  { id: 7, top: "45%", right: "9%", width: "13rem", height: "16rem", driftX: 52, driftY: 120, depth: -120, delay: 0.47, hideMobile: false },
];

export function AuraShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!sectionRef.current || !centerRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=210%",
          scrub: 1.05,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        centerRef.current,
        {
          scale: 0.82,
          yPercent: 8,
          rotationX: 8,
          filter: "blur(8px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.7)",
        },
        {
          scale: 1.26,
          yPercent: -2,
          rotationX: 0,
          filter: "blur(0px)",
          boxShadow: "0 30px 110px rgba(0,0,0,0.85), 0 0 70px rgba(0,229,255,0.2)",
          ease: "none",
        },
        0
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const cfg = CARDS[index];
        tl.to(
          card,
          {
            x: cfg.driftX,
            y: cfg.driftY,
            z: cfg.depth,
            opacity: 0.55,
            scale: 1.04,
            ease: "none",
          },
          0
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="technology" ref={sectionRef} className="relative h-[300vh] bg-[#050505]">
      <div className="sticky top-0 h-screen overflow-hidden [perspective:2200px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_50%_52%,rgba(12,36,70,0.45),transparent_68%),radial-gradient(ellipse_80%_90%_at_50%_110%,rgba(0,20,45,0.45),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a1122]/65 to-transparent" />
        <div aria-hidden className="film-grain-overlay absolute inset-0 z-[2] pointer-events-none opacity-[0.06]" />

        {CARDS.map((card, index) => (
          <motion.div
            key={card.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            initial={{ opacity: 0, y: 30, x: card.driftX * -0.25, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: card.delay, ease: [0.2, 0.9, 0.25, 1] }}
            className={`absolute z-10 overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-[0_0_48px_rgba(0,229,255,0.12)] ${
              card.hideMobile ? "hidden md:block" : "block"
            }`}
            style={{
              top: card.top,
              left: card.left,
              right: card.right,
              width: card.width,
              height: card.height,
            }}
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/5 via-black/18 to-black/55" />
            <Image
              src={placeholderImg}
              alt={`Aura showcase card ${card.id}`}
              width={900}
              height={700}
              className="h-full w-full object-cover saturate-[0.72] brightness-[0.62]"
            />
          </motion.div>
        ))}

        <motion.div
          ref={centerRef}
          initial={{ opacity: 0, y: 42, scale: 0.84, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 1, ease: [0.2, 0.9, 0.25, 1] }}
          className="absolute left-1/2 top-1/2 z-30 w-[min(33vw,340px)] min-w-[235px] -translate-x-1/2 -translate-y-1/2 rounded-[2.7rem] border border-white/20 bg-[#080b11]/92 p-2.5 shadow-[0_20px_80px_rgba(0,0,0,0.85)]"
        >
          <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2.15rem] border border-white/10 bg-[#06090f]">
            <div className="absolute left-1/2 top-2.5 z-20 h-7 w-28 -translate-x-1/2 rounded-full border border-white/10 bg-black/80" />
            <Image
              src={placeholderImg}
              alt="Aura phone mockup"
              width={960}
              height={1920}
              className="h-full w-full object-cover brightness-[0.6] saturate-[0.7]"
            />
            <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.08)_28%,rgba(0,0,0,0.45)_100%)]" />
            <div className="absolute inset-x-4 bottom-4 z-20 rounded-xl border border-white/10 bg-black/55 p-3 backdrop-blur-sm">
              <div className="h-2.5 w-24 rounded-full bg-cyan-300/70" />
              <div className="mt-2 h-2 w-full rounded-full bg-white/20" />
              <div className="mt-1.5 h-2 w-4/5 rounded-full bg-white/15" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
