import { RepoIntelligenceReport } from "./repoIntelligence";
import { ReadmeVariant } from "./generator"; // Reuse existing type or create new

export function generateRepoVariants(report: RepoIntelligenceReport): ReadmeVariant[] {
    const { target, archetype, install, techStack, stability } = report;
    const variants: ReadmeVariant[] = [];

    // 1. THE CONTRIBUTOR (Open Source Focus)
    variants.push({
        id: "contributor",
        name: "Contributor Onboarding",
        theme: "Technical" as any,
        isPremium: false,
        markdown: `
# ${target.name}
> ${target.description}

![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square) ![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square) ![Stability](https://img.shields.io/badge/stability-${stability.toLowerCase()}-orange?style=flat-square)

## 🛠 Development Setup

To contribute to **${target.name}**, follow these steps to set up your local environment.

### Prerequisites
- Node.js > 18.0.0
- ${install?.manager || 'npm'}

### Installation
\`\`\`bash
git clone ${target.url}.git
cd ${target.name}
${install?.command || '# Install dependencies'}
\`\`\`

## 📂 Project Structure
\`\`\`text
src/
  ├── components/   # UI Components
  ├── lib/          # Core utilities
  └── hooks/        # React hooks
\`\`\`

## 🤝 Contributing
We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a Pull Request.
`.trim()
    });

    // 2. THE RECRUITER / SHOWCASE (Portfolio)
    variants.push({
        id: "showcase",
        name: "Portfolio Showcase",
        theme: "Showcase" as any,
        isPremium: true,
        markdown: `
<div align="center">
  <h1>${target.name}</h1>
  <p>${target.description}</p>
  <br />
  <img src="https://via.placeholder.com/800x400.png?text=Project+Hero+Image" alt="Hero" width="100%" />
</div>

<br />

### 🚀 Key Features
- **Modern Architecture**: Built with ${techStack["Language"]}.
- **Performance First**: Optimized for high-throughput environments.
- **Developer Experience**: ${archetype} design patterns ensuring easy adoption.

### 🛠 Tech Stack
| Core | Infrastructure | Tools |
| :--- | :--- | :--- |
| ${techStack["Language"]} | Docker | ${install?.manager} |

### 🔗 Quick Links
- [Live Demo](#)
- [Documentation](#)
`.trim()
    });

    // 3. THE MINIMALIST (Library / Tool)
    variants.push({
        id: "minimal",
        name: "Minimalist Docs",
        theme: "Minimal" as any,
        isPremium: false,
        markdown: `
# ${target.name}

${target.description}

## Usage

\`\`\`bash
${install?.manager === 'npm' ? `npm install ${target.name}` : `# usage command`}
\`\`\`

\`\`\`javascript
import { something } from '${target.name}';

// Example usage
something.doWork();
\`\`\`

## License
MIT © [${target.owner}](https://github.com/${target.owner})
`.trim()
    });

    return variants;
}
