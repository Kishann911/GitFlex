"use client";

import { useState } from "react";
import { CinematicAnalysis } from "@/components/dashboard/CinematicAnalysis";
import { analyzeProfile } from "@/lib/intelligence";
import { MOCK_ARCHITECT_REPOS } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function GeneratingPage() {
    const router = useRouter();
    const [isComplete, setIsComplete] = useState(false);

    const handleComplete = () => {
        const report = analyzeProfile(MOCK_ARCHITECT_REPOS);
        localStorage.setItem("gitflex_analysis", JSON.stringify(report));
        setIsComplete(true);
        setTimeout(() => {
            router.push("/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 overflow-hidden">
            <AnimatePresence mode="wait">
                {!isComplete ? (
                    <motion.div
                        key="pipeline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full flex justify-center"
                    >
                        <CinematicAnalysis
                            onComplete={handleComplete}
                            onCancel={() => router.push("/")}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="redirect"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <div className="w-16 h-16 bg-lime-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_0_50px_rgba(163,230,53,0.5)]">
                            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
                        </div>
                        <h1 className="text-2xl font-syne font-bold uppercase tracking-widest">
                            Synthesis Complete
                        </h1>
                        <p className="text-zinc-500 font-mono text-xs mt-2">
                            Redirecting to your visual command center...
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
