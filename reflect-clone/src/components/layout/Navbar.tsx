"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = ["Products", "Resources", "Developers", "Pricing"];

export function Navbar() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        // Run once on mount to handle initial scroll state
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navContainerVariants = {
        top: {
            backgroundColor: "rgba(0,0,0,0)",
            border: "1px solid rgba(255, 255, 255, 0)",
            borderRadius: "0px",
            padding: "24px 32px",
            width: "100%",
            maxWidth: "1200px",
            boxShadow: "none",
            backdropFilter: "blur(0px)",
        },
        scrolled: {
            backgroundColor: "rgba(10, 10, 10, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "99px",
            padding: "12px 24px",
            width: "fit-content",
            maxWidth: "100%",
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(12px)",
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none mt-2 md:mt-4">
            <motion.nav
                initial="top"
                animate={isScrolled ? "scrolled" : "top"}
                variants={navContainerVariants}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex items-center justify-between gap-6 relative overflow-hidden group hover:border-teal-500/30 transition-colors duration-300 pointer-events-auto"
            >
                {/* Glow effect matching bento boxes */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Left: Logo */}
                <div className="flex items-center relative z-10 shrink-0">
                    <Link href="/" className="text-white font-bold text-lg tracking-tight">
                        Vision X
                    </Link>
                </div>

                {/* Center: Animated Nav Links */}
                <div className="hidden md:flex items-center gap-1 relative z-10">
                    <ul className="flex items-center gap-1">
                        {navLinks.map((item, index) => (
                            <li
                                key={item}
                                className="relative"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {hoveredIndex === index && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white/10 rounded-full"
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <Link
                                    href="#"
                                    className="relative z-10 block px-4 py-2 text-[13px] font-medium text-zinc-400 hover:text-white transition-colors"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center relative z-10 shrink-0">
                    <Link
                        href="#"
                        className="bg-white text-black rounded-full px-5 py-2 font-medium text-[13px] hover:bg-white/90 transition-colors whitespace-nowrap"
                    >
                        Get Started
                    </Link>
                </div>
            </motion.nav>
        </header>
    );
}
