import React, { ReactNode } from 'react';

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
}

export function GradientText({
    children,
    className = '',
    colors = ['#ffffff', '#00E5E5', '#047857', '#ffffff'],
    animationSpeed = 8,
}: GradientTextProps) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
        backgroundSize: '300% 100%',
        animationDuration: `${animationSpeed}s`,
    };

    return (
        <span
            className={`bg-clip-text text-transparent animate-gradient ${className}`}
            style={gradientStyle}
        >
            {children}
        </span>
    );
}
