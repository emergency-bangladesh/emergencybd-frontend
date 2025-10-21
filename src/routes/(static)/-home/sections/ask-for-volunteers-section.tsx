import { IconCircleDashedPlus, IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Info } from "@/components/ui/info";
import { useLanguage } from "@/integrations/language/use-language";
import { PeoplesImage } from "../components/peoples";

const infoText = {
  en: "Emergency Bangladesh Is Open for Registration",
  bn: "ইমারজেন্সি বাংলাদেশ নিবন্ধনের জন্য উন্মুক্ত",
};

const title = {
  en: "Step up, save lives — Join as a Volunteer!",
  bn: "এগিয়ে আসুন, জীবন বাঁচান — ভলান্টিয়ার  হিসেবে যোগদান করুন!",
};

const description = {
  en: "Just a few steps — Share your info, upload your ID, add a profile photo and location, complete verification, and you are ready to go!",
  bn: "মাত্র কয়েকটি ধাপ — তথ্য প্রদান করুন, আইডি ডকুমেন্ট আপলোড করুন, প্রোফাইল ছবি এবং আপনার লোকশন যোগ করুন, যাচাইকরণ প্রক্রিয়ার সম্পূর্ণ করুন — আপনি যোগদানের জন্য প্রস্তুত!",
};

const volunteerButtonText = {
  en: "Join As A Volunteer",
  bn: "ভলান্টিয়ার হিসেবে যোগদান করুন",
};

const whyDocumentBButtonText = {
  en: "Learn Why We Require ID Documents",
  bn: "জানুন কেন আমাদের পরিচয়পত্রের ডকুমেন্ট প্রয়োজন",
};

export const AskForVolunteersSection = () => {
  const { language } = useLanguage();

  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 px-4 sm:px-8 md:px-16 lg:px-28">
      <PeoplesImage />
      <div className="flex flex-col justify-start gap-6 md:gap-8 w-full md:w-3/5 max-w-3xl">
        <div className="flex flex-col gap-3 md:gap-4">
          <Info icon={<IconCircleDashedPlus />} text={infoText[language]} />
          <h1>{title[language]}</h1>
        </div>
        <p>{description[language]}</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          <Button asChild>
            <a
              href="/registration/volunteer/personal-information"
              className="flex gap-1 items-center justify-center"
            >
              <IconPlus />
              {volunteerButtonText[language]}
            </a>
          </Button>
          <Button variant={"outline"} asChild>
            <a
              href="http://docs.emergencybd.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {whyDocumentBButtonText[language]}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
