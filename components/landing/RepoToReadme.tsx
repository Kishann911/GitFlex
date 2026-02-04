"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TextReveal } from "@/components/ui/TextReveal";

const files = [
    { name: "src", type: "folder", y: -40, x: -60 },
    { name: "components", type: "folder", y: -10, x: -40 },
    { name: "utils.ts", type: "file", y: 20, x: -50 },
    { name: "api.ts", type: "file", y: 50, x: -30 },
    { name: "package.json", type: "file", y: 80, x: -70 },
    { name: "tsconfig.json", type: "file", y: 110, x: -40 },
];

export function RepoToReadme() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "center start"],
    });

    // Animation timeline driven by scroll
    const treeOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const treeScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);

    const readmeOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
    const readmeScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
    const readmeY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);

    // Spring physics for smooth "morphing" feel
    const springConfig = { stiffness: 100, damping: 20 };
    const smoothReadmeY = useSpring(readmeY, springConfig);

    // Simulated Typing Effect
    const [typedText, setTypedText] = useState("");
    const fullText = "github.com/your-username/chaos-repo";
    const [showInput, setShowInput] = useState(true);

    // Trigger typing based on scroll (simplified for auto-loop or just one-off effect)
    // For this demo, we'll auto-type when component mounts to imply "ease"
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(fullText.slice(0, i + 1));
            i++;
            if (i > fullText.length + 10) { // Wait a bit
                setShowInput(false); // Hide input to transition to tree
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);


    return (
        <section ref={containerRef} className="h-[200vh] bg-black relative">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

                {/* Narrative Title */}
                <div className="absolute top-24 z-20 text-center">
                    <TextReveal className="text-zinc-500 uppercase tracking-widest text-sm mb-4">The Transformation</TextReveal>
                    <h2 className="text-4xl md:text-6xl font-bold text-white">
                        <TextReveal delay={0.1}>CHAOS TO</TextReveal> <br />
                        <span className="text-lime-400"><TextReveal delay={0.2}>CLARITY.</TextReveal></span>
                    </h2>
                </div>

                {/* Fake Input Field (Simulating User Action) */}
                <AnimatePresence>
                    {showInput && (
                        <motion.div
                            initial={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
                            className="absolute z-30 bg-zinc-900 border border-zinc-700 rounded-lg px-6 py-4 flex items-center gap-3 shadow-2xl"
                        >
                            <div className="text-zinc-500">repo:</div>
                            <span className="font-mono text-lime-400">{typedText}<span className="animate-pulse">_</span></span>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* State A: Raw Code Tree */}
                <motion.div
                    style={{ opacity: treeOpacity, scale: treeScale }}
                    className="absolute md:w-[600px] w-full flex flex-col items-center justify-center pt-24" // Offset for input
                >
                    <div className="relative w-64 h-80">
                        {files.map((file, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: file.x, y: file.y }}
                                animate={{
                                    y: [file.y, file.y + 10, file.y],
                                    rotate: [0, 2, -2, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4 + i,
                                    ease: "easeInOut"
                                }}
                                className={`absolute left-1/2 top-1/2 flex items-center gap-2 px-4 py-2 rounded-md border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-zinc-400 text-sm`}
                            >
                                <div className={`w-3 h-3 rounded-full ${file.type === 'folder' ? 'bg-blue-500/50' : 'bg-zinc-600/50'}`} />
                                {file.name}
                            </motion.div>
                        ))}
                        {/* Connecting lines simulation */}
                        <div className="absolute inset-0 border-l border-zinc-800/50 left-[40%] h-full -z-10" />
                    </div>
                </motion.div>

                {/* Transition Effect: detailed scan line */}
                <motion.div
                    style={{ opacity: treeScale }}
                    className="absolute w-full h-[2px] bg-lime-400/50 blur-[2px] top-1/2"
                />

                {/* State B: Polished README */}
                <motion.div
                    style={{ opacity: readmeOpacity, scale: readmeScale, y: smoothReadmeY }}
                    className="relative z-10 w-[90vw] md:w-[800px] bg-zinc-900 border border-zinc-700/50 rounded-xl overflow-hidden shadow-2xl"
                >
                    {/* Fake Window Controls */}
                    <div className="h-8 bg-zinc-800 flex items-center px-4 gap-2 border-b border-zinc-700">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                    </div>

                    {/* README Content */}
                    <div className="p-8 md:p-12 relative overflow-hidden">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/10 blur-[100px] rounded-full" />

                        <div className="flex flex-col gap-6 relative z-10">
                            <div className="flex gap-2 mb-4">
                                {['build passing', 'coverage 100%', 'license MIT'].map((badge, i) => (
                                    <div key={i} className="px-2 py-1 bg-zinc-800 rounded text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                                        {badge}
                                    </div>
                                ))}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-white font-syne">GitFlex UI</h1>
                            <p className="text-zinc-400 max-w-lg leading-relaxed">
                                A high-performance, identity-driven component library for developers who care about visual authority. Built with motion primitives and accessible patterns.
                            </p>

                            <div className="w-full h-[1px] bg-zinc-800 my-4" />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                                    <h4 className="text-lime-400 font-bold mb-2 text-sm uppercase">Installation</h4>
                                    <code className="text-xs text-zinc-300 font-mono">npm install @gitflex/core</code>
                                </div>
                                <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                                    <h4 className="text-lime-400 font-bold mb-2 text-sm uppercase">Usage</h4>
                                    <code className="text-xs text-zinc-300 font-mono">import {"{ Flex }"} from 'gitflex'</code>
                                </div>
                            </div>
                        </div>

                        {/* Conversion Button inside the preview */}
                        <div className="absolute bottom-8 right-8">
                            <button className="bg-lime-400 text-black px-6 py-3 rounded font-bold font-mono text-sm uppercase tracking-wide hover:bg-white transition-colors">
                                Try with your repo →
                            </button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
