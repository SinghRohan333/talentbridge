import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { StatsBand } from "@/components/home/StatsBand";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { FAQ } from "@/components/home/FAQ";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";

export const metadata: Metadata = {
  title: "TalentBridge — AI-Powered Job Board",
  description:
    "Find your next role or hire your next great employee, powered by AI matching.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedCategories />
      <StatsBand />
      <FeaturedJobs />
      <HowItWorks />
      <Features />
      <FAQ />
      <NewsletterCTA />
    </main>
  );
}
