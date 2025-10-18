import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "./-home/sections/hero-section";
import { SnapshotSection } from "./-home/sections/snapshot-section";
import { CoverAllBangladeshSection } from "./-home/sections/cover-all-bangladesh-section";
import { HowItWorksSection } from "./-home/sections/how-it-works-section";
import { WhyEmergencyBDSection } from "./-home/sections/why-emergency-bd-section";
import { AskForVolunteersSection } from "./-home/sections/ask-for-volunteers-section";

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
