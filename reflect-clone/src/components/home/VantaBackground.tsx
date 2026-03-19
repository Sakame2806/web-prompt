"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-expect-error - vanta does not have type definitions
import HALO from 'vanta/dist/vanta.halo.min';

export function VantaBackground() {
    const [vantaEffect, setVantaEffect] = useState<unknown>(null);
    const vantaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!vantaEffect && vantaRef.current) {
            const effect = HALO({
                el: vantaRef.current,
                THREE: THREE,
                backgroundColor: 0x000000,
                baseColor: 0x512da8,
                amplitudeFactor: 2.5,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
            });
            setVantaEffect(effect);
        }

        return () => {
            if (vantaEffect) (vantaEffect as { destroy: () => void }).destroy();
        };
    }, [vantaEffect]);

    return (
        <div ref={vantaRef} className="absolute inset-0 -z-10 h-full w-full" />
    );
}
