import { GithubRepo } from "./mockData";

export type VisualTheme = "Architect" | "Artist" | "Minimalist";
export type GitFlexRole = "Frontend Engineer" | "Backend Architect" | "Indie Hacker" | "Creative Technologist" | "ML Engineer" | "Full Stack Dev" | "Systems Designer" | "UI Scientist";

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
    stackStrength: Record<string, number>; // Language/Framework -> 0-100
    explanation: string;
    visualTheme: VisualTheme;
    role: GitFlexRole; // for backwards compatibility
    featuredProjects: FeaturedProject[];
}

const ROLE_METRICS: Record<GitFlexRole, { keywords: string[]; langs: string[]; theme: VisualTheme; weight: number }> = {
    "Backend Architect": {
        keywords: ["distributed", "microservices", "grpc", "kafka", "scalability", "infrastructure", "concurrency", "low-latency"],
        langs: ["Rust", "Go", "C++", "Java", "Erlang", "Elixir"],
        theme: "Architect",
        weight: 1.2
    },
    "Frontend Engineer": {
        keywords: ["ui", "ux", "accessibility", "responsive", "frontend", "component", "styling", "design-system"],
        langs: ["TypeScript", "JavaScript", "HTML", "CSS"],
        theme: "Artist",
        weight: 1.0
    },
    "Creative Technologist": {
        keywords: ["generative", "threejs", "webgl", "canvas", "glsl", "shaders", "interaction", "animation", "motion"],
        langs: ["GLSL", "ShaderLab", "Processing", "TypeScript"],
        theme: "Artist",
        weight: 1.5
    },
    "ML Engineer": {
        keywords: ["ai", "jupyter", "tensorflow", "pytorch", "transformers", "training", "inference", "neural"],
        langs: ["Python", "Jupyter Notebook", "R", "C++"],
        theme: "Architect",
        weight: 1.3
    },
    "Indie Hacker": {
        keywords: ["product", "mvp", "shipping", "saas", "profitable", "solo", "marketing"],
        langs: ["Ruby", "PHP", "Dart", "Swift", "TypeScript"],
        theme: "Minimalist",
        weight: 1.4
    },
    "Full Stack Dev": {
        keywords: ["fullstack", "web", "app", "platform", "api", "database", "crud"],
        langs: ["TypeScript", "JavaScript", "Python", "Go"],
        theme: "Architect",
        weight: 0.9
    },
    "Systems Designer": {
        keywords: ["low-level", "kernel", "os", "compiler", "runtime", "drivers", "embedded"],
        langs: ["C", "C++", "Rust", "Assembly"],
        theme: "Architect",
        weight: 1.6
    },
    "UI Scientist": {
        keywords: ["experimental", "lab", "prototyping", "gesture", "interface", "hci", "design"],
        langs: ["TypeScript", "Swift", "Kotlin"],
        theme: "Artist",
        weight: 1.8
    }
};

export function analyzeProfile(repos: GithubRepo[]): IntelligenceReport {
    const scores: Record<GitFlexRole, number> = {} as Record<GitFlexRole, number>;
    Object.keys(ROLE_METRICS).forEach(role => scores[role as GitFlexRole] = 0);

    const langStats: Record<string, { count: number; stars: number; commits: number }> = {};
    const frameworkStats: Record<string, number> = {};

    const now = new Date();
    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
    const twoYearsAgo = new Date(now.setFullYear(now.getFullYear() - 2));

    // 1. Analyze Repositories
    repos.forEach(repo => {
        const updatedAt = new Date(repo.updated_at);
        const isRecent = updatedAt > sixMonthsAgo;
        const isStale = updatedAt < twoYearsAgo;

        let multiplier = 1.0;
        if (isRecent) multiplier *= 2.0;
        if (isStale) multiplier *= 0.5;
        if (repo.is_fork) multiplier *= 0.3;

        // Commit frequency bonus
        if (repo.commit_frequency) {
            multiplier *= (1 + (repo.commit_frequency / 20));
        }

        // Popularity / Credibility signal
        const starRatio = repo.forks_count > 0 ? repo.stargazers_count / repo.forks_count : repo.stargazers_count;
        const credibilityBonus = Math.min(starRatio / 10, 5); // caps at 5 points

        // Language Stats
        if (repo.language) {
            if (!langStats[repo.language]) langStats[repo.language] = { count: 0, stars: 0, commits: 0 };
            langStats[repo.language].count++;
            langStats[repo.language].stars += repo.stargazers_count;
            langStats[repo.language].commits += (repo.commit_frequency || 0) * 12; // annualized approximation

            Object.entries(ROLE_METRICS).forEach(([role, config]) => {
                if (config.langs.includes(repo.language)) {
                    scores[role as GitFlexRole] += (15 * multiplier * config.weight) + credibilityBonus;
                }
            });
        }

        // Framework & Topic Detection
        const textBlob = `${repo.name} ${repo.description} ${repo.topics.join(" ")}`.toLowerCase();

        // Framework specific check
        if (textBlob.includes("react")) frameworkStats["React"] = (frameworkStats["React"] || 0) + 1;
        if (textBlob.includes("next.js") || textBlob.includes("nextjs")) frameworkStats["Next.js"] = (frameworkStats["Next.js"] || 0) + 1;
        if (textBlob.includes("tailwind")) frameworkStats["Tailwind CSS"] = (frameworkStats["Tailwind CSS"] || 0) + 1;
        if (textBlob.includes("docker") || textBlob.includes("kubernetes")) frameworkStats["Cloud Native"] = (frameworkStats["Cloud Native"] || 0) + 1;

        Object.entries(ROLE_METRICS).forEach(([role, config]) => {
            config.keywords.forEach(kw => {
                if (textBlob.includes(kw.toLowerCase())) {
                    scores[role as GitFlexRole] += (8 * multiplier * config.weight) + credibilityBonus;
                }
            });
        });
    });

    // 2. Rank Roles
    const sortedRoles = (Object.entries(scores) as [GitFlexRole, number][])
        .sort(([, a], [, b]) => b - a);

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) || 1;

    const primaryRole = sortedRoles[0][0];
    const primaryConfidence = Math.min(Math.round((sortedRoles[0][1] / totalScore) * 100 * 1.5), 99); // Normalized scale

    const secondaryRole = sortedRoles[1][1] > (sortedRoles[0][1] * 0.4) ? sortedRoles[1][0] : null;
    const secondaryConfidence = secondaryRole ? Math.min(Math.round((sortedRoles[1][1] / totalScore) * 100 * 1.5), 80) : 0;

    // 3. Generate Explanation
    const primaryLangs = langStats[ROLE_METRICS[primaryRole].langs[0]] ? ROLE_METRICS[primaryRole].langs[0] : Object.keys(langStats).sort((a, b) => langStats[b].count - langStats[a].count)[0];
    const whyExplanation = `Analysis of ${repos.length} repositories confirms a dominant ${primaryRole} pattern. High recency/activity in ${primaryLangs} ecosystem combined with ${sortedRoles[0][1].toFixed(0)} signal points in ${ROLE_METRICS[primaryRole].theme.toLowerCase()} domains.`;

    // 4. Stack Strength
    const stackStrength: Record<string, number> = {};
    Object.entries(langStats).forEach(([lang, data]) => {
        stackStrength[lang] = Math.min(Math.round((data.count / repos.length) * 100 + (data.stars / 100)), 100);
    });
    Object.entries(frameworkStats).forEach(([fw, count]) => {
        stackStrength[fw] = Math.min(Math.round((count / repos.length) * 150), 100);
    });

    // 5. Emerging Signal
    let emerging: AnalysisSignal | null = null;
    const thirdRole = sortedRoles[2];
    if (thirdRole && thirdRole[1] > (totalScore * 0.1)) {
        emerging = {
            type: "Persona",
            title: `Emerging: ${thirdRole[0]}`,
            description: `Growing footprint detected in ${thirdRole[0]} specialized domains.`,
            strength: "Emerging",
            score: Math.round((thirdRole[1] / totalScore) * 100)
        };
    }

    // 5. Featured Projects (Selection Logic)
    const featuredProjects = repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 3)
        .map(r => ({
            name: r.name,
            description: r.description,
            stars: r.stargazers_count,
            url: `https://github.com/Kishann911/${r.name}`, // Authentic demo path
            language: r.language
        }));

    const report: IntelligenceReport = {
        primary: {
            role: primaryRole,
            confidence: primaryConfidence,
            explanation: whyExplanation,
            theme: ROLE_METRICS[primaryRole].theme
        },
        secondary: secondaryRole ? {
            role: secondaryRole,
            confidence: secondaryConfidence,
            explanation: `Strong supporting skills in ${secondaryRole} detected.`,
            theme: ROLE_METRICS[secondaryRole].theme
        } : null,
        emerging,
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
                description: `Average commit frequency of ${Math.round(repos.reduce((acc, r) => acc + (r.commit_frequency || 0), 0) / repos.length)}/mo across active projects.`,
                strength: "Strong"
            }
        ],
        stackStrength,
        explanation: whyExplanation,
        visualTheme: ROLE_METRICS[primaryRole].theme,
        role: primaryRole,
        featuredProjects
    };

    return report;
}
