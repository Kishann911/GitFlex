"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";

export function EditorialSection() {
    return (
        <section className="relative w-full bg-black py-48 px-4 overflow-hidden border-t border-zinc-900">

            {/* Narrative Statement 1 - Broken Alignment */}
            <div className="relative max-w-screen-xl mx-auto h-[100vh]">
                {/* Large text anchored top-left */}
                <div className="absolute top-0 left-0 max-w-4xl z-20">
                    <h2 className="text-display font-bold text-white">
                        <TextReveal delay={0.1}>YOUR GITHUB</TextReveal> <br />
                        <span className="ml-[10vw]"><TextReveal delay={0.2}>IS YOUR</TextReveal></span> <br />
                        <span className="text-zinc-700 ml-[5vw]"><TextReveal delay={0.3}>RESUME.</TextReveal></span>
                    </h2>
                </div>

                {/* Overlapping small text aligned weirdly */}
                <div className="absolute top-[30%] right-[10%] max-w-xs text-right z-30 mix-blend-difference">
                    <p className="text-narrative font-light text-zinc-400">
                        Stop looking like everyone else. <br />
                        <span className="text-lime-400">Make them remember you.</span>
                    </p>
                </div>

                {/* Image/Visual deeply overlapping text */}
                <div className="absolute top-[40%] left-[20%] w-[30vw] aspect-[3/4] z-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="w-full h-full bg-zinc-900 border border-zinc-700 overflow-hidden">
                        <div className="w-full h-full bg-[linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111),linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111)] bg-[size:20px_20px]" />
                    </div>
                </div>
            </div>

            {/* Narrative Statement 2 - Sparse & Bottom Heavy */}
            <div className="relative max-w-screen-xl mx-auto h-[80vh] flex flex-col items-end justify-end">
                <div className="relative z-20 text-right">
                    <h2 className="text-display font-bold leading-none">
                        <span className="block mr-[10vw]">QUIETLY</span>
                        <span className="block text-lime-400">ARROGANT.</span>
                    </h2>
                </div>
                <div className="border-l border-zinc-800 h-64 absolute bottom-0 right-[35%] z-10" />
                <div className="absolute bottom-12 left-0 max-w-md">
                    <p className="text-zinc-600 text-sm uppercase tracking-widest font-mono">
                        System 01 / Visual Authority <br />
                        Designed for high-output engineers.
                    </p>
                </div>
            </div>

        </section>
    );
}
