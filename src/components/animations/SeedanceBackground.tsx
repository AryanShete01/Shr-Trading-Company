"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Hammer,
    Paintbrush,
    Zap,
    Droplets,
    ShieldCheck,
    Wrench,
    Cog,
    HardHat
} from "lucide-react";

interface FloatingIconProps {
    icon: any;
    delay: number;
    initialX: number;
    initialY: number;
    scale?: number;
    opacity?: number;
}

const FloatingIcon = ({ icon: Icon, delay, initialX, initialY, scale = 1, opacity = 0.1 }: FloatingIconProps) => {
    return (
        <motion.div
            className="absolute pointer-events-none"
            initial={{
                x: `${initialX}%`,
                y: `${initialY}%`,
                opacity: 0,
                rotate: 0,
                scale: scale
            }}
            animate={{
                y: [`${initialY - 2}%`, `${initialY + 2}%`, `${initialY - 2}%`],
                rotate: [0, 5, -5, 0],
                opacity: opacity
            }}
            transition={{
                y: { duration: 10 + Math.random() * 5, repeat: Infinity, ease: "easeInOut", delay },
                rotate: { duration: 15 + Math.random() * 10, repeat: Infinity, ease: "easeInOut", delay },
                opacity: { duration: 2, delay: delay }
            }}
        >
            <div className="p-8 rounded-3xl glass backdrop-blur-xl border border-white/5 shadow-2xl">
                <Icon size={48} className="text-primary/40" />
            </div>
        </motion.div>
    );
};

export default function SeedanceBackground() {
    const [mounted, setMounted] = useState(false);
    const { scrollYProgress } = useScroll();

    // Parallax effect for the background glows
    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020617]">
            {/* Cinematic Radial Glows */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-primary/10 rounded-full blur-[180px]"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-secondary/10 rounded-full blur-[180px]"
            />
            <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[150px]" />

            {/* Drifting Industrial Assets */}
            <FloatingIcon icon={Hammer} delay={0} initialX={10} initialY={20} scale={0.8} opacity={0.05} />
            <FloatingIcon icon={Paintbrush} delay={2} initialX={85} initialY={15} scale={1.2} opacity={0.08} />
            <FloatingIcon icon={Zap} delay={4} initialX={75} initialY={70} scale={0.9} opacity={0.06} />
            <FloatingIcon icon={Droplets} delay={1} initialX={5} initialY={65} scale={1.1} opacity={0.07} />
            <FloatingIcon icon={ShieldCheck} delay={3} initialX={40} initialY={85} scale={0.7} opacity={0.04} />
            <FloatingIcon icon={Wrench} delay={5} initialX={50} initialY={10} scale={0.8} opacity={0.05} />

            {/* Grain Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-radial-vignette"></div>
        </div>
    );
}
