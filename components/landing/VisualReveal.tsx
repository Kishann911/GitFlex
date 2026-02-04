"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function VisualReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const rotateX = useTransform(scrollYProgress, [0.2, 0.5], [15, 0]);
    const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

    return (
        <section ref={containerRef} className="min-h-screen w-full bg-black flex flex-col items-center justify-center py-24 px-4 perspective-1000">
            <div className="mb-12 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-4"
                >
                    VISUAL AUTHORITY
                </motion.h2>
                <p className="text-zinc-500 max-w-lg mx-auto">
                    Don't just write code. <span className="text-white">Exhibit it.</span>
                </p>
            </div>

            <motion.div
                style={{ rotateX, scale, opacity }}
                className="w-full max-w-6xl aspect-video bg-zinc-900 rounded-lg border border-zinc-800 shadow-2xl relative overflow-hidden group"
            >
                {/* Mock UI Showcase */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-zinc-800 mx-auto mb-6 border-2 border-lime-400/50" />
                        <div className="h-4 w-48 bg-zinc-800 rounded mx-auto mb-3" />
                        <div className="h-3 w-32 bg-zinc-800/50 rounded mx-auto" />
                    </div>
                </div>

                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </motion.div>
        </section>
    );
}
