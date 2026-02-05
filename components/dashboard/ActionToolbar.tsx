"use client";

import { Copy, Download, RefreshCw, Check } from "lucide-react";
import { useState } from "react";

interface ActionToolbarProps {
    markdown: string;
    onRegenerate: () => void;
}

export function ActionToolbar({ markdown, onRegenerate }: ActionToolbarProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([markdown], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "README.md";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-full shadow-2xl z-50">
            <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-lime-400 text-black font-bold uppercase tracking-wide hover:bg-white transition-colors"
            >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied" : "Copy Markdown"}
            </button>

            <div className="w-[1px] h-8 bg-zinc-700 mx-2" />

            <button
                onClick={handleDownload}
                className="p-3 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Download .md"
            >
                <Download size={20} />
            </button>

            <button
                onClick={onRegenerate}
                className="p-3 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Regenerate Variants"
            >
                <RefreshCw size={20} />
            </button>
        </div>
    );
}
