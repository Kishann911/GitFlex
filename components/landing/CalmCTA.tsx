"use client";

import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { TextReveal } from "@/components/ui/TextReveal";

export function CalmCTA() {
    return (
        <section className="w-full bg-zinc-950 py-48 px-4 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[50vw] h-[50vw] bg-lime-400/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
                    <TextReveal delay={0.1}>Your profile</TextReveal> <br />
                    <TextReveal delay={0.2}>is waiting.</TextReveal>
                </h2>

                <Magnetic strength={60}>
                    <button className="relative group overflow-hidden bg-white text-black px-12 py-6 rounded-full font-bold text-lg md:text-xl tracking-wide transition-transform duration-300 hover:scale-105">
                        <span className="relative z-10">Connect GitHub</span>
                        <div className="absolute inset-0 bg-lime-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </button>
                </Magnetic>

                <p className="mt-8 text-zinc-600 text-sm">No credit card. Just vibes.</p>
            </div>
        </section>
    );
}
