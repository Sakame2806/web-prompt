"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function generateStars(count: number) {
  let shadow = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    const opacity = (Math.random() * 0.8 + 0.2).toFixed(2);
    shadow.push(`${x}px ${y}px rgba(255, 255, 255, ${opacity})`);
  }
  return shadow.join(", ");
}

export function DeveloperStarfield() {
  const [stars, setStars] = useState("");

  useEffect(() => {
    // Generate star shadow string only on the client
    setStars(generateStars(200));
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-[2px] h-[2px] bg-transparent rounded-full"
        style={{ boxShadow: stars }}
        animate={{ y: [0, -2000] }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[2px] h-[2px] bg-transparent rounded-full"
        style={{ boxShadow: stars, top: "2000px" }}
        animate={{ y: [0, -2000] }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
