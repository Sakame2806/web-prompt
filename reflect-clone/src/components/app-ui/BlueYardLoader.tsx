"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BlueYardLoader({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds to reach 100%

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min((progress / duration) * 100, 100);

      setCount(Math.floor(percentage));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 200);
      }
    };

    requestAnimationFrame(animate);
    return () => setIsVisible(false);
  }, [onComplete]);

  // We declare the styles HERE, before the return statement!
  const faceStyles = "absolute inset-0 flex items-center justify-center text-[#FDF1EE] font-bold text-[10px] text-center border border-zinc-800 shadow-xl";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="blueyard-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDF1EE]"
        >
          {/* 3D Spinning Box Container */}
          <div style={{ perspective: "1000px" }} className="mb-12 w-16 h-16">
            <motion.div
              animate={{
                rotateY: 360,
                rotateX: 360,
                rotateZ: 360, // Multi-axis circular tumble
              }}
              transition={{
                duration: 15, // Much faster! (Adjust this number if it makes you dizzy)
                ease: "linear",
                repeat: Infinity,
              }}
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front Face */}
              <div className={`bg-black ${faceStyles}`} style={{ transform: "translateZ(32px)" }}>
                AURA <br /> V
              </div>

              {/* Back Face */}
              <div className={`bg-black ${faceStyles}`} style={{ transform: "rotateY(180deg) translateZ(32px)" }}>
                AURA <br /> V
              </div>

              {/* Left Face */}
              <div className={`bg-zinc-900 ${faceStyles}`} style={{ transform: "rotateY(-90deg) translateZ(32px)" }}>
                AURA <br /> V
              </div>

              {/* Right Face */}
              <div className={`bg-zinc-900 ${faceStyles}`} style={{ transform: "rotateY(90deg) translateZ(32px)" }}>
                AURA <br /> V
              </div>

              {/* Top Face */}
              <div className={`bg-zinc-800 ${faceStyles}`} style={{ transform: "rotateX(90deg) translateZ(32px)" }}>
                AURA <br /> V
              </div>

              {/* Bottom Face */}
              <div className={`bg-zinc-950 ${faceStyles}`} style={{ transform: "rotateX(-90deg) translateZ(32px)" }}>
                AURA <br /> V
              </div>
            </motion.div>
          </div>

          {/* Counter */}
          <div className="font-mono text-2xl tracking-widest text-black">
            {count.toString().padStart(3, "0")}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}