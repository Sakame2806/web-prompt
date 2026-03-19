"use client";

import React from "react";

interface StarBorderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    as?: React.ElementType;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: string;
}

export function StarBorder({
    as: Component = "button",
    className = "",
    children,
    color = "#00E5E5",
    speed = "6s",
    ...rest
}: StarBorderProps) {
    return (
        <Component
            className={`relative inline-block py-[1px] overflow-hidden rounded-lg group ${className}`}
            {...rest}
        >
            <div
                className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div
                className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div className="relative z-1 bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/5 text-white text-center rounded-lg py-2 px-6 flex items-center justify-center w-full h-full">
                {children}
            </div>
        </Component>
    );
}
