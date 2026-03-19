"use client";

import { motion } from "framer-motion";

export function AnimationPortal() {
    return (
        <div className="relative w-full overflow-hidden flex justify-center -mb-32">
            {/* 
        This div is specifically for fulfilling the user's previous request 
        about having an 'animation-portal' id
      */}
            <div id="animation-portal" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0">

                {/* Core glow from the portal */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[400px] bg-[#C084FC]/30 blur-[150px] rounded-[100%] pointer-events-none" />
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[250px] bg-[#E879F9]/50 blur-[100px] rounded-[100%] pointer-events-none" />
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[150px] bg-white text-transparent blur-[60px] rounded-[100%] pointer-events-none" />

                {/* Portal arch base (The white-hot singularity ring) */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[180px] rounded-[200px_200px_0_0] border-[16px] border-white/95 shadow-[0_0_120px_40px_rgba(192,132,252,0.8),inset_0_0_80px_20px_rgba(232,121,249,0.9)] z-10" />

                {/* Deep dark center */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-[40%] w-[368px] h-[160px] bg-[#030305] rounded-[180px_180px_0_0] border-[6px] border-[#030305] z-20" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-[1000px] h-[400px] pointer-events-none"
            >
                {/* Invisible spacer to reserve space for the background effect to peek out before the app UI */}
            </motion.div>
        </div>
    )
}
