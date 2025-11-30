import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/integrations/language/use-language";
import { PrivacyPolicyBn } from "./-privacy-policy/privacy-policy-bn";
import { PrivacyPolicyEn } from "./-privacy-policy/privacy-policy-en";

export const Route = createFileRoute("/(static)/legal/privacy-policy")({
  component: PrivacyPolicyPage,
});

const privacyPolicy = {
  en: <PrivacyPolicyEn />,
  bn: <PrivacyPolicyBn />,
};

function PrivacyPolicyPage() {
  const { language } = useLanguage();
  return privacyPolicy[language];
}
