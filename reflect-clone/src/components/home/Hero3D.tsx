"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  Canvas,
  useFrame,
} from "@react-three/fiber";
import {
  Environment,
  MeshTransmissionMaterial,
  ContactShadows,
  Stars,
  Float,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

// ─── Register GSAP plugin client-side only ───────────────────────────────────
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Mouse tracker (shared across inner components) ──────────────────────────
const mouse = new THREE.Vector2();
if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

// ─── Outer Glow Ring ─────────────────────────────────────────────────────────
function GlowRing() {
  const ringRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.25;
      ringRef.current.rotation.z = clock.elapsedTime * 0.08;
      const pulse = 0.95 + Math.sin(clock.elapsedTime * 1.4) * 0.05;
      ringRef.current.scale.setScalar(pulse);
    }
  });
  return (
    <mesh ref={ringRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.72, 0.006, 16, 200]} />
      <meshBasicMaterial color="#00E5FF" transparent opacity={0.45} />
    </mesh>
  );
}

// ─── Inner Orbiting Particle Ring ────────────────────────────────────────────
// ─── Frosted Cyber-Glass Sphere ───────────────────────────────────────────────
function GlassSphere({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const scrollProgressRef = useRef({ value: 0 });

  // GSAP ScrollTrigger: drive scrollProgress (used for rotation speed + Z-depth)
  useEffect(() => {
    if (!scrollRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(scrollProgressRef.current, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top top",
          end: "140% top",
          scrub: 1.4,
        },
      });
    });
    return () => ctx.revert();
  }, [scrollRef]);

  // Per-frame: float, mouse-driven lean, scroll-driven rotation + Z-depth
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      const scrollProgress = scrollProgressRef.current.value;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.14;
      groupRef.current.position.z = THREE.MathUtils.lerp(0, -7, scrollProgress);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.18,
        0.06
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.18,
        0.06
      );
    }
    if (meshRef.current) {
      const scrollProgress = scrollProgressRef.current.value;
      const baseSpeed = 0.004;
      const boostedSpeed = 0.03;
      const rotationDelta = THREE.MathUtils.lerp(baseSpeed, boostedSpeed, scrollProgress);
      meshRef.current.rotation.y += rotationDelta;

      const proximity = Math.sqrt(mouse.x ** 2 + mouse.y ** 2);
      const bulge = 1 + proximity * 0.05;
      meshRef.current.scale.z = THREE.MathUtils.lerp(
        meshRef.current.scale.z,
        bulge,
        0.08
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main glass sphere */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh ref={meshRef} position={[0, 0, 0]} scale={1}>
          <sphereGeometry args={[1.5, 256, 256]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={1}
            thickness={2}
            roughness={0.05}
            chromaticAberration={0.06}
            anisotropy={0.3}
            color="#00E5FF"
            attenuationColor="#00E5FF"
            attenuationDistance={1.1}
            envMapIntensity={2.5}
          />
        </mesh>
      </Float>

      {/* Inner frosted core (backlit depth illusion) */}
      <mesh position={[0, 0, 0]} scale={0.72}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#001f2e"
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Cyan rim glow sphere */}
      <mesh position={[0, 0, 0]} scale={1.04}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      <GlowRing />
    </group>
  );
}

// ─── Parallax Points Field ─────────────────────────────────────────────────────
function ParallaxPoints() {
  const pointsRef = useRef<THREE.Group>(null!);
  const count = 900;
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + seededRandom(i * 3 + 1) * 6;
      const theta = seededRandom(i * 3 + 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 3) - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const parallaxStrength = 0.8;
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      mouse.x * parallaxStrength,
      0.06
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      mouse.y * parallaxStrength,
      0.06
    );
    pointsRef.current.rotation.y += 0.0008;
  });

  return (
    <group ref={pointsRef}>
      <Points
        positions={positions}
        stride={3}
        frustumCulled
      >
        <PointMaterial
          transparent
          color="#8ae8ff"
          size={0.035}
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

// ─── Scene lighting + environment ────────────────────────────────────────────
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      {/* Key: cyan from upper-right */}
      <pointLight position={[5, 5, 4]} intensity={80} color="#00E5FF" />
      {/* Fill: warm white from lower-left */}
      <pointLight position={[-5, -3, -3]} intensity={30} color="#ffffff" />
      {/* Rim: deep purple from behind */}
      <pointLight position={[0, 0, -6]} intensity={20} color="#7B61FF" />
      <spotLight
        position={[0, 8, 6]}
        angle={0.45}
        penumbra={1}
        intensity={180}
        color="#8be9ff"
        castShadow
      />
    </>
  );
}

// ─── Hero entrance animation wrapper ─────────────────────────────────────────
function FadeUp({
  delay,
  children,
  className,
  style,
}: {
  delay: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.85, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Full Hero3D scene ────────────────────────────────────────────────────────
export function Hero3D() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollContainerRef} className="relative" style={{ height: "200vh" }}>
      {/* Sticky full-screen stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Layered deep-space background (no flat black disk) */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: [
              "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,229,255,0.12) 0%, transparent 65%)",
              "radial-gradient(ellipse 55% 45% at 20% 80%, rgba(123,97,255,0.14) 0%, transparent 70%)",
              "radial-gradient(ellipse 40% 35% at 80% 10%, rgba(255,255,255,0.06) 0%, transparent 70%)",
            ].join(", "),
          }}
        />

        {/* ── R3F Canvas ── */}
        <Canvas
          className="absolute inset-0 z-10"
          camera={{ position: [0, 0, 6.5], fov: 42 }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
        >
          {/* Deep star field behind everything */}
          <Stars
            radius={90}
            depth={60}
            count={5000}
            factor={3.5}
            saturation={0.3}
            fade
            speed={0.4}
          />

          <SceneLights />
          <Environment preset="night" />

          {/* Parallax points halo */}
          <ParallaxPoints />

          {/* The hero glass sphere */}
          <GlassSphere scrollRef={scrollContainerRef} />

          {/* Ground contact shadow for depth */}
          <ContactShadows
            position={[0, -2.1, 0]}
            opacity={0.45}
            scale={7}
            blur={2.5}
            far={3}
            color="#00E5FF"
          />
        </Canvas>

        {/* ── Hero Text Overlay ── */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none">
          <div className="flex flex-col items-center gap-5 text-center px-6">

            {/* Eyebrow pill */}
            <FadeUp
              delay={0.6}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00E5FF]/25 bg-[#00E5FF]/5 pointer-events-auto"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-[#00E5FF] text-xs font-medium tracking-[0.2em] uppercase">
                Now in Beta
              </span>
            </FadeUp>

            {/* H1 */}
            <FadeUp delay={0.72}>
              <h1
                className="text-6xl md:text-[88px] font-bold tracking-tight text-white leading-none"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Think in{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #00E5FF 0%, #7B61FF 55%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Aura
                </span>
              </h1>
            </FadeUp>

            {/* Sub */}
            <FadeUp
              delay={0.84}
              className="max-w-lg text-base md:text-lg text-white/45 leading-relaxed"
            >
              The spatial intelligence layer that turns scattered thoughts
              into crystallised knowledge — in real time.
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={0.96} className="flex gap-4 mt-1 pointer-events-auto">
              <motion.a
                href="#features"
                className="px-7 py-3 rounded-full bg-[#00E5FF] text-black text-sm font-semibold tracking-wide shadow-[0_0_32px_6px_rgba(0,229,255,0.38)]"
                whileHover={{ scale: 1.06, boxShadow: "0 0 50px 10px rgba(0,229,255,0.55)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 320 }}
              >
                Get Early Access
              </motion.a>
              <motion.a
                href="#vision"
                className="px-7 py-3 rounded-full border border-white/12 text-white/65 text-sm font-medium tracking-wide"
                whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.28)", color: "#fff" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320 }}
              >
                See the vision →
              </motion.a>
            </FadeUp>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <span className="text-white/20 text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-[#00E5FF]/30 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Soft bridge into the next section to avoid a hard black gap */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-44 z-30 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(3,12,20,0.55) 52%, rgba(0,0,0,0.95) 100%)",
          }}
        />
      </div>
    </div>
  );
}
