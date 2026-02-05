"use client";

import { Copy, Download, RefreshCw, Check, FileDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ActionToolbarProps {
    markdown: string;
    onRegenerate: () => void;
}

export function ActionToolbar({ markdown, onRegenerate }: ActionToolbarProps) {
    const [copied, setCopied] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        setDownloaded(true);
        const blob = new Blob([markdown], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "README.md";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => setDownloaded(false), 3000);
    };

    return (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/50 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[70]">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopy}
                className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all duration-300 ${copied ? "bg-white text-black" : "bg-lime-400 text-black shadow-[0_0_20px_rgba(163,230,53,0.3)]"
                    }`}
            >
                <AnimatePresence mode="wait">
                    {copied ? (
                        <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check size={14} className="stroke-[3px]" />
                        </motion.span>
                    ) : (
                        <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Copy size={14} className="stroke-[3px]" />
                        </motion.span>
                    )}
                </AnimatePresence>
                {copied ? "Clipboard Ready" : "Copy Source"}
            </motion.button>

            <div className="w-[1px] h-6 bg-zinc-800 mx-2" />

            <button
                onClick={handleDownload}
                className={`p-4 rounded-full transition-all duration-300 relative group ${downloaded ? "text-lime-400" : "text-zinc-500 hover:text-white"
                    }`}
                title="Download .md"
            >
                {downloaded ? (
                    <FileDown size={20} className="animate-bounce" />
                ) : (
                    <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                )}
                {downloaded && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-lime-400 text-black text-[10px] font-bold rounded uppercase tracking-tighter whitespace-nowrap">
                        Saved to Disk
                    </span>
                )}
            </button>

            <button
                onClick={onRegenerate}
                className="p-4 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-800/50 transition-all group"
                title="Regenerate Analysis"
            >
                <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
            </button>
        </div>
    );
}
