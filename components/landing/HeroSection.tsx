"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { Magnetic } from "@/components/ui/Magnetic";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black text-white px-4"
        >
            <motion.div
                style={{ y, opacity }}
                className="z-10 flex flex-col items-center justify-center text-center mix-blend-difference"
            >
                <div className="overflow-visible"> {/* Allow Magnetic area to expand if needed */}
                    <TextReveal
                        className="text-[15vw] leading-[0.8] font-bold tracking-tighter text-white select-none"
                        type="char"
                        delay={0.1}
                    >
                        GITFLEX
                    </TextReveal>
                </div>
                <div className="overflow-hidden mt-8">
                    <TextReveal
                        className="text-xl md:text-2xl font-light tracking-wide text-zinc-400 uppercase"
                        type="word"
                        delay={0.5}
                    >
                        Visual Authority for Developers
                    </TextReveal>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute bottom-12 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest text-zinc-600 mb-2">Scroll to Flex</span>

                <Magnetic strength={30}>
                    <div className="w-[1px] h-16 bg-zinc-900 relative overflow-hidden flex justify-center cursor-pointer group">
                        <div className="absolute inset-0 bg-zinc-800" />
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-full bg-lime-400 group-hover:bg-white transition-colors"
                        />
                    </div>
                </Magnetic>
            </motion.div>
        </div>
    );
}
