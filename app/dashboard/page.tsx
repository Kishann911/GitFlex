"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ReadmePreview } from "@/components/dashboard/ReadmePreview";
import { ActionToolbar } from "@/components/dashboard/ActionToolbar";
import { PremiumLock } from "@/components/dashboard/PremiumLock";
import { UpgradeModal } from "@/components/dashboard/UpgradeModal";
import { generateVariants, ReadmeVariant } from "@/lib/generator";
import { analyzeProfile, IntelligenceReport, GitFlexRole, VisualTheme } from "@/lib/intelligence";
import { analyzeRepository, RepoIntelligenceReport } from "@/lib/repoIntelligence";
import { generateRepoVariants } from "@/lib/repoGenerator";
import { MOCK_ARCHITECT_REPOS } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, LayoutPanelLeft } from "lucide-react";
import { CinematicAnalysis } from "@/components/dashboard/CinematicAnalysis";
import { IntelligenceHeader } from "@/components/dashboard/IntelligenceHeader";
import { RepoIntelligenceHeader } from "@/components/dashboard/RepoIntelligenceHeader";

type FlowStatus = "idle" | "analyzing" | "previewing";

function DashboardContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<FlowStatus>("idle");
    const [analysisMode, setAnalysisMode] = useState<"profile" | "repo">("profile");
    const [report, setReport] = useState<IntelligenceReport | RepoIntelligenceReport | null>(null);
    const [variants, setVariants] = useState<ReadmeVariant[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
    const [isFlatView, setIsFlatView] = useState(false);

    useEffect(() => {
        const mode = searchParams.get("mode") === "repo" ? "repo" : "profile";
        setAnalysisMode(mode);

        const savedKey = mode === "repo" ? "gitflex_repo_analysis" : "gitflex_analysis";
        const saved = localStorage.getItem(savedKey);
        const autoStart = searchParams.get("action") === "generate";

        if (saved) {
            try {
                const loadedReport = JSON.parse(saved);
                setReport(loadedReport);
                if (mode === "repo") {
                    setVariants(generateRepoVariants(loadedReport as RepoIntelligenceReport));
                } else {
                    setVariants(generateVariants(loadedReport as IntelligenceReport));
                }
                setStatus("previewing");
            } catch (e) {
                console.error("Failed to load saved analysis", e);
            }
        } else if (autoStart) {
            setStatus("analyzing");
        }
    }, [searchParams]);

    const startGeneration = () => {
        setStatus("analyzing");
    };

    const handleAnalysisComplete = () => {
        if (analysisMode === "repo") {
            const owner = searchParams.get("owner") || "unknown";
            const repoName = searchParams.get("repo") || "unknown";

            // Mock: Select a repo that matches loosely or default to first
            // In prod: await fetchGithubRepo(owner, repoName)
            const mockRepo = MOCK_ARCHITECT_REPOS.find(r => r.name === repoName) || MOCK_ARCHITECT_REPOS[0];

            // Overwrite mock data with URL params for realism if not found
            if (!MOCK_ARCHITECT_REPOS.find(r => r.name === repoName)) {
                mockRepo.name = repoName;
            }

            // Simulating a file scan
            const files = ["package.json", "src/index.ts", "README.md", "next.config.js"];

            const newReport = analyzeRepository(mockRepo, files, owner);
            setReport(newReport);
            localStorage.setItem("gitflex_repo_analysis", JSON.stringify(newReport));
            setVariants(generateRepoVariants(newReport));
        } else {
            // Profile Mode
            const newReport = analyzeProfile(MOCK_ARCHITECT_REPOS);
            setReport(newReport);
            localStorage.setItem("gitflex_analysis", JSON.stringify(newReport));
            setVariants(generateVariants(newReport));
        }
        setStatus("previewing");
    };

    const handleCancel = () => {
        setStatus("idle");
    };

    const handleOverrideRole = (role: GitFlexRole) => {
        if (!report || analysisMode === 'repo') return;
        const profileReport = report as IntelligenceReport;

        const updated: IntelligenceReport = {
            ...profileReport,
            primary: {
                ...profileReport.primary,
                role,
                explanation: `Refined to ${role} per user preference. Neural patterns adjusted to target ${role} archetypes.`
            },
            isUserRefined: true
        };
        setReport(updated);
        setVariants(generateVariants(updated));
    };

    const handleOverrideTheme = (theme: VisualTheme) => {
        if (!report || analysisMode === 'repo') return;
        const profileReport = report as IntelligenceReport;

        const updated: IntelligenceReport = {
            ...profileReport,
            primary: { ...profileReport.primary, theme }
        };
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
                                <h1 className="text-5xl font-syne font-bold mb-4">Neural Link Active</h1>
                                <p className="text-zinc-500 text-lg leading-relaxed">
                                    We&apos;ve scanned your GitHub metadata. Ready to synthesize your visual authority.
                                </p>
                            </div>
                            <button
                                onClick={startGeneration}
                                className="group relative px-12 py-5 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Synthesize Profile
                                    <Sparkles className="w-4 h-4" />
                                </span>
                                <div className="absolute inset-0 bg-lime-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                            <p className="text-zinc-700 text-sm font-mono uppercase tracking-widest pt-4 animate-pulse">
                                Status: Waiting for Instruction
                            </p>
                        </motion.div>
                    </motion.div>
                )}

                {status === "analyzing" && (
                    <motion.div
                        key="analyzing"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative"
                    >
                        <CinematicAnalysis
                            type={analysisMode}
                            onComplete={handleAnalysisComplete}
                            onCancel={handleCancel}
                        />
                    </motion.div>
                )}

                {status === "previewing" && report && (
                    <motion.div
                        key="previewing"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 flex flex-col pt-24 pb-32"
                    >
                        {/* Header */}
                        <header className="fixed top-0 left-0 right-0 z-[60] p-6 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-zinc-900">
                            <h1 className="font-syne text-xl font-bold tracking-tight">
                                GITFLEX <span className="text-zinc-600 ml-2 text-sm font-mono tracking-tighter uppercase inline-block border-l border-zinc-800 pl-3">Neural Dashboard</span>
                            </h1>
                            <div className="flex gap-4 items-center">
                                <div className="hidden sm:flex items-center px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md">
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest whitespace-nowrap">
                                        {currentIndex + 1} / {variants.length} — <span className="text-white">{currentVariant?.name}</span>
                                    </span>
                                </div>
                                {isLocked && (
                                    <button onClick={() => setIsUpgradeOpen(true)} className="px-4 py-1.5 rounded-full bg-lime-400 text-black text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:scale-105 transition-transform">
                                        Unlock Pro
                                    </button>
                                )}
                                <div className="hidden xs:flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Live</span>
                                </div>
                            </div>
                        </header>

                        {/* Analysis Header Section */}
                        {analysisMode === "repo" ? (
                            <RepoIntelligenceHeader
                                report={report as RepoIntelligenceReport}
                                onReRun={() => setStatus("analyzing")}
                            />
                        ) : (
                            <IntelligenceHeader
                                report={report as IntelligenceReport}
                                onAdjust={handleOverrideRole}
                                onThemeChange={handleOverrideTheme}
                                onReRun={() => setStatus("analyzing")}
                            />
                        )}

                        {/* Carousel Area */}
                        <div className="relative flex flex-col items-center justify-center px-4 md:px-12 py-12 lg:min-h-[90vh] w-full max-w-7xl mx-auto overflow-visible">
                            {/* Controls Bar */}
                            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-6 px-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] mb-1">Synthesized Artifact</span>
                                    <h2 className="text-xl font-syne font-bold uppercase">{currentVariant?.name}</h2>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setIsFlatView(!isFlatView)}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all text-[10px] font-bold uppercase tracking-widest ${isFlatView ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:text-white'}`}
                                    >
                                        <LayoutPanelLeft size={14} />
                                        {isFlatView ? "Cinematic Mode Off" : "Enable Flat View"}
                                    </button>
                                </div>
                            </div>

                            <div className="w-full relative flex items-center justify-center">
                                {/* Left Nav */}
                                <button onClick={prevVariant} className="hidden lg:flex absolute left-[-80px] z-40 p-4 rounded-full bg-zinc-900/50 hover:bg-white hover:text-black text-zinc-400 transition-all border border-zinc-800 backdrop-blur-sm">
                                    <ChevronLeft size={24} />
                                </button>

                                {/* Viewport */}
                                <div className={`w-full h-full min-h-[600px] md:min-h-[800px] relative transition-all duration-1000 ${isFlatView ? '' : 'perspective-2000'}`}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={`${currentVariant?.id}-${currentIndex}`}
                                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 1.02, y: -20 }}
                                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                            className="w-full h-full relative"
                                        >
                                            {/* Lock Overlay */}
                                            {isLocked && <PremiumLock onUnlock={() => setIsUpgradeOpen(true)} />}

                                            <div className={`w-full h-full transition-all duration-1000 ${isFlatView ? 'rotate-x-0 rotate-y-0' : 'rotate-x-1 rotate-y-[-1deg] md:rotate-x-2 md:rotate-y-[-2deg]'} ${isLocked ? 'blur-2xl opacity-40 scale-95 pointer-events-none' : ''}`}>
                                                <ReadmePreview markdown={currentVariant?.markdown || ""} theme={currentVariant?.theme || "Architect"} />
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Right Nav */}
                                <button onClick={nextVariant} className="hidden lg:flex absolute right-[-80px] z-40 p-4 rounded-full bg-zinc-900/50 hover:bg-white hover:text-black text-zinc-400 transition-all border border-zinc-800 backdrop-blur-sm">
                                    <ChevronRight size={24} />
                                </button>
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

export default function DashboardPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" /></div>}>
            <DashboardContent />
        </Suspense>
    );
}
