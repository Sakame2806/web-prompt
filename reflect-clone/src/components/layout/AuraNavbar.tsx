"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Vision", href: "#vision" },
  { label: "Developer", href: "#developer" },
  { label: "Technology", href: "#technology" },
  { label: "About", href: "#about" },
];

export function AuraNavbar() {
  const { scrollY } = useScroll();

  // As user scrolls: glass becomes more opaque
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.7]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0.08, 0.2]);
  const blurAmount = useTransform(scrollY, [0, 120], [0, 20]);

  const backgroundColor = useMotionTemplate`rgba(5, 5, 5, ${bgOpacity})`;
  const borderBottom = useMotionTemplate`1px solid rgba(255, 255, 255, ${borderOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blurAmount}px)`;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-4"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      {/* Glass pill background */}
      <motion.div
        className="absolute inset-0 rounded-none"
        style={{
          backgroundColor,
          borderBottom,
          backdropFilter,
        }}
      />

      {/* Logo */}
      <motion.a
        href="/"
        className="relative z-10 flex items-center gap-2 group"
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {/* Cyan glow dot */}
        <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_12px_2px_#00E5FF]" />
        <span
          className="text-white font-bold text-lg tracking-widest uppercase"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Aura<span className="text-[#00E5FF]"> V</span>
        </span>
      </motion.a>

      {/* Links */}
      <ul className="relative z-10 hidden md:flex gap-10 items-center">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <NavLink href={link.href}>{link.label}</NavLink>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.a
        href="#features"
        className="relative z-10 hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-[#00E5FF]/40 text-[#00E5FF] text-sm font-medium tracking-wide hover:bg-[#00E5FF]/10 transition-colors duration-300"
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px 2px rgba(0,229,255,0.25)" }}
        whileTap={{ scale: 0.97 }}
      >
        Get Early Access
      </motion.a>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="relative text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 group"
    >
      {children}
      {/* Underline micro-animation */}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#00E5FF] group-hover:w-full transition-all duration-300 ease-out" />
    </a>
  );
}
