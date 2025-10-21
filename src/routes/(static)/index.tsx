import { createFileRoute } from "@tanstack/react-router";
import { AskForVolunteersSection } from "./-home/sections/ask-for-volunteers-section";
import { CoverAllBangladeshSection } from "./-home/sections/cover-all-bangladesh-section";
import { HeroSection } from "./-home/sections/hero-section";
import { HowItWorksSection } from "./-home/sections/how-it-works-section";
import { SnapshotSection } from "./-home/sections/snapshot-section";
import { WhyEmergencyBDSection } from "./-home/sections/why-emergency-bd-section";

export const Route = createFileRoute("/(static)/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <SnapshotSection />
      <CoverAllBangladeshSection />
      <HowItWorksSection />
      <WhyEmergencyBDSection />
      <AskForVolunteersSection />
    </>
  );
}
