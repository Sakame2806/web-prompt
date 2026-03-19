"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PARTICLE_COUNT = 2000;
const CLOUD_RADIUS = 18;
const CLOUD_DEPTH = 96;
const FRONT_LIMIT = 16;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function VaporParticles({
  streamStrengthRef,
}: {
  streamStrengthRef: React.RefObject<{ value: number }>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const wrapsRef = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT));

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const base = i * 3;
      arr[base] = (seededRandom(base + 1) * 2 - 1) * CLOUD_RADIUS;
      arr[base + 1] = (seededRandom(base + 2) * 2 - 1) * CLOUD_RADIUS;
      arr[base + 2] = -(seededRandom(base + 3) * CLOUD_DEPTH);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    const data = points.geometry.attributes.position.array as Float32Array;
    const streamStrength = streamStrengthRef.current?.value ?? 0.08;
    const speed = streamStrength * delta * 60;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const base = i * 3;
      data[base + 2] += speed;
      if (data[base + 2] > FRONT_LIMIT) {
        wrapsRef.current[i] += 1;
        const wrapSeed = i * 7 + wrapsRef.current[i] * 31 + state.clock.elapsedTime;
        data[base] = (seededRandom(wrapSeed + 1) * 2 - 1) * CLOUD_RADIUS;
        data[base + 1] = (seededRandom(wrapSeed + 2) * 2 - 1) * CLOUD_RADIUS;
        data[base + 2] = -CLOUD_DEPTH;
      }
    }

    points.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#7ff6ff"
        size={0.06}
        sizeAttenuation
        depthWrite={false}
        opacity={0.86}
      />
    </Points>
  );
}

export function VaporFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const streamStrengthRef = useRef({ value: 0.11 });

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        streamStrengthRef.current,
        { value: 0.08 },
        {
          value: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, section);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      section.style.setProperty("--glow-x", `${x}%`);
      section.style.setProperty("--glow-y", `${y}%`);
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden bg-black [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)]"
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "50%",
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(58rem circle at var(--glow-x) var(--glow-y), rgba(0,119,255,0.18) 0%, rgba(0,119,255,0.06) 38%, transparent 74%)",
          transition: "background-position 120ms linear",
        }}
      />

      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,18,30,0.58) 0%, rgba(4,18,30,0.24) 34%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 14], fov: 58 }}>
          <VaporParticles streamStrengthRef={streamStrengthRef} />
        </Canvas>
      </div>

      <div className="relative z-20 min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, filter: "blur(14px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#dffbff] uppercase tracking-[0.35em] text-xs md:text-sm mb-8"
          >
            Deep Processing Layer
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, filter: "blur(24px)", y: 28 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="text-white text-5xl sm:text-6xl md:text-8xl lg:text-[7.2rem] leading-[0.95] font-thin tracking-tight"
            style={{ fontWeight: 100 }}
          >
            Mapping the Unseen
          </motion.h2>
        </div>
      </div>

      <div aria-hidden className="film-grain-overlay absolute inset-0 z-30 pointer-events-none" />
    </section>
  );
}
