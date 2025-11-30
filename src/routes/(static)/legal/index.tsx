import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/integrations/language/use-language";

export const Route = createFileRoute("/(static)/legal/")({
  component: RouteComponent,
});

const texts = {
  en: {
    title: "Legal Docs of Emergency Bangladesh",
    privacyPolicy: "Privacy Policy",
    termsAndConditions: "Terms and Conditions",
    whyId: "Why We Require ID Documents?",
  },
  bn: {
    title: "ইমার্জেন্সি বাংলাদেশের আইনি নথিপত্র",
    privacyPolicy: "গোপনীয়তা নীতি",
    termsAndConditions: "শর্তাবলী",
    whyId: "কেন আমরা আইডি নথি চাই?",
  },
};

function RouteComponent() {
  const { language } = useLanguage();
  const content = texts[language];

  return (
    <div>
      <h3>{content.title}</h3>
      <div className="flex flex-col gap-2 items-center justify-center mt-8">
        <Button asChild variant="link">
          <Link to="/legal/privacy-policy">{content.privacyPolicy}</Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/legal/terms-and-conditions">
            {content.termsAndConditions}
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/legal/why-we-require-id-documents">{content.whyId}</Link>
        </Button>
      </div>
    </div>
  );
}
