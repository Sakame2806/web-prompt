"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOP_ROW_IMAGES = [
  { src: "/showcase/grid-1.jpg", alt: "Abstract architecture with light trails" },
  { src: "/showcase/grid-2.jpg", alt: "Sleek digital interface detail" },
  { src: "/showcase/grid-3.jpg", alt: "Modern installation with ambient glow" },
  { src: "/showcase/grid-4.jpg", alt: "Spatial composition with neon accents" },
];

const BOTTOM_ROW_IMAGES = [
  { src: "/showcase/grid-5.jpg", alt: "Architectural light corridor" },
  { src: "/showcase/grid-6.jpg", alt: "Futuristic gallery installation" },
];

type ScatterState = {
  x: number;
  y: number;
  z: number;
  rotate: number;
  scale: number;
  blur: number;
  opacity: number;
};

const SCATTER_STATE = [
  { x: -220, y: -150, z: -260, rotate: -2.8, scale: 0.84, blur: 15, opacity: 0.4 },
  { x: 220, y: -150, z: -260, rotate: 2.8, scale: 0.84, blur: 15, opacity: 0.4 },
  { x: -148, y: 86, z: -138, rotate: -1.7, scale: 0.93, blur: 9, opacity: 0.62 },
  { x: 148, y: 86, z: -138, rotate: 1.7, scale: 0.93, blur: 9, opacity: 0.62 },
  { x: -74, y: -18, z: 56, rotate: -1.1, scale: 1.04, blur: 3.5, opacity: 0.88 },
  { x: 74, y: -18, z: 56, rotate: 1.1, scale: 1.04, blur: 3.5, opacity: 0.88 },
] as const satisfies readonly ScatterState[];

const ASSEMBLY_TIMING = [
  { start: 0.16, duration: 0.84 },
  { start: 0.2, duration: 0.88 },
  { start: 0.25, duration: 0.82 },
  { start: 0.31, duration: 0.89 },
  { start: 0.35, duration: 0.8 },
  { start: 0.41, duration: 0.86 },
];

export function AuraShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const topCardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const bottomCardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const isGridLockedRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const topCards = topCardsRef.current.filter((card): card is HTMLDivElement => Boolean(card));
      const bottomCards = bottomCardsRef.current.filter((card): card is HTMLDivElement => Boolean(card));
      const allCards = [...topCards, ...bottomCards];
      const totalAssemblyProgress = Math.max(...ASSEMBLY_TIMING.map((timing) => timing.start + timing.duration));
      const fadeInDuration = totalAssemblyProgress * 0.1;

      allCards.forEach((card, index) => {
        const scatter = SCATTER_STATE[index];
        gsap.set(card, {
          transformPerspective: 1200,
          x: scatter.x,
          y: scatter.y,
          z: scatter.z,
          rotate: scatter.rotate,
          scale: scatter.scale,
          opacity: 0,
          filter: `blur(${scatter.blur}px)`,
          willChange: "transform, filter, opacity",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "+=120%",
          scrub: 1,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          once: true,
          onUpdate: (self) => {
            if (self.progress >= 0.985) {
              isGridLockedRef.current = true;
            }
          },
        },
        onComplete: () => {
          isGridLockedRef.current = true;
        },
      });

      allCards.forEach((card, index) => {
        const scatter = SCATTER_STATE[index];
        tl.to(
          card,
          {
            opacity: scatter.opacity,
            duration: fadeInDuration,
            ease: "none",
          },
          0
        );
      });

      allCards.forEach((card, index) => {
        const timing = ASSEMBLY_TIMING[index];
        tl.to(
          card,
          {
            y: 0,
            x: 0,
            z: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            duration: timing.duration,
          },
          timing.start
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isGridLockedRef.current) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 2.8;
    const rotateX = (0.5 - py) * 2.8;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.26,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCardLeave = (event: MouseEvent<HTMLDivElement>) => {
    if (!isGridLockedRef.current) return;
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.38,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section id="technology" ref={sectionRef} className="relative z-0 mt-0 pt-0 bg-[#050505]">
      <div
        ref={pinRef}
        className="relative mt-0 pt-0 flex h-screen items-center justify-center overflow-hidden px-4 md:px-10 [perspective:1800px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_28%,black_100%)]"
        style={{ WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 28%, black 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_12%,rgba(54,209,255,0.1),transparent_64%),radial-gradient(ellipse_90%_66%_at_50%_100%,rgba(54,209,255,0.1),transparent_65%)]" />

        <div className="relative w-full max-w-[1240px]">
          <div className="grid grid-cols-12 gap-[20px]">
            {TOP_ROW_IMAGES.map((item, index) => (
              <div
                key={item.src}
                ref={(el) => {
                  topCardsRef.current[index] = el;
                }}
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
                className="relative col-span-6 md:col-span-3 aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 [transform-style:preserve-3d]"
                style={{ filter: "brightness(0.7)" }}
              >
                <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}

            {BOTTOM_ROW_IMAGES.map((item, index) => (
              <div
                key={item.src}
                ref={(el) => {
                  bottomCardsRef.current[index] = el;
                }}
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
                className="relative col-span-12 md:col-span-6 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 [transform-style:preserve-3d]"
                style={{ filter: "brightness(0.7)" }}
              >
                <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
