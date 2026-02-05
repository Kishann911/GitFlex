"use client";

import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { X, ShieldCheck, FileCode, Lock } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";

interface TrustModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TrustModal({ isOpen, onClose }: TrustModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleConnect = async () => {
        setIsLoading(true);
        await signIn("github", { callbackUrl: "/generating" });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-8"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2 font-syne">
                                Establish Connection
                            </h3>
                            <p className="text-zinc-400">
                                You are authorizing GitFlex to analyze your public code footprint.
                            </p>
                        </div>

                        {/* Transparency Grid */}
                        <div className="grid gap-4 mb-8">
                            <div className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                                <div className="p-2 bg-blue-500/10 rounded-full text-blue-400">
                                    <FileCode size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">Public Analysis Only</h4>
                                    <p className="text-xs text-zinc-500">
                                        We only scan repositories you have made public. Your private work stays private.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                                <div className="p-2 bg-green-500/10 rounded-full text-green-400">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">Read-Only Access</h4>
                                    <p className="text-xs text-zinc-500">
                                        We cannot edit your code, create commits, or manage your issues.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                                <div className="p-2 bg-zinc-500/10 rounded-full text-zinc-400">
                                    <Lock size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">Zero Data Retention</h4>
                                    <p className="text-xs text-zinc-500">
                                        We do not store your code. We analyze it on the fly to generate your profile.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={onClose}
                                className="flex-1 py-4 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all font-mono text-sm uppercase"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConnect}
                                disabled={isLoading}
                                className="flex-1 py-4 rounded-lg bg-lime-400 text-black font-bold font-mono text-sm uppercase hover:bg-white transition-colors relative overflow-hidden"
                            >
                                {isLoading ? (
                                    <span className="animate-pulse">Opening Secure Link...</span>
                                ) : (
                                    "Authorize Securely"
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
