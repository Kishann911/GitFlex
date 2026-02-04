"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";

const personas = [
    {
        id: "architect",
        label: "The Architect",
        description: "Structure. Systems. Clean lines. Your code is a blueprint.",
        color: "bg-blue-500",
        gradient: "from-blue-500 to-indigo-900",
    },
    {
        id: "artist",
        label: "The Artist",
        description: "Expression. Chaos. Beauty. Your code is a canvas.",
        color: "bg-purple-500",
        gradient: "from-purple-500 to-pink-900",
    },
    {
        id: "minimalist",
        label: "The Minimalist",
        description: "Less. But better. Your code is silence.",
        color: "bg-zinc-100",
        gradient: "from-white to-zinc-400",
    },
];

export function PersonaSwitcher() {
    const [activePersona, setActivePersona] = useState(personas[0]);
    const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

    const toggleSelection = (id: string) => {
        setSelectedStyles(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const isSelected = selectedStyles.includes(activePersona.id);

    return (
        <section className="w-full bg-zinc-950 py-32 px-4 relative overflow-hidden text-left">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 relative z-10">

                {/* Navigation / Selection */}
                <div className="w-full md:w-1/3 flex flex-col justify-center">
                    <h3 className="text-zinc-500 text-sm uppercase tracking-widest mb-8">Select Persona</h3>
                    <div className="flex flex-col gap-6">
                        {personas.map((persona) => (
                            <div key={persona.id} className="flex items-center gap-4">
                                <button
                                    onClick={() => setActivePersona(persona)}
                                    className={`text-left text-3xl md:text-5xl font-bold transition-all duration-300 ${activePersona.id === persona.id
                                            ? "text-white translate-x-4"
                                            : "text-zinc-700 hover:text-zinc-500"
                                        }`}
                                >
                                    {persona.label}
                                </button>
                                {selectedStyles.includes(persona.id) && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-2 h-2 rounded-full bg-lime-400"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 h-24">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={activePersona.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-zinc-400 text-lg"
                            >
                                {activePersona.description}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Ownership Action */}
                    <div className="mt-12">
                        <button
                            onClick={() => toggleSelection(activePersona.id)}
                            className={`px-8 py-4 rounded font-mono text-sm uppercase tracking-widest transition-all duration-300 ${isSelected
                                    ? "bg-lime-400 text-black shadow-[0_0_20px_rgba(163,230,53,0.3)]"
                                    : "bg-zinc-900 text-white border border-zinc-700 hover:border-lime-400"
                                }`}
                        >
                            {isSelected ? "Style Selected" : "Select this Vibe"}
                        </button>
                    </div>
                </div>

                {/* Visual Preview */}
                <div className="w-full md:w-2/3 h-[60vh] relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePersona.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${activePersona.gradient} opacity-20`} />

                            {/* Abstract Shapes based on Persona */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {activePersona.id === 'architect' && (
                                    <div className="grid grid-cols-4 gap-4 opacity-50">
                                        {[...Array(16)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="w-16 h-16 border border-blue-400/30"
                                            />
                                        ))}
                                    </div>
                                )}
                                {activePersona.id === 'artist' && (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="w-96 h-96 rounded-full blur-[100px] bg-purple-600/40"
                                    />
                                )}
                                {activePersona.id === 'minimalist' && (
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "20%" }}
                                        className="h-[1px] bg-white"
                                    />
                                )}
                            </div>

                            {/* Mock UI Card */}
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <div className="w-full max-w-md bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`w-12 h-12 rounded-full ${activePersona.color}`} />
                                        <div className="space-y-2">
                                            <div className="h-2 w-24 bg-zinc-800 rounded" />
                                            <div className="h-2 w-16 bg-zinc-800 rounded" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-2 w-full bg-zinc-800/50 rounded" />
                                        <div className="h-2 w-3/4 bg-zinc-800/50 rounded" />
                                        <div className="h-2 w-1/2 bg-zinc-800/50 rounded" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
