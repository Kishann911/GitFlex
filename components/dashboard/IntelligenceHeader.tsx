"use client";

import { motion } from "framer-motion";
import { IntelligenceReport, GitFlexRole, VisualTheme } from "@/lib/intelligence";
import { Info, CheckCircle2, AlertCircle, TrendingUp, Sparkles, RefreshCcw, Palette } from "lucide-react";

interface IntelligenceHeaderProps {
    report: IntelligenceReport;
    onAdjust: (role: GitFlexRole) => void;
    onThemeChange: (theme: VisualTheme) => void;
    onReRun: () => void;
}

const ALL_ROLES: GitFlexRole[] = ["Frontend Engineer", "Backend Architect", "Indie Hacker", "Creative Technologist", "ML Engineer", "Full Stack Dev", "Systems Designer", "UI Scientist"];
const THEMES: { id: VisualTheme; color: string }[] = [
    { id: "Architect", color: "bg-blue-500" },
    { id: "Artist", color: "bg-purple-500" },
    { id: "Minimalist", color: "bg-zinc-100" }
];

export function IntelligenceHeader({ report, onAdjust, onThemeChange, onReRun }: IntelligenceHeaderProps) {
    const roleParts = report.primary.role.split(' ');

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
            {/* Primary Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <CheckCircle2 className="w-32 h-32" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="px-3 py-1 bg-lime-400 text-black text-[10px] font-bold uppercase tracking-widest rounded-full">
                                Primary Identity
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-xs">
                                <Sparkles className="w-3 h-3" />
                                {report.primary.confidence}% Confidence
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-syne font-bold text-white mb-6 uppercase tracking-tight leading-[0.9]">
                            {roleParts[0]} <span className="text-zinc-500 line-through decoration-lime-400/50">{roleParts[1] || ''}</span>
                            <span className="block text-lime-400">
                                {report.primary.role}
                            </span>
                        </h1>

                        <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-8 border-l-2 border-lime-400/30 pl-6">
                            {report.primary.explanation}
                        </p>
                    </div>

                    <div className="relative z-10 space-y-6">
                        {/* Interactive Overrides */}
                        <div className="pt-6 border-t border-zinc-800/50">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div>
                                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block mb-3">Override Persona</span>
                                    <div className="flex gap-2 p-1 bg-zinc-950 rounded-lg border border-zinc-900 overflow-x-auto no-scrollbar max-w-md">
                                        {ALL_ROLES.map(role => (
                                            <button
                                                key={role}
                                                onClick={() => onAdjust(role)}
                                                className={`px-3 py-1.5 rounded-md text-[10px] whitespace-nowrap transition-all ${report.primary.role === role
                                                        ? "bg-lime-400 text-black font-bold"
                                                        : "text-zinc-500 hover:text-white"
                                                    }`}
                                            >
                                                {role}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block mb-3">Adjust Theme</span>
                                    <div className="flex gap-3">
                                        {THEMES.map(t => (
                                            <button
                                                key={t.id}
                                                onClick={() => onThemeChange(t.id)}
                                                className={`w-8 h-8 rounded-full border-2 transition-all ${report.primary.theme === t.id
                                                        ? "border-lime-400 scale-110"
                                                        : "border-transparent opacity-40 hover:opacity-100"
                                                    } ${t.color}`}
                                                title={t.id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button className="px-6 py-2.5 bg-white text-black font-bold rounded-full text-sm hover:scale-105 transition-transform flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                Accept Identity
                            </button>
                            <button
                                onClick={onReRun}
                                className="px-6 py-2.5 bg-zinc-800/50 backdrop-blur-md text-white font-bold rounded-full text-sm hover:bg-zinc-700 transition-colors flex items-center gap-2 border border-zinc-700"
                            >
                                <RefreshCcw className="w-4 h-4" />
                                Re-run Analysis
                            </button>
                        </div>
                    </div>
                </div>

                {/* Signals Column */}
                <div className="space-y-4">
                    {/* Secondary Persona */}
                    {report.secondary && (
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors group cursor-pointer" onClick={() => onAdjust(report.secondary!.role)}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Secondary Signal</span>
                                <span className="text-xs font-mono text-lime-400">{report.secondary.confidence}%</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">{report.secondary.role}</h3>
                            <p className="text-xs text-zinc-500 mb-4">{report.secondary.explanation}</p>
                            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${report.secondary.confidence}%` }}
                                    className="h-full bg-zinc-400"
                                />
                            </div>
                        </div>
                    )}

                    {/* Emerging Signal */}
                    {report.emerging && (
                        <div className="bg-lime-400/5 border border-lime-400/20 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="w-4 h-4 text-lime-400" />
                                <span className="text-xs font-mono uppercase tracking-widest text-lime-400">Emerging Trend</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">{report.emerging.title.replace('Emerging: ', '')}</h3>
                            <p className="text-xs text-zinc-400">{report.emerging.description}</p>
                        </div>
                    )}

                    {/* Stack Strength */}
                    <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 block mb-4">Ecosystem Dominance</span>
                        <div className="space-y-3">
                            {Object.entries(report.stackStrength).slice(0, 4).sort((a, b) => b[1] - a[1]).map(([name, strength]) => (
                                <div key={name}>
                                    <div className="flex justify-between text-[10px] font-mono mb-1">
                                        <span className="text-zinc-400">{name}</span>
                                        <span className="text-white">{strength}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${strength}%` }}
                                            className="h-full bg-lime-400/50"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
