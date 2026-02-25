"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface StaggerContainerProps {
    children: ReactNode;
    delay?: number;
    staggerDelay?: number;
    className?: string;
}

export function StaggerContainer({
    children,
    delay = 0,
    staggerDelay = 0.1,
    className
}: StaggerContainerProps) {
    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className={twMerge(className)}
        >
            {children}
        </motion.div>
    );
}

// Helper wrapper for children inside StaggerContainer
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            }
        },
    };

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
}
