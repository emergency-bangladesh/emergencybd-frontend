import { IconBrandFacebook, IconMail } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants";
import { useLanguage } from "@/integrations/language/use-language";

export const Route = createFileRoute("/(static)/contact-us")({
  component: ContactUs,
});

function ContactUs() {
  const { language } = useLanguage();
  return (
    <div className="w-full max-w-lg rounded-2xl">
      <div>
        <h1 className="text-center text-2xl font-bold">
          {language === "en"
            ? "Contact Us – Emergency Bangladesh"
            : "যোগাযোগ মাধ্যম - ইমারজেন্সি বাংলাদেশ"}
        </h1>
      </div>
      <div className="flex flex-col gap-6 items-center">
        <p className="text-center text-muted-foreground">
          {language === "en"
            ? "For any urgent inquiries, reach us directly via email or Facebook."
            : "যেকোনো প্রশ্নের জন্য আমাদের ইমেইল দিন বা ফেসবুকে টেক্সট দিন।"}
        </p>

        {/* Email Contact */}
        <Button
          variant="outline"
          size="lg"
          className="w-full flex items-center gap-3"
          asChild
        >
          <a href="mailto:info@emergencybd.com">
            <IconMail className="w-5 h-5" />
            {language === "en" ? "Send an Email" : "আমাদের ইমেইল পাঠান"}
          </a>
        </Button>

        {/* Facebook Contact */}
        <Button
          variant="outline"
          size="lg"
          className="w-full flex items-center gap-3"
          asChild
        >
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandFacebook className="w-5 h-5" />
            {language === "en" ? "Message on Facebook" : "ফেসবুকে মেসেজ করুন"}
          </a>
        </Button>
      </div>
    </div>
  );
}
