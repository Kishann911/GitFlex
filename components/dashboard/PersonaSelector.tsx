"use client";

import { motion } from "framer-motion";
import { VisualTheme } from "@/lib/intelligence";

interface PersonaSelectorProps {
    currentTheme: VisualTheme;
    onSelect: (theme: VisualTheme) => void;
}

const themes: { id: VisualTheme; label: string; abstract: string }[] = [
    {
        id: "Architect",
        label: "The Architect",
        abstract: "bg-blue-500"
    },
    {
        id: "Artist",
        label: "The Artist",
        abstract: "bg-purple-500"
    },
    {
        id: "Minimalist",
        label: "The Minimalist",
        abstract: "bg-zinc-100"
    },
];

export function PersonaSelector({ currentTheme, onSelect }: PersonaSelectorProps) {
    return (
        <div className="flex gap-4 p-2 bg-zinc-900/50 backdrop-blur-md rounded-xl border border-zinc-800">
            {themes.map((theme) => {
                const isActive = currentTheme === theme.id;
                return (
                    <button
                        key={theme.id}
                        onClick={() => onSelect(theme.id)}
                        className={`relative px-4 py-8 rounded-lg overflow-hidden transition-all duration-300 w-32 ${isActive ? "ring-2 ring-lime-400 scale-105 bg-zinc-900" : "hover:bg-zinc-800 opacity-60 hover:opacity-100"
                            }`}
                    >
                        <div className={`w-8 h-8 rounded-full mb-3 mx-auto ${theme.abstract} ${isActive ? 'shadow-[0_0_15px_rgba(255,255,255,0.3)]' : ''}`} />
                        <span className={`text-xs font-bold uppercase tracking-wide block text-center ${isActive ? "text-white" : "text-zinc-500"}`}>
                            {theme.label}
                        </span>

                        {isActive && (
                            <motion.div
                                layoutId="activeGlow"
                                className="absolute inset-0 bg-lime-400/5 pointer-events-none"
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
