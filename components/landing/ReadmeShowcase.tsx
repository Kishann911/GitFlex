"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/ui/TextReveal";

const spreads = [
    { id: 1, title: "The Manifesto", gradient: "from-zinc-900 to-black", accent: "text-white" },
    { id: 2, title: "The Stack", gradient: "from-zinc-800 to-zinc-950", accent: "text-lime-400" },
    { id: 3, title: "The Project", gradient: "from-blue-950 to-black", accent: "text-blue-400" },
    { id: 4, title: "The Connect", gradient: "from-purple-950 to-black", accent: "text-purple-400" },
];

export function ReadmeShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="h-[400vh] bg-black relative">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4">
                <div className="mb-8 text-center z-20">
                    <TextReveal className="text-zinc-500 uppercase tracking-widest text-sm text-center">Infinite Variety</TextReveal>
                </div>

                <div className="relative w-full max-w-4xl h-[60vh]">
                    {spreads.map((spread, i) => {
                        const targetScale = 1 - (spreads.length - 1 - i) * 0.05;

                        const rangeStart = i * (1 / spreads.length);
                        const rangeEnd = rangeStart + (1 / spreads.length);

                        return (
                            <Card
                                key={spread.id}
                                i={i}
                                spread={spread}
                                progress={scrollYProgress}
                                range={[rangeStart, rangeEnd]}
                                targetScale={targetScale}
                                total={spreads.length}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

const Card = ({ i, spread, progress, range, targetScale, total }: any) => {
    const scale = useTransform(progress, [range[0], range[1]], [1, targetScale]);

    // Cards actually need to stay pinned or move slightly. 
    // We want a deck functionality where top card flies AWAY.

    // Active range: When this card is the "top" one.
    const activeY = useTransform(progress, [range[0], range[1]], ["0%", "-100%"]);

    // For stacking context (reverse index)
    const zIndex = total - i;

    // We only animate Y if it's NOT the last card.
    const y = i === total - 1 ? 0 : activeY;

    return (
        <motion.div
            style={{
                scale,
                y,
                zIndex
            }}
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl origin-bottom bg-black"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${spread.gradient}`} />
            <div className="absolute inset-0 p-12 flex flex-col justify-between">
                <div>
                    <span className="text-9xl text-white/5 font-bold absolute top-[-20px] left-[-20px] select-none">{spread.id}</span>
                </div>
                <div>
                    <h3 className={`text-6xl md:text-8xl font-bold ${spread.accent} font-syne`}>{spread.title}</h3>
                    <p className="text-zinc-500 mt-4 text-xl">System generated. Designer approved.</p>
                </div>
            </div>
        </motion.div>
    );
};
