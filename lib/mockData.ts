export interface GithubRepo {
    name: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    topics: string[];
    updated_at: string;
    is_fork: boolean;
    size: number; // in KB
    commit_frequency?: number; // commits per month (simulated)
}

export interface GithubProfile {
    login: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
}

export const MOCK_ARCHITECT_REPOS: GithubRepo[] = [
    {
        name: "nebula-core",
        description: "High-performance distributed systems framework. Built with specialized focus on zero-copy serialization.",
        language: "Rust",
        stargazers_count: 1200,
        forks_count: 150,
        topics: ["systems", "distributed", "rust", "performance"],
        updated_at: "2025-01-30T00:00:00Z",
        is_fork: false,
        size: 45000,
        commit_frequency: 15
    },
    {
        name: "ts-monorepo-tools",
        description: "Tooling for large scale TypeScript monorepos. Includes custom build pipeline.",
        language: "TypeScript",
        stargazers_count: 850,
        forks_count: 80,
        topics: ["typescript", "tooling", "monorepo"],
        updated_at: "2025-01-05T00:00:00Z",
        is_fork: false,
        size: 12000,
        commit_frequency: 8
    },
    {
        name: "go-microservices",
        description: "Reference architecture for Go services. Implemented using gRPC and Kafka.",
        language: "Go",
        stargazers_count: 450,
        forks_count: 120,
        topics: ["go", "microservices", "grpc", "kafka"],
        updated_at: "2024-11-20T00:00:00Z",
        is_fork: false,
        size: 8000,
        commit_frequency: 4
    },
    {
        name: "k8s-operator",
        description: "Custom Kubernetes operator for stateful sets. Handles automatic scaling and backups.",
        language: "Go",
        stargazers_count: 2000,
        forks_count: 400,
        topics: ["kubernetes", "operator", "cloud-native"],
        updated_at: "2025-02-01T00:00:00Z",
        is_fork: false,
        size: 5000,
        commit_frequency: 12
    },
];

export const MOCK_ARTIST_REPOS: GithubRepo[] = [
    {
        name: "creative-coding-experiments",
        description: "Daily generative art sketches exploring noise and flow fields. Highly visual.",
        language: "JavaScript",
        stargazers_count: 300,
        forks_count: 45,
        topics: ["generative-art", "p5js", "creative-coding"],
        updated_at: "2025-02-04T00:00:00Z",
        is_fork: false,
        size: 1500,
        commit_frequency: 25
    },
    {
        name: "shader-playground",
        description: "GLSL shader collection for interactive web experiences. Focusing on raymarching.",
        language: "GLSL",
        stargazers_count: 150,
        forks_count: 20,
        topics: ["shaders", "glsl", "webgl", "raymarching"],
        updated_at: "2025-01-15T00:00:00Z",
        is_fork: false,
        size: 500,
        commit_frequency: 5
    },
    {
        name: "threejs-gallery",
        description: "3D immersive web experiences using Three.js and React Three Fiber.",
        language: "TypeScript",
        stargazers_count: 900,
        forks_count: 110,
        topics: ["threejs", "3d", "react", "r3f"],
        updated_at: "2025-01-10T00:00:00Z",
        is_fork: false,
        size: 18000,
        commit_frequency: 10
    },
    {
        name: "interactive-typography",
        description: "Kinetic type experiments using CSS variables and SVG filters.",
        language: "CSS",
        stargazers_count: 500,
        forks_count: 30,
        topics: ["typography", "css", "animation"],
        updated_at: "2024-12-20T00:00:00Z",
        is_fork: false,
        size: 300,
        commit_frequency: 2
    },
];

export const MOCK_MINIMALIST_REPOS: GithubRepo[] = [
    {
        name: "dotfiles",
        description: "My heavily optimized neovim config. Simple, fast, and keyboard-centric.",
        language: "Lua",
        stargazers_count: 5000,
        forks_count: 450,
        topics: ["neovim", "dotfiles", "lua", "minimalism"],
        updated_at: "2025-02-03T00:00:00Z",
        is_fork: false,
        size: 200,
        commit_frequency: 30
    },
    {
        name: "tiny-utils",
        description: "Zero-dependency utility library. Only the essentials.",
        language: "TypeScript",
        stargazers_count: 50,
        forks_count: 5,
        topics: ["utils", "minimal", "essential"],
        updated_at: "2024-05-15T00:00:00Z",
        is_fork: false,
        size: 50,
        commit_frequency: 1
    },
    {
        name: "blog",
        description: "Plain text static site generator. No JS, just Markdown to HTML.",
        language: "Go",
        stargazers_count: 200,
        forks_count: 15,
        topics: ["ssg", "markdown", "simple"],
        updated_at: "2025-01-01T00:00:00Z",
        is_fork: false,
        size: 1000,
        commit_frequency: 2
    },
];

export const MOCK_PROFILES = {
    architect: { login: "system_architect", avatar_url: "https://github.com/ghost.png", bio: "Building reliable systems at scale. Focused on distributed architectures.", public_repos: 45 },
    artist: { login: "visual_coder", avatar_url: "https://github.com/ghost.png", bio: "Pixels and code. Exploring the intersection of design and development.", public_repos: 120 },
    minimalist: { login: "vim_user", avatar_url: "https://github.com/ghost.png", bio: "Less is more. Obsessed with efficiency and clean code.", public_repos: 12 },
};
