export function Footer() {
    return (
        <footer className="w-full bg-zinc-950 text-white pt-48 pb-12 px-4 border-t border-zinc-900 overflow-hidden relative">
            <div className="max-w-[98%] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24">
                    <div className="flex flex-col gap-2">
                        <span className="text-lime-400 font-mono text-xs uppercase tracking-widest">Index</span>
                        <a href="#" className="text-lg hover:text-white text-zinc-500 transition-colors">Manifesto</a>
                        <a href="#" className="text-lg hover:text-white text-zinc-500 transition-colors">Pricing</a>
                        <a href="#" className="text-lg hover:text-white text-zinc-500 transition-colors">Docs</a>
                    </div>

                    <div className="flex flex-col gap-2 text-right">
                        <span className="text-lime-400 font-mono text-xs uppercase tracking-widest">Connect</span>
                        <a href="#" className="text-lg hover:text-white text-zinc-500 transition-colors">Twitter</a>
                        <a href="#" className="text-lg hover:text-white text-zinc-500 transition-colors">GitHub</a>
                        <a href="mailto:hello@gitflex.dev" className="text-lg hover:text-white text-zinc-500 transition-colors">Contact</a>
                    </div>
                </div>

                {/* Massive Brand Name */}
                <h1 className="text-[22vw] leading-[0.7] font-bold tracking-tighter text-white select-none whitespace-nowrap -ml-[2vw]">
                    GITFLEX
                </h1>

                <div className="flex justify-between items-center mt-8 border-t border-zinc-900 pt-8">
                    <p className="text-zinc-600 text-xs font-mono">© 2026 GITFLEX INC.</p>
                    <p className="text-zinc-600 text-xs font-mono">ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
}
