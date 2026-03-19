"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

const headingWords = "Mapping the Unseen.".split(" ");
const bodyWords =
  "Aura V uses spatial intelligence to interpret depth, movement, and context in real time, transforming uncertainty into guided awareness for every step forward.".split(
    " "
  );

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function WireframeGrid() {
  const groupRef = useRef<THREE.Group>(null);
  const grid = useMemo(() => {
    const helper = new THREE.GridHelper(34, 34, "#39f0ff", "#14566b");
    const material = helper.material as THREE.Material & {
      transparent: boolean;
      opacity: number;
    };
    material.transparent = true;
    material.opacity = 0.42;
    helper.rotation.x = Math.PI / 2;
    helper.position.z = -0.75;
    return helper;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.12) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <primitive object={grid} />
    </group>
  );
}

function AssistantOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.012;
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.9) * 0.12;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 56, 56]} />
      <meshPhysicalMaterial
        color="#6cf2ff"
        roughness={0.15}
        metalness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.05}
        transmission={0.85}
        opacity={0.95}
        transparent
        emissive="#00e5ff"
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

export function SpatialVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(revealRef.current, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(laserRef.current, { top: "0%" });
      gsap.set(iconRef.current, { autoAlpha: 0, scale: 1 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(laserRef.current, { top: `${progress * 100}%` });
          gsap.set(revealRef.current, {
            clipPath: `inset(0 0 ${(1 - progress) * 100}% 0)`,
          });
          gsap.set(iconRef.current, {
            autoAlpha: 1,
            scale: gsap.utils.interpolate(1, 0.45, progress),
          });
        },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom top",
        onLeave: () => gsap.set(iconRef.current, { autoAlpha: 0 }),
        onLeaveBack: () => gsap.set(iconRef.current, { autoAlpha: 0 }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative min-h-[170vh] bg-[#050505] text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
            <color attach="background" args={["#050505"]} />
            <ambientLight intensity={0.25} />
            <pointLight position={[2, 4, 5]} intensity={20} color="#00d5ff" />
            <WireframeGrid />
          </Canvas>
        </div>

        <div
          ref={revealRef}
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,229,255,0.15) 0%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        <div
          ref={laserRef}
          className="absolute left-0 right-0 h-px bg-[#56eeff]"
          style={{ boxShadow: "0 0 22px rgba(0,229,255,0.95)" }}
        />

        <div className="relative z-10 h-full px-6 md:px-10 lg:px-16">
          <div className="mx-auto grid h-full max-w-6xl items-center gap-12 md:grid-cols-2">
            <motion.h2
              className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.7 }}
            >
              {headingWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={wordVariants}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              className="max-w-xl text-base leading-relaxed text-white/70 md:text-xl"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.7 }}
            >
              {bodyWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={wordVariants}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>
        </div>
      </div>

      <div
        ref={iconRef}
        className="pointer-events-none fixed right-6 top-24 z-40 h-20 w-20 rounded-full border border-[#00E5FF]/35 bg-[#030708]/70 shadow-[0_0_25px_rgba(0,229,255,0.28)] backdrop-blur-sm"
      >
        <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[2.2, 3.2, 2.4]} intensity={28} color="#8ceeff" />
          <AssistantOrb />
        </Canvas>
      </div>
    </section>
  );
}
