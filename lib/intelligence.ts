import { GithubRepo } from "./mockData";

export type VisualTheme = "Architect" | "Artist" | "Minimalist";
export type GitFlexRole =
    | "Frontend Engineer"
    | "Backend Architect"
    | "Indie Hacker"
    | "Creative Technologist"
    | "ML Engineer"
    | "Full Stack Dev"
    | "Systems Designer"
    | "UI Scientist"
    | "Knowledge Architect"
    | "Explorer";

export type SignalStrength = "Strong" | "Moderate" | "Emerging";

export interface AnalysisSignal {
    type: "Tech Stack" | "Persona" | "Experience" | "Pattern" | "Credibility";
    title: string;
    description: string;
    strength?: SignalStrength;
    score?: number; // 0-100
    icon?: string;
}

export interface PersonaSignal {
    role: GitFlexRole;
    confidence: number; // 0-100
    explanation: string;
    theme: VisualTheme;
    evidence?: string[]; // Names of repos that triggered this
}

export interface FeaturedProject {
    name: string;
    description: string;
    stars: number;
    url: string;
    language: string;
}

export interface IntelligenceReport {
    primary: PersonaSignal;
    secondary: PersonaSignal | null;
    emerging: AnalysisSignal | null;
    signals: AnalysisSignal[];
    stackStrength: Record<string, number>;
    explanation: string;
    visualTheme: VisualTheme;
    role: GitFlexRole;
    featuredProjects: FeaturedProject[];
    isUserRefined?: boolean;
}

const ROLE_METRICS: Record<Exclude<GitFlexRole, "Explorer">, { keywords: string[]; langs: string[]; theme: VisualTheme; weight: number }> = {
    "Backend Architect": {
        keywords: ["distributed", "microservices", "grpc", "kafka", "scalability", "infrastructure", "concurrency", "low-latency", "database", "sql", "redis"],
        langs: ["Rust", "Go", "C++", "Java", "Erlang", "Elixir", "Python"],
        theme: "Architect",
        weight: 1.2
    },
    "Frontend Engineer": {
        keywords: ["ui", "ux", "accessibility", "responsive", "frontend", "component", "styling", "design-system", "tailwind", "react", "vue"],
        langs: ["TypeScript", "JavaScript", "HTML", "CSS"],
        theme: "Artist",
        weight: 1.0
    },
    "Creative Technologist": {
        keywords: ["generative", "threejs", "webgl", "canvas", "glsl", "shaders", "interaction", "animation", "motion", "creative-coding"],
        langs: ["GLSL", "ShaderLab", "Processing", "TypeScript", "C++"],
        theme: "Artist",
        weight: 1.5
    },
    "ML Engineer": {
        keywords: ["ai", "jupyter", "tensorflow", "pytorch", "transformers", "training", "inference", "neural", "data-science", "model"],
        langs: ["Python", "Jupyter Notebook", "R", "C++"],
        theme: "Architect",
        weight: 1.3
    },
    "Indie Hacker": {
        keywords: ["product", "mvp", "shipping", "saas", "profitable", "solo", "marketing", "bootstrap", "monetization"],
        langs: ["Ruby", "PHP", "Dart", "Swift", "TypeScript", "JavaScript"],
        theme: "Minimalist",
        weight: 1.4
    },
    "Full Stack Dev": {
        keywords: ["fullstack", "web", "app", "platform", "api", "database", "crud", "express", "prisma"],
        langs: ["TypeScript", "JavaScript", "Python", "Go"],
        theme: "Architect",
        weight: 0.9
    },
    "Systems Designer": {
        keywords: ["low-level", "kernel", "os", "compiler", "runtime", "drivers", "embedded", "memory-management", "assembly"],
        langs: ["C", "C++", "Rust", "Assembly"],
        theme: "Architect",
        weight: 1.6
    },
    "UI Scientist": {
        keywords: ["experimental", "lab", "prototyping", "gesture", "interface", "hci", "design", "interaction-design"],
        langs: ["TypeScript", "Swift", "Kotlin"],
        theme: "Artist",
        weight: 1.8
    },
    "Knowledge Architect": {
        keywords: ["documentation", "wiki", "obsidian", "knowledge-base", "specs", "guide", "handbook", "tutorial", "writing"],
        langs: ["Markdown", "TeX", "CSS", "HTML"],
        theme: "Minimalist",
        weight: 1.2
    }
};

export function analyzeProfile(repos: GithubRepo[], username: string = "user"): IntelligenceReport {
    // 0. Edge Case: Empty Profile
    if (!repos || repos.length === 0) {
        return {
            primary: {
                role: "Explorer",
                confidence: 100,
                explanation: "Connection established. Your GitHub journey is in its early 'discovery' phase.",
                theme: "Minimalist",
                evidence: []
            },
            secondary: null,
            emerging: null,
            signals: [{ type: "Persona", title: "New Builder", description: "Minimal repository count detected. Focus on potential.", strength: "Emerging" }],
            stackStrength: {},
            explanation: "Minimal data footprint. Initializing Explorer persona.",
            visualTheme: "Minimalist",
            role: "Explorer",
            featuredProjects: []
        };
    }

    const scores: Record<GitFlexRole, number> = {
        "Explorer": 0,
        "Backend Architect": 0,
        "Frontend Engineer": 0,
        "Creative Technologist": 0,
        "ML Engineer": 0,
        "Indie Hacker": 0,
        "Full Stack Dev": 0,
        "Systems Designer": 0,
        "UI Scientist": 0,
        "Knowledge Architect": 0
    };

    const evidenceMap: Record<GitFlexRole, Set<string>> = {} as any;
    Object.keys(scores).forEach(role => evidenceMap[role as GitFlexRole] = new Set());

    const langStats: Record<string, { count: number; stars: number; commits: number }> = {};
    const frameworkStats: Record<string, number> = {};

    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(now.getFullYear() - 2);

    // 1. Analyze Repositories
    repos.forEach(repo => {
        const updatedAt = new Date(repo.updated_at);
        const isRecent = updatedAt > sixMonthsAgo;
        const isStale = updatedAt < twoYearsAgo;

        let multiplier = 1.0;
        if (isRecent) multiplier *= 2.0;
        if (isStale) multiplier *= 0.5;
        if (repo.is_fork) multiplier *= 0.3;

        if (repo.commit_frequency) {
            multiplier *= (1 + (repo.commit_frequency / 20));
        }

        const starRatio = repo.forks_count > 0 ? repo.stargazers_count / repo.forks_count : repo.stargazers_count;
        const credibilityBonus = Math.min(starRatio / 10, 5);

        // Language Stats
        if (repo.language) {
            if (!langStats[repo.language]) langStats[repo.language] = { count: 0, stars: 0, commits: 0 };
            langStats[repo.language].count++;
            langStats[repo.language].stars += repo.stargazers_count;
            langStats[repo.language].commits += (repo.commit_frequency || 0) * 12;

            Object.entries(ROLE_METRICS).forEach(([role, config]) => {
                if (config.langs.includes(repo.language)) {
                    scores[role as GitFlexRole] += (15 * multiplier * config.weight) + credibilityBonus;
                    if (multiplier > 1.2) evidenceMap[role as GitFlexRole].add(repo.name);
                }
            });
        }

        // Framework & Topic Detection
        const textBlob = `${repo.name} ${repo.description} ${repo.topics.join(" ")}`.toLowerCase();

        if (textBlob.includes("react")) frameworkStats["React"] = (frameworkStats["React"] || 0) + 1;
        if (textBlob.includes("next.js") || textBlob.includes("nextjs")) frameworkStats["Next.js"] = (frameworkStats["Next.js"] || 0) + 1;
        if (textBlob.includes("tailwind")) frameworkStats["Tailwind CSS"] = (frameworkStats["Tailwind CSS"] || 0) + 1;
        if (textBlob.includes("docker") || textBlob.includes("kubernetes")) frameworkStats["Cloud Native"] = (frameworkStats["Cloud Native"] || 0) + 1;

        Object.entries(ROLE_METRICS).forEach(([role, config]) => {
            config.keywords.forEach(kw => {
                if (textBlob.includes(kw.toLowerCase())) {
                    scores[role as GitFlexRole] += (10 * multiplier * config.weight) + credibilityBonus;
                    if (multiplier > 1.0) evidenceMap[role as GitFlexRole].add(repo.name);
                }
            });
        });
    });

    // 2. Persona Logic Enhancement
    const sortedRoles = (Object.entries(scores) as [GitFlexRole, number][])
        .filter(([r]) => r !== "Explorer")
        .sort(([, a], [, b]) => b - a);

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) || 1;

    const primaryRole = sortedRoles[0][0];
    const primaryConfidence = Math.min(Math.round((sortedRoles[0][1] / totalScore) * 100 * 1.5), 99);

    const secondaryRole = sortedRoles[1][1] > (sortedRoles[0][1] * 0.35) ? sortedRoles[1][0] : null;
    const secondaryConfidence = secondaryRole ? Math.min(Math.round((sortedRoles[1][1] / totalScore) * 100 * 1.5), 80) : 0;

    // 3. Evidence-Based Explanation
    const primaryMetrics = ROLE_METRICS[primaryRole as keyof typeof ROLE_METRICS];
    const themeStr = primaryMetrics ? primaryMetrics.theme.toLowerCase() : "minimalist";

    const evidenceList = Array.from(evidenceMap[primaryRole]).slice(0, 2);
    const evidenceStr = evidenceList.length > 0
        ? ` Significant signals detected in ${evidenceList.join(' and ')}.`
        : "";

    const whyExplanation = `Confirmed ${primaryRole} identity via ${repos.length} data points. Found dominant concentration in ${themeStr} methodologies.${evidenceStr}`;

    // 4. Stack Strength
    const stackStrength: Record<string, number> = {};
    Object.entries(langStats).forEach(([lang, data]) => {
        stackStrength[lang] = Math.min(Math.round((data.count / repos.length) * 100 + (data.stars / 100)), 100);
    });
    Object.entries(frameworkStats).forEach(([fw, count]) => {
        stackStrength[fw] = Math.min(Math.round((count / repos.length) * 150), 100);
    });

    // 5. Featured Projects
    const featuredProjects = repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 3)
        .map(r => ({
            name: r.name,
            description: r.description,
            stars: r.stargazers_count,
            url: `https://github.com/${username}/${r.name}`,
            language: r.language
        }));

    return {
        primary: {
            role: primaryRole,
            confidence: primaryConfidence,
            explanation: whyExplanation,
            theme: primaryMetrics ? primaryMetrics.theme : "Minimalist",
            evidence: evidenceList
        },
        secondary: secondaryRole ? {
            role: secondaryRole,
            confidence: secondaryConfidence,
            explanation: `Supporting evidence for ${secondaryRole} patterns detected.`,
            theme: ROLE_METRICS[secondaryRole as keyof typeof ROLE_METRICS]?.theme || "Minimalist",
            evidence: Array.from(evidenceMap[secondaryRole]).slice(0, 2)
        } : null,
        emerging: sortedRoles[2] && sortedRoles[2][1] > (totalScore * 0.1) ? {
            type: "Persona",
            title: `Emerging: ${sortedRoles[2][0]}`,
            description: `Growing footprint detected in ${sortedRoles[2][0]} specialized domains.`,
            strength: "Emerging",
            score: Math.round((sortedRoles[2][1] / totalScore) * 100)
        } : null,
        signals: [
            {
                type: "Persona",
                title: primaryRole,
                description: whyExplanation,
                strength: "Strong",
                score: primaryConfidence
            },
            {
                type: "Credibility",
                title: "Contribution Density",
                description: `High-frequency activity detected across ${repos.filter(r => (r.commit_frequency || 0) > 10).length} active projects.`,
                strength: "Strong"
            }
        ],
        stackStrength,
        explanation: whyExplanation,
        visualTheme: primaryMetrics ? primaryMetrics.theme : "Minimalist",
        role: primaryRole,
        featuredProjects
    };
}
