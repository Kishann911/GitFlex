"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Check, Loader2, Search, Code2, Cpu, UserCircle2, BarChart3, RotateCcw, XCircle, Terminal } from "lucide-react";

export type AnalysisStageId = "fetching" | "languages" | "stacks" | "persona" | "scoring";

export interface AnalysisStage {
    id: AnalysisStageId;
    label: string;
    description: string;
    icon: React.ReactNode;
    status: "waiting" | "active" | "completed" | "error";
    progress: number;
    subtext?: string;
}

interface CinematicAnalysisProps {
    onComplete: () => void;
    onCancel: () => void;
}

const STAGE_CONFIG: Record<AnalysisStageId, { label: string, desc: string, icon: any }> = {
    fetching: { label: "Repository Discovery", desc: "Indexing public contributions...", icon: Search },
    languages: { label: "Linguistic Analysis", desc: "Parsing language distribution...", icon: Code2 },
    stacks: { label: "Stack Detection", desc: "Identifying primary frameworks...", icon: Cpu },
    persona: { label: "Persona Mapping", desc: "Synthesizing developer archetype...", icon: UserCircle2 },
    scoring: { label: "Profile Scoring", desc: "Calculating maturity signals...", icon: BarChart3 },
};

export function CinematicAnalysis({ onComplete, onCancel }: CinematicAnalysisProps) {
    const [stages, setStages] = useState<AnalysisStage[]>(
        (Object.keys(STAGE_CONFIG) as AnalysisStageId[]).map(id => ({
            id,
            label: STAGE_CONFIG[id].label,
            description: STAGE_CONFIG[id].desc,
            icon: <div />, // Placeholder, will set in render
            status: "waiting",
            progress: 0
        }))
    );
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [logs, setLogs] = useState<string[]>(["[SYSTEM] Initializing Neural Engine v2.0..."]);
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    useEffect(() => {
        if (currentStageIndex >= stages.length) {
            const timer = setTimeout(onComplete, 1200);
            return () => clearTimeout(timer);
        }

        const stage = stages[currentStageIndex];
        setStages(prev => prev.map((s, i) => i === currentStageIndex ? { ...s, status: "active" } : s));

        // Add a log entry for the new stage
        setLogs(prev => [...prev, `[PROCESS] Starting ${stage.label}...`]);

        let progress = 0;
        const interval = setInterval(() => {
            const increment = Math.random() * 8 + 2;
            progress += increment;

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                setStages(prev => prev.map((s, i) => i === currentStageIndex ? {
                    ...s,
                    status: "completed",
                    progress: 100,
                    subtext: "Optimization complete."
                } : s));

                setLogs(prev => [...prev, `[SUCCESS] ${stage.label} finalized.`]);

                setTimeout(() => setCurrentStageIndex(prev => prev + 1), 600);
            } else {
                setStages(prev => prev.map((s, i) => i === currentStageIndex ? { ...s, progress } : s));

                // Occasionally add sub-logs
                if (Math.random() > 0.8) {
                    const subLogs = {
                        fetching: ["Accessing GitHub API...", "Scanning 'web-portfolio'...", "Indexed 42 repos."],
                        languages: ["Mapped 12,042 lines of TS.", "Weighted Rust vs Go...", "Detected ShaderLab."],
                        stacks: ["Next.js recognized.", "Tailwind patterns found.", "GraphQL focus detected."],
                        persona: ["Analyzing commit sentiment...", "Mapping creative output...", "Architect traits: HIGH."],
                        scoring: ["Consistency: 92/100", "Diversity: 78/100", "Finalizing signals..."]
                    };
                    const potentialLogs = subLogs[stage.id];
                    setLogs(prev => [...prev, ` › ${potentialLogs[Math.floor(Math.random() * potentialLogs.length)]}`]);
                }
            }
        }, 200);

        return () => clearInterval(interval);
    }, [currentStageIndex, onComplete, stages.length]);

    const handleRetry = () => {
        window.location.reload(); // Hard reset for clean state
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-12 px-6 flex flex-col md:flex-row gap-8 items-stretch">
            {/* Pipeline UI */}
            <div className="flex-1 space-y-4">
                <div className="mb-8">
                    <motion.h2
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-syne font-bold mb-2 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent"
                    >
                        Analyzing presence
                    </motion.h2>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                            Real-time streaming active
                        </span>
                    </div>
                </div>

                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {stages.map((stage, index) => {
                            const isVisible = index <= currentStageIndex;
                            const Icon = STAGE_CONFIG[stage.id].icon;
                            if (!isVisible) return null;

                            return (
                                <motion.div
                                    key={stage.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{
                                        opacity: stage.status === "completed" ? 0.4 : 1,
                                        x: 0,
                                        scale: stage.status === "active" ? 1.02 : 1
                                    }}
                                    className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-500 ${stage.status === "active"
                                        ? "bg-zinc-900/40 border-lime-400/20 shadow-[0_0_30px_rgba(163,230,53,0.05)]"
                                        : "bg-zinc-950/20 border-zinc-900"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg transition-colors duration-500 ${stage.status === "completed"
                                            ? "text-lime-400"
                                            : stage.status === "active"
                                                ? "text-lime-400"
                                                : "text-zinc-600"
                                            }`}>
                                            {stage.status === "completed" ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className={`font-medium text-sm ${stage.status === "active" ? "text-white" : "text-zinc-500"}`}>
                                                    {stage.label}
                                                </h3>
                                                {stage.status === "active" && (
                                                    <span className="text-[10px] font-mono text-lime-400">
                                                        {Math.round(stage.progress)}%
                                                    </span>
                                                )}
                                            </div>
                                            {stage.status === "active" && (
                                                <div className="mt-2 h-[1px] w-full bg-zinc-800 overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-lime-400"
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: `${stage.progress}%` }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Terminal/Log View */}
            <div className="w-full md:w-80 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col overflow-hidden">
                <div className="p-3 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/30">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                    </div>
                    <Terminal className="w-3.5 h-3.5 text-zinc-600" />
                </div>
                <div
                    ref={logContainerRef}
                    className="flex-1 p-4 font-mono text-[10px] space-y-1 overflow-y-auto scrollbar-hide text-zinc-500"
                >
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={log.startsWith("[SYSTEM]") ? "text-blue-400" : log.startsWith("[SUCCESS]") ? "text-lime-400" : log.startsWith(" ›") ? "text-zinc-600" : "text-zinc-400"}
                        >
                            {log}
                        </motion.div>
                    ))}
                    {currentStageIndex < stages.length && (
                        <div className="w-1 h-3 bg-lime-400 animate-pulse inline-block ml-1 align-middle" />
                    )}
                </div>
                <div className="p-4 border-t border-zinc-900 grid grid-cols-2 gap-2">
                    <button onClick={onCancel} className="text-[10px] uppercase tracking-widest font-bold py-2 border border-zinc-800 rounded hover:bg-zinc-900 transition-colors">
                        Abort
                    </button>
                    <button onClick={handleRetry} className="text-[10px] uppercase tracking-widest font-bold py-2 border border-zinc-800 rounded hover:bg-zinc-900 transition-colors text-zinc-600">
                        Retry
                    </button>
                </div>
            </div>
        </div>
    );
}
