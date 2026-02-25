"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Reduced timeout for better UX, but enough to see the entrance
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{
                        y: "-100%",
                        transition: {
                            duration: 0.8,
                            ease: [0.87, 0, 0.13, 1], // Custom cubic bezier for "curtain" effect
                            delay: 0.2
                        }
                    }}
                    className="fixed inset-0 z-[10000] bg-[#020617] flex items-center justify-center overflow-hidden"
                >
                    <div className="relative flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: { duration: 1, ease: "easeOut" }
                            }}
                            className="flex items-center gap-4"
                        >
                            <div className="flex flex-col items-center">
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: 0.5, duration: 0.8 }
                                    }}
                                    className="text-6xl md:text-8xl font-black text-white tracking-tighter"
                                >
                                    S<span className="text-primary">T</span>C
                                </motion.span>

                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: "100%",
                                        transition: { delay: 1, duration: 1, ease: "easeInOut" }
                                    }}
                                    className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-2"
                                />

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 0.4,
                                        transition: { delay: 1.5, duration: 0.5 }
                                    }}
                                    className="text-[10px] uppercase tracking-[0.5em] text-white mt-4 font-bold"
                                >
                                    Shreeraj Trading Company
                                </motion.p>
                            </div>
                        </motion.div>

                        {/* Subtle background glow */}
                        <motion.div
                            animate={{
                                opacity: [0.1, 0.2, 0.1],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -z-10 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
