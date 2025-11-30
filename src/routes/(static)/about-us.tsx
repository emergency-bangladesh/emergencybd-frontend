import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/integrations/language/use-language";
import AboutUsBn from "./-about-us/about-us-bn";
import AboutUsEn from "./-about-us/about-us-en";

export const Route = createFileRoute("/(static)/about-us")({
  component: AboutUsPage,
});

const aboutUs = {
  en: <AboutUsEn />,
  bn: <AboutUsBn />,
};

function AboutUsPage() {
  const { language } = useLanguage();
  return aboutUs[language];
}
