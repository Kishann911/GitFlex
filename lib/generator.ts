import { IntelligenceReport, VisualTheme, FeaturedProject } from "./intelligence";

export interface ReadmeVariant {
    id: string;
    name: string;
    markdown: string;
    theme: VisualTheme;
    isPremium?: boolean;
}

/**
 * UTILS FOR PREMIUM GENERATION
 */

const getShield = (label: string, value: string, color: string = "lime") => {
    // Accessible color mapping
    const colorMap: Record<string, string> = {
        "lime": "a3e635",
        "zinc": "18181b",
        "white": "ffffff",
        "error": "ef4444"
    };
    const hex = colorMap[color] || color;
    return `![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(value)}-${hex}?style=flat-square&labelColor=18181b)`;
};

const formatProjects = (projects: FeaturedProject[], style: 'classic' | 'minimal' | 'cards') => {
    if (projects.length === 0) return "*No public projects discovered yet.*";

    // Highlight first project as 'Hero'
    const hero = projects[0];
    const others = projects.slice(1);

    if (style === 'minimal') {
        return projects.map(p => `- **[${p.name}](${p.url})** — ${p.description}`).join('\n');
    }

    if (style === 'cards') {
        const heroMarkdown = `
### 🚀 Hero Project: [${hero.name}](${hero.url})
> ${hero.description}
${getShield("Primary Stack", hero.language, "lime")} ${getShield("Stars", hero.stars.toString(), "white")}
`;
        const othersMarkdown = others.length > 0 ? `
#### Secondary Architectures
${others.map(p => `- [${p.name}](${p.url}) — *${p.language}*`).join('\n')}
` : '';
        return heroMarkdown + othersMarkdown;
    }

    return projects.map(p => `#### ${p.name}\n${p.description}\n`).join('\n');
};

const getPersonalityBio = (role: string) => {
    const bios: Record<string, string> = {
        "Backend Architect": "Architecting resilient distributed systems. I prioritize architectural integrity, scalability, and type-safety in high-throughput environments.",
        "Frontend Engineer": "Building accessible, high-performance user interfaces. I believe the browser is an infinite canvas for interaction design.",
        "Creative Technologist": "Operating at the intersection of aesthetic and binary. I build immersive web experiences using WebGL and advanced motion systems.",
        "ML Engineer": "Developing practical intelligence. Focused on neural architecture, data hygiene, and robust model deployment.",
        "Indie Hacker": "Generalist builder optimized for shipping. I focus on high-velocity MVP development and sustainable product growth.",
        "Full Stack Dev": "End-to-end engineer bridging the gap between database performance and UI fluidity.",
        "Systems Designer": "Developing zero-cost abstractions and low-level efficiencies. I speak the language of memory-safety and kernel-level performance.",
        "UI Scientist": "Experimental builder exploring the future of human-computer interaction through prototypes and gestures.",
        "Knowledge Architect": "Synthesizing complex technical landscapes into structured, accessible knowledge. I value documentation as a first-class citizen of engineering.",
        "Explorer": "Currently navigating the GitHub ecosystem, establishing a footprint in emerging technologies and open-source contributions."
    };
    return bios[role] || "Dedicated software engineer focused on building meaningful open-source tools and contributing to the global developer community.";
};

/**
 * VARIANTS
 */

export function generateVariants(report: IntelligenceReport): ReadmeVariant[] {
    const { primary, secondary, stackStrength, featuredProjects } = report;
    const role = primary.role;

    const topLangs = Object.entries(stackStrength)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name]) => name);

    const variants: ReadmeVariant[] = [];

    // 1. MINIMAL & CLEAN
    variants.push({
        id: "minimal",
        name: "Minimalist Synthesis",
        theme: "Minimalist",
        isPremium: false,
        markdown: `
# ${role.toLowerCase()}.

${getPersonalityBio(role)}

### ⚡ Neural Stack
${topLangs.join(' • ')}

### 🏗 Discovery
${formatProjects(featuredProjects, 'minimal')}

---
*Generated via GitFlex Intelligence — Verified ${primary.role} Archetype.*
`.trim()
    });

    // 2. BOLD & EXPRESSIVE
    variants.push({
        id: "bold",
        name: "Bold Expression",
        theme: "Artist",
        isPremium: true,
        markdown: `
<div align="center">
  <h1>✦ ${role.toUpperCase()} ✦</h1>
  <p align="center">
    <strong>Engineering with Intent. Design with Authority.</strong>
  </p>
  <br/>
</div>

### ✦ SYNTHESIS
${getPersonalityBio(role)} ${secondary ? `Hybrid background in ${secondary.role}.` : ''}

### ✦ ECOSYSTEM
${topLangs.map(l => getShield(l, "Focus", "lime")).join(' ')}

### ✦ ARCHITECTURES
${formatProjects(featuredProjects, 'cards')}

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${featuredProjects[0]?.url.split('/')[3] || 'user'}&layout=compact&hide_border=true&title_color=a3e635&text_color=ffffff&bg_color=18181b" alt="Top Langs" />
</div>
`.trim()
    });

    // 3. RECRUITER-FOCUSED
    variants.push({
        id: "pro",
        name: "Professional Authority",
        theme: "Architect",
        isPremium: true,
        markdown: `
# ${role}
**Expertise in ${topLangs[0] || 'Modern'} ecosystems and ${primary.theme} methodologies.**

### 💼 Career Synthesis
${getPersonalityBio(role)}

- 🧪 **Identity Confidence**: ${report.isUserRefined ? 'Human Verified' : `${primary.confidence}% Intelligence Match`}
- 🔭 **Current Focus**: ${report.signals[0]?.title || 'Professional Growth'}
- 🌱 **Neural Growth**: ${report.emerging?.title || 'Expanding Technical Horizon'}

### 🛠 Core Competencies
| Category | Technical Stack | Proficiency |
| :--- | :--- | :--- |
| Primary | ${topLangs.slice(0, 2).join(', ') || 'N/A'} | Expert |
| Supporting | ${topLangs.slice(2, 4).join(', ') || 'N/A'} | Mid-Market |

### 🚀 Key Contributions
${formatProjects(featuredProjects, 'classic')}

### 📫 Connectivity
- Portfolio: [YourSite.com](#)
- LinkedIn: [Your Profile](#)
`.trim()
    });

    // 4. THE TERMINAL
    variants.push({
        id: "terminal",
        name: "Terminal State",
        theme: "Architect",
        isPremium: false,
        markdown: `
\`\`\`bash
$ whoami
> ${role}

$ gitflex-analysis --identity
{
  "status": "Online",
  "archetype": "${role}",
  "location": "GitHub / Global",
  "motto": "Elegant code. Efficient systems."
}

$ ls -l projects/
${featuredProjects.map(p => `total 1 ${p.name}/`).join('\n')}

$ cat skills.json
{
  "expert": [ ${topLangs.slice(0, 3).map(l => `"${l}"`).join(', ')} ],
  "learning": [ ${report.emerging?.title.split(': ')[1] ? `"${report.emerging.title.split(': ')[1]}"` : '"Next Generation Tech"'} ]
}

$ tail -n 1 logs/current_thought.log
> Optimizing the boundary between code and user experience.
\`\`\`
`.trim()
    });

    return variants;
}
