"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Starfield() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
            {/* Base Star Layers */}
            <div className="absolute inset-0 stars-layer-1"></div>
            <div className="absolute inset-0 stars-layer-2"></div>
            <div className="absolute inset-0 stars-layer-3"></div>

            {/* Nebula Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-600/5 rounded-full blur-[150px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/5 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>

            {/* Dynamic Particles */}
            <div className="absolute inset-0 opacity-30">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            opacity: Math.random() * 0.5 + 0.2,
                            scale: Math.random() * 1 + 0.5,
                        }}
                        animate={{
                            y: [null, "-20vh"],
                            opacity: [null, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 20,
                        }}
                    />
                ))}
            </div>

            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none"></div>
        </div>
    );
}
