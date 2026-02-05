"use client";

import { useState, useEffect } from "react";
import { ReadmePreview } from "@/components/dashboard/ReadmePreview";
import { ActionToolbar } from "@/components/dashboard/ActionToolbar";
import { PremiumLock } from "@/components/dashboard/PremiumLock";
import { UpgradeModal } from "@/components/dashboard/UpgradeModal";
import { generateVariants, ReadmeVariant } from "@/lib/generator";
import { analyzeProfile, IntelligenceReport, GitFlexRole, VisualTheme } from "@/lib/intelligence";
import { MOCK_ARCHITECT_REPOS } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { CinematicAnalysis } from "@/components/dashboard/CinematicAnalysis";
import { IntelligenceHeader } from "@/components/dashboard/IntelligenceHeader";

type FlowStatus = "idle" | "analyzing" | "previewing";

export default function DashboardPage() {
    const [status, setStatus] = useState<FlowStatus>("idle");
    const [report, setReport] = useState<IntelligenceReport | null>(null);
    const [variants, setVariants] = useState<ReadmeVariant[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("gitflex_analysis");
        if (saved) {
            try {
                const loadedReport = JSON.parse(saved);
                setReport(loadedReport);
                setVariants(generateVariants(loadedReport));
                setStatus("previewing");
            } catch (e) {
                console.error("Failed to load saved analysis", e);
            }
        }
    }, []);

    const startGeneration = () => {
        setStatus("analyzing");
    };

    const handleAnalysisComplete = () => {
        const newReport = analyzeProfile(MOCK_ARCHITECT_REPOS);
        setReport(newReport);
        localStorage.setItem("gitflex_analysis", JSON.stringify(newReport));
        setVariants(generateVariants(newReport));
        setStatus("previewing");
    };

    const handleCancel = () => {
        setStatus("idle");
    };

    const handleOverrideRole = (role: GitFlexRole) => {
        if (!report) return;
        const updated = { ...report, primary: { ...report.primary, role } };
        setReport(updated);
        setVariants(generateVariants(updated));
    };

    const handleOverrideTheme = (theme: VisualTheme) => {
        if (!report) return;
        const updated = { ...report, primary: { ...report.primary, theme } };
        setReport(updated);
        setVariants(generateVariants(updated));
    };

    const nextVariant = () => {
        setCurrentIndex((prev) => (prev + 1) % variants.length);
    };

    const prevVariant = () => {
        setCurrentIndex((prev) => (prev - 1 + variants.length) % variants.length);
    };

    const currentVariant = variants[currentIndex];
    const isLocked = currentVariant?.isPremium;

    return (
        <div className="min-h-screen bg-black text-white flex flex-col relative overflow-x-hidden">
            <AnimatePresence mode="wait">
                {status === "idle" && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.05),transparent_50%)]"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-xl text-center space-y-8"
                        >
                            <div className="w-20 h-20 bg-lime-400 rounded-2xl mx-auto flex items-center justify-center rotate-12 shadow-[0_0_50px_rgba(163,230,53,0.3)]">
                                <Sparkles className="w-10 h-10 text-black" />
                            </div>
                            <div>
                                <h1 className="text-5xl font-syne font-bold mb-4">Ready to Flex?</h1>
                                <p className="text-zinc-500 text-lg leading-relaxed">
                                    We&apos;ve scanned your GitHub metadata. Our neural engine is ready to synthesize your visual authority.
                                </p>
                            </div>
                            <button
                                onClick={startGeneration}
                                className="group relative px-12 py-5 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Generate My Profile
                                    <Sparkles className="w-4 h-4" />
                                </span>
                                <div className="absolute inset-0 bg-lime-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                            <p className="text-zinc-700 text-sm font-mono uppercase tracking-widest pt-4">
                                Status: Connection Secure // Data Encrypted
                            </p>
                        </motion.div>
                    </motion.div>
                )}

                {status === "analyzing" && (
                    <motion.div
                        key="analyzing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="min-h-screen w-full flex flex-col items-center justify-center"
                    >
                        <CinematicAnalysis onComplete={handleAnalysisComplete} onCancel={handleCancel} />
                    </motion.div>
                )}

                {status === "previewing" && report && (
                    <motion.div
                        key="previewing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 flex flex-col pt-24 pb-32"
                    >
                        {/* Header */}
                        <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black via-black/80 to-transparent">
                            <h1 className="font-syne text-xl font-bold tracking-tight">GITFLEX <span className="text-zinc-600 ml-2 text-sm font-mono">DASHBOARD</span></h1>
                            <div className="flex gap-2 items-center">
                                {isLocked && (
                                    <button onClick={() => setIsUpgradeOpen(true)} className="px-4 py-1.5 rounded-full bg-lime-400/10 text-lime-400 text-xs font-bold uppercase tracking-wide border border-lime-400/20 hover:bg-lime-400/20 transition-colors">
                                        Get Pro
                                    </button>
                                )}
                                <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse ml-2" />
                                <span className="text-xs font-mono text-zinc-500 uppercase">Profile Synced</span>
                            </div>
                        </header>

                        {/* Analysis Header Section */}
                        <IntelligenceHeader
                            report={report}
                            onAdjust={handleOverrideRole}
                            onThemeChange={handleOverrideTheme}
                            onReRun={() => setStatus("analyzing")}
                        />

                        {/* Carousel Area */}
                        <div className="relative flex items-center justify-center px-4 md:px-12 py-12 min-h-[80vh] w-full max-w-7xl mx-auto">
                            {/* Left Nav */}
                            <button onClick={prevVariant} className="hidden md:flex absolute left-0 z-40 p-4 rounded-full bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800 backdrop-blur-sm">
                                <ChevronLeft size={24} />
                            </button>

                            {/* Viewport */}
                            <div className="w-full h-full min-h-[800px] relative perspective-1000">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentVariant?.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full relative"
                                    >
                                        {/* Lock Overlay */}
                                        {isLocked && <PremiumLock onUnlock={() => setIsUpgradeOpen(true)} />}

                                        <div className={`w-full h-full transition-all duration-700 ${isLocked ? 'blur-xl opacity-50 scale-95 pointer-events-none' : ''}`}>
                                            <ReadmePreview markdown={currentVariant?.markdown || ""} theme={currentVariant?.theme || "Architect"} />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Right Nav */}
                            <button onClick={nextVariant} className="hidden md:flex absolute right-0 z-40 p-4 rounded-full bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800 backdrop-blur-sm">
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Variant Selector Footer (Sticky logic handled by ActionToolbar maybe, but we can add more here) */}
                        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                            <div className="bg-black/80 backdrop-blur-xl px-6 py-2 rounded-full border border-zinc-800/50 pointer-events-auto shadow-2xl">
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                                    Variant {currentIndex + 1}/{variants.length}: <span className="text-white font-bold">{currentVariant?.name}</span>
                                    {isLocked && <span className="ml-3 text-lime-400">🔒 PRO</span>}
                                </span>
                            </div>
                        </div>

                        {!isLocked && currentVariant && (
                            <ActionToolbar
                                markdown={currentVariant.markdown}
                                onRegenerate={() => setStatus("analyzing")}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />
        </div>
    );
}
