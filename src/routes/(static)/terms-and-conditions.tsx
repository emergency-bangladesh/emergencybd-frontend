import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/integrations/language/use-language";
import { TermsAndConditionsBn } from "./-terms-and-conditions/terms-and-conditions-bn";
import { TermsAndConditionsEn } from "./-terms-and-conditions/terms-and-conditions-en";

export const Route = createFileRoute("/(static)/terms-and-conditions")({
  component: TermsAndConditionsPage,
});

const termsAndConditionsNodes = {
  en: <TermsAndConditionsEn />,
  bn: <TermsAndConditionsBn />,
};

function TermsAndConditionsPage() {
  const { language } = useLanguage();
  return termsAndConditionsNodes[language];
}
