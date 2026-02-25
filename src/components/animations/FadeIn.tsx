"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    className?: string;
    fullWidth?: boolean;
    duration?: number;
}

export function FadeIn({
    children,
    delay = 0,
    direction = "up",
    className,
    fullWidth = false,
    duration = 0.6
}: FadeInProps) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
        none: { x: 0, y: 0 },
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directions[direction]
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: duration,
                ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth easing
                delay: delay,
            }}
            className={twMerge(fullWidth ? "w-full" : "", className)}
        >
            {children}
        </motion.div>
    );
}
