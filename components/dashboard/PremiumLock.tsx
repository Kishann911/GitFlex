"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface PremiumLockProps {
    onUnlock: () => void;
}

export function PremiumLock({ onUnlock }: PremiumLockProps) {
    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-zinc-900/80 backdrop-blur-xl rounded-full border border-lime-400/30 text-lime-400 shadow-[0_0_30px_rgba(163,230,53,0.15)]">
                        <Lock size={32} />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 font-syne">Premium Identity</h3>
                <p className="text-zinc-400 mb-8 max-w-xs mx-auto">
                    This advanced layout features custom components and editorial stacking.
                </p>

                <button
                    onClick={onUnlock}
                    className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:scale-105 transition-transform"
                >
                    Unlock Everything
                </button>
            </motion.div>
        </div>
    );
}
