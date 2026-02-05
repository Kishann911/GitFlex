"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { VisualTheme } from "@/lib/intelligence";

interface ReadmePreviewProps {
    markdown: string;
    theme: VisualTheme;
}

export function ReadmePreview({ markdown, theme }: ReadmePreviewProps) {
    // Theme-specific container styles to mimic varied rendering environments
    const containerStyles = {
        Architect: "font-mono text-sm leading-relaxed",
        Artist: "font-sans text-base leading-loose",
        Minimalist: "font-serif text-base tracking-wide"
    };

    return (
        <div className={`w-full h-full bg-white text-black p-8 md:p-12 overflow-y-auto rounded-xl shadow-2xl relative
      ${theme === 'Architect' ? 'border-t-4 border-blue-500' :
                theme === 'Artist' ? 'border-l-4 border-purple-500' :
                    'border border-zinc-200'
            }
    `}>
            {/* Fake Window Controls for vibe */}
            <div className="flex gap-2 mb-8 opacity-20">
                <div className="w-3 h-3 rounded-full bg-black/20" />
                <div className="w-3 h-3 rounded-full bg-black/20" />
                <div className="w-3 h-3 rounded-full bg-black/20" />
            </div>

            <div className={`prose prose-zinc max-w-none ${containerStyles[theme]}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdown}
                </ReactMarkdown>
            </div>
        </div>
    );
}
