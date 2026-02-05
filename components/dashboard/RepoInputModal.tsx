"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Loader2, ArrowRight, AlertCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface RepoInputModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RepoInputModal({ isOpen, onClose }: RepoInputModalProps) {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<"idle" | "validating" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("validating");
        setErrorMsg("");

        // Basic validation logic
        const githubRegex = /github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)/;
        const match = url.match(githubRegex);

        if (!match) {
            setStatus("error");
            setErrorMsg("Invalid GitHub URL. Must be like github.com/owner/repo");
            return;
        }

        const [, owner, repo] = match;

        // Simulate API check (in prod we would ping the API to verify existence)
        setTimeout(() => {
            router.push(`/dashboard?action=generate&mode=repo&owner=${owner}&repo=${repo}`);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-[110] pointer-events-none"
                    >
                        <div className="w-full max-w-lg bg-zinc-950 border border-zinc-900 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                                        <Github className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-syne font-bold text-white">Import Repository</h2>
                                        <p className="text-sm text-zinc-500">Transform any GitHub repo into a documentation masterpiece.</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            placeholder="https://github.com/owner/repository"
                                            className={`w-full bg-zinc-900/50 border ${status === "error" ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-white"} rounded-xl p-4 text-white placeholder-zinc-600 outline-none transition-all font-mono text-sm`}
                                            disabled={status === "validating"}
                                        />
                                        {status === "validating" && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
                                            </div>
                                        )}
                                    </div>

                                    {status === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 text-red-400 text-xs px-1"
                                        >
                                            <AlertCircle size={14} />
                                            {errorMsg}
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "validating" || !url}
                                        className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {status === "validating" ? "Verifying..." : "Analyze & Generate"}
                                        {!status.startsWith("valid") && <ArrowRight size={18} />}
                                    </button>
                                </form>
                            </div>

                            <div className="bg-zinc-900/50 border-t border-zinc-900 p-4 flex justify-between items-center text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                                <span>Support: Public Repos Only</span>
                                <span>GitFlex Engine v2.1</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
