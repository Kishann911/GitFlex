import { GithubRepo } from "./mockData";

export type RepoArchetype =
    | "Library"
    | "Full Stack Application"
    | "Frontend Application"
    | "Backend Service"
    | "CLI Tool"
    | "Monorepo"
    | "Configuration / Dotfiles"
    | "Documentation"
    | "Hackathon Prototype"
    | "Experimental";

export type ProjectStability = "Stable" | "Beta" | "Alpha" | "Experimental" | "Deprecated";

export interface RepoSignal {
    type: "Framework" | "Pattern" | "Infrastructure" | "Tooling" | "Community";
    name: string;
    description: string;
    evidence: string; // "Found next.config.js"
    strength: "High" | "Medium" | "Low";
}

export interface InstallCommand {
    manager: "npm" | "yarn" | "pnpm" | "bun" | "make" | "cargo" | "go" | "pip";
    command: string;
    confidence: number;
}

export interface RepoIntelligenceReport {
    target: {
        owner: string;
        name: string;
        description: string;
        url: string;
    };
    archetype: RepoArchetype;
    confidence: number;
    explanation: string;
    stability: ProjectStability;
    techStack: Record<string, string>; // "React" -> "18.2.0"
    signals: RepoSignal[];
    install?: InstallCommand;
    visualTheme: "Technical" | "Showcase" | "Minimal";
}

// Heuristics for project detection
const FILE_SIGNATURES: Record<string, RepoArchetype[]> = {
    "next.config.js": ["Full Stack Application", "Frontend Application"],
    "next.config.ts": ["Full Stack Application", "Frontend Application"],
    "vite.config.ts": ["Frontend Application"],
    "vite.config.js": ["Frontend Application"],
    "cargo.toml": ["CLI Tool", "Backend Service", "Library"],
    "lerna.json": ["Monorepo"],
    "pnpm-workspace.yaml": ["Monorepo"],
    "docker-compose.yml": ["Backend Service", "Full Stack Application"],
    "Dockerfile": ["Backend Service", "Full Stack Application"],
    "setup.py": ["Library", "CLI Tool", "Backend Service"],
    "go.mod": ["Backend Service", "CLI Tool", "Library"],
    ".bashrc": ["Configuration / Dotfiles"],
    ".zshrc": ["Configuration / Dotfiles"],
    "mkdocs.yml": ["Documentation"]
};

export function analyzeRepository(repo: GithubRepo, fileList: string[] = [], username: string = "user"): RepoIntelligenceReport {
    // 1. Archetype Detection via File Signatures
    const detectedArchetypes: Partial<Record<RepoArchetype, number>> = {};
    const evidence: string[] = [];

    // Default if no signals found
    let primaryArchetype: RepoArchetype = "Experimental";
    let maxScore = 0;

    // A. File-based detection
    fileList.forEach(file => {
        const matches = FILE_SIGNATURES[file];
        if (matches) {
            matches.forEach(arch => {
                detectedArchetypes[arch] = (detectedArchetypes[arch] || 0) + 10;
                evidence.push(`Detected ${file}`);
            });
        }
    });

    // B. Keyword-based detection (fallback)
    // B. Keyword-based detection (fallback)
    const textBlob = `${repo.name} ${repo.description} ${(repo.topics || []).join(' ')}`.toLowerCase();

    if (textBlob.includes("cli") || textBlob.includes("command line")) {
        detectedArchetypes["CLI Tool"] = (detectedArchetypes["CLI Tool"] || 0) + 5;
    }
    if (textBlob.includes("library") || textBlob.includes("sdk")) {
        detectedArchetypes["Library"] = (detectedArchetypes["Library"] || 0) + 5;
    }
    if (textBlob.includes("docs") || textBlob.includes("documentation")) {
        detectedArchetypes["Documentation"] = (detectedArchetypes["Documentation"] || 0) + 5;
    }

    // Determine Winner
    for (const [arch, score] of Object.entries(detectedArchetypes)) {
        if (score > maxScore) {
            maxScore = score;
            primaryArchetype = arch as RepoArchetype;
        }
    }

    // 2. Install Command Inference
    let installCmd: InstallCommand | undefined;
    if (fileList.includes("yarn.lock")) {
        installCmd = { manager: "yarn", command: "yarn install", confidence: 100 };
    } else if (fileList.includes("pnpm-lock.yaml")) {
        installCmd = { manager: "pnpm", command: "pnpm install", confidence: 100 };
    } else if (fileList.includes("bun.lockb")) {
        installCmd = { manager: "bun", command: "bun install", confidence: 100 };
    } else if (fileList.includes("package-lock.json")) {
        installCmd = { manager: "npm", command: "npm install", confidence: 90 };
    } else if (fileList.includes("go.mod")) {
        installCmd = { manager: "go", command: "go mod download", confidence: 95 };
    } else if (fileList.includes("Cargo.toml")) {
        installCmd = { manager: "cargo", command: "cargo build", confidence: 95 };
    } else if (fileList.includes("requirements.txt")) {
        installCmd = { manager: "pip", command: "pip install -r requirements.txt", confidence: 90 };
    }

    // 3. Stability Inference
    const yearsSinceUpdate = (new Date().getTime() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24 * 365);
    const stability: ProjectStability =
        yearsSinceUpdate > 2 ? "Deprecated" :
            repo.stargazers_count > 1000 ? "Stable" :
                repo.stargazers_count > 100 ? "Beta" :
                    "Experimental";

    return {
        target: {
            owner: username,
            name: repo.name,
            description: repo.description,
            url: `https://github.com/${username}/${repo.name}`
        },
        archetype: primaryArchetype,
        confidence: Math.min(Math.max(maxScore * 10, 40), 99), // Normalize
        explanation: `Identified as ${primaryArchetype} based on structural signatures: ${evidence.length > 0 ? evidence.slice(0, 3).join(", ") : "Naming conventions"}.`,
        stability,
        techStack: {
            "Language": repo.language,
            // In a real implementation, we'd parse package.json here
        },
        signals: evidence.map(e => ({
            type: "Infrastructure",
            name: "Structural Evidence",
            description: e,
            evidence: e,
            strength: "High"
        })),
        install: installCmd,
        visualTheme: primaryArchetype === "Library" ? "Technical" : primaryArchetype === "CLI Tool" ? "Minimal" : "Showcase"
    };
}
