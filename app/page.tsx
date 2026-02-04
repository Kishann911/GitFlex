import { HeroSection } from "@/components/landing/HeroSection";
import { EditorialSection } from "@/components/landing/EditorialSection";
import { PersonaSwitcher } from "@/components/landing/PersonaSwitcher";
import { ReadmeShowcase } from "@/components/landing/ReadmeShowcase";
import { RepoToReadme } from "@/components/landing/RepoToReadme";
import { CalmCTA } from "@/components/landing/CalmCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="w-full bg-black min-h-screen">
      <HeroSection />
      <RepoToReadme />
      <PersonaSwitcher />
      <ReadmeShowcase />
      <EditorialSection />
      <CalmCTA />
      <Footer />
    </main>
  );
}
