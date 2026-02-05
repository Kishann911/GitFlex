"use client";

import { motion } from "framer-motion";
import { RepoIntelligenceReport, RepoArchetype } from "@/lib/repoIntelligence";
import { CheckCircle2, Box, Package, Activity, RefreshCcw, LayoutTemplate, ShieldCheck } from "lucide-react";

interface RepoIntelligenceHeaderProps {
    report: RepoIntelligenceReport;
    onReRun: () => void;
}

const STABILITY_COLORS = {
    "Stable": "text-lime-400 bg-lime-400/10 border-lime-400/20",
    "Beta": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    "Alpha": "text-orange-400 bg-orange-400/10 border-orange-400/20",
    "Experimental": "text-pink-400 bg-pink-400/10 border-pink-400/20",
    "Deprecated": "text-red-400 bg-red-400/10 border-red-400/20",
};

export function RepoIntelligenceHeader({ report, onReRun }: RepoIntelligenceHeaderProps) {
    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Archetype Card */}
                <div className="lg:col-span-2 bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Box className="w-40 h-40" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2">
                                <LayoutTemplate size={12} />
                                Project Archetype
                            </div>
                            <div className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border ${STABILITY_COLORS[report.stability]}`}>
                                {report.stability}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-syne font-bold text-white mb-4 uppercase tracking-tight">
                            {report.archetype}
                        </h1>

                        <div className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-8 border-l-2 border-lime-400/30 pl-6">
                            <p>{report.explanation}</p>
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-wrap gap-3 pt-6 border-t border-zinc-800/50">
                        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                            <ShieldCheck className="w-4 h-4 text-lime-400" />
                            <span className="text-xs text-zinc-300 font-mono">Confidence: <span className="text-white">{report.confidence}%</span></span>
                        </div>

                        {report.install && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                                <Package className="w-4 h-4 text-blue-400" />
                                <span className="text-xs text-zinc-300 font-mono">Installer: <span className="text-white">{report.install.manager}</span></span>
                            </div>
                        )}

                        <button
                            onClick={onReRun}
                            className="ml-auto px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-full transition-colors flex items-center gap-2"
                        >
                            <RefreshCcw className="w-3 h-3" />
                            Rescan
                        </button>
                    </div>
                </div>

                {/* Signals Column */}
                <div className="space-y-4">
                    {/* Detected Signals */}
                    <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 h-full">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="w-4 h-4 text-lime-400" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">Structural DNA</span>
                        </div>

                        <div className="space-y-4">
                            {report.signals.map((signal, i) => (
                                <div key={i} className="flex gap-3 items-start group">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-lime-400 transition-colors" />
                                    <div>
                                        <div className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">{signal.name}</div>
                                        <div className="text-[10px] text-zinc-500 font-mono">{signal.evidence}</div>
                                    </div>
                                </div>
                            ))}

                            {report.signals.length === 0 && (
                                <div className="text-zinc-600 text-xs italic">No specific signals detected. Using naming heuristics.</div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-zinc-900">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 block mb-3">Tech Stacks</span>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(report.techStack).map(([tech, version]) => (
                                    <span key={tech} className="px-2 py-1 bg-zinc-900 text-zinc-400 border border-zinc-800/50 rounded text-[10px] font-mono">
                                        {tech} {version && <span className="text-zinc-600">v{version}</span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
