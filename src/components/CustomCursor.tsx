"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(true); // Default to true to prevent hydration mismatch
    const pathname = usePathname();

    // Smooth spring configuration for the cursor
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(-100, springConfig);
    const cursorY = useSpring(-100, springConfig);

    useEffect(() => {
        // Only show on non-touch devices
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX - 16); // offset by half the width (32/2)
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over a clickable element or specific interactive class
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("hover-lift") ||
                target.closest(".hover-lift")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        if (!isMobile) {
            window.addEventListener("mousemove", updateMousePosition);
            window.addEventListener("mouseover", handleMouseOver);
        }

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [isMobile, cursorX, cursorY]);

    // Reset hover state on route change
    useEffect(() => {
        setIsHovering(false);
    }, [pathname]);

    if (isMobile) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
            style={{
                x: cursorX,
                y: cursorY,
            }}
            animate={{
                scale: isHovering ? 2.5 : 1,
                backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)",
                border: isHovering ? "none" : "1px solid rgba(255, 255, 255, 0.8)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full bg-blend-difference"
                animate={{
                    opacity: isHovering ? 0 : 1,
                    scale: isHovering ? 0 : 1
                }}
            />
        </motion.div>
    );
}
