import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/integrations/language/use-language";
import { WhyWeRequireIdDocumentsBn } from "./-why-we-require-id-documents/why-we-require-id-documents-bn";
import { WhyWeRequireIdDocumentsEn } from "./-why-we-require-id-documents/why-we-require-id-documents-en";

export const Route = createFileRoute(
  "/(static)/legal/why-we-require-id-documents",
)({
  component: WhyWeRequireIdDocumentsPage,
});

const whyWeRequireIdDocuments = {
  en: <WhyWeRequireIdDocumentsEn />,
  bn: <WhyWeRequireIdDocumentsBn />,
};

function WhyWeRequireIdDocumentsPage() {
  const { language } = useLanguage();
  return whyWeRequireIdDocuments[language];
}
