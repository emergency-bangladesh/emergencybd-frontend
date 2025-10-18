import {
  IconCode,
  IconPlus,
  IconSparkles,
  IconUserPlus,
} from "@tabler/icons-react";
import Logo from "@/components/logo";
import { BackgroundBox } from "@/components/ui/background-box";
import { Button } from "@/components/ui/button";
import { Pil } from "@/components/ui/pil";
import { useLanguage } from "@/integrations/language/use-language";

const copies = {
  pilText: {
    en: "Completely free to use!",
    bn: "সম্পূর্ণ বিনামূল্যে ব্যবহারযোগ্য!",
  },
  logoText: { en: "Emergency Bangladesh", bn: "ইমারজেন্সি বাংলাদেশ" },
  heroHeading: {
    en: "The Trusted and Free Live-Saving Solution",
    bn: "বিশ্বস্ত এবং বিনামূল্যে জীবন বাঁচানোর একটি সমাধান",
  },
  heroDescription: {
    en: "Real-time notifications that save lives: Instant Warnings, Faster Response, Safer Communities.",
    bn: "জীবন বাঁচাতে রিয়েল-টাইম নোটিফিকেশন: তাৎক্ষণিক সতর্কতা। দ্রুত রেসপন্স। নিরাপদ সমাজ।",
  },
  newIssueLinkText: { en: "Report an Issue", bn: "নতুন সমস্যা রিপোর্ট করুন" },
  volunteerLinkText: {
    en: "Join as aVolunteer",
    bn: "ভলান্টিয়ার হিসেবে যোগদান করুন",
  },
  sourceCodeLinkText: { en: "Source Code", bn: "সোর্স কোড" },
};

export const HeroSection = () => {
  const { language } = useLanguage();
  return (
    <BackgroundBox>
      <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
        <div
          id="basic-information"
          className="flex flex-col items-center justify-center gap-3 sm:gap-4"
        >
          <Pil
            icon={<IconSparkles className="size-4" />}
            text={copies.pilText[language]}
          />
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Logo className="size-8 sm:size-10 md:size-12" />
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {copies.logoText[language]}
            </span>
          </div>
          <h1>{copies.heroHeading[language]}</h1>
          <p>{copies.heroDescription[language]}</p>
        </div>
        <div
          id="cta-buttons"
          className="grid grid-cols-1 sm:grid-cols-3 items-center justify-center gap-3 w-full max-w-3xl sm:gap-4"
        >
          <Button variant={"outline"} asChild className="w-full">
            <a href="/issues/new">
              <IconPlus className="size-4" />
              {copies.newIssueLinkText[language]}
            </a>
          </Button>
          <Button asChild className="w-full">
            <a href="/registration/volunteer/personal-information">
              <IconUserPlus className="size-4" />
              {copies.volunteerLinkText[language]}
            </a>
          </Button>
          <Button variant={"outline"} asChild className="w-full sm:col-span-1">
            <a
              href="http://github.com/emergency-bangladesh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconCode className="size-4" />
              {copies.sourceCodeLinkText[language]}
            </a>
          </Button>
        </div>
      </div>
    </BackgroundBox>
  );
};
