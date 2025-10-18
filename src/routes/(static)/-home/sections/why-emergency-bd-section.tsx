import {
  IconLockOpen,
  IconRoute2,
  IconSocial,
  IconSquareForbid,
  IconTagsOff,
  IconViewportWide,
} from "@tabler/icons-react";
import { InfoCard } from "../components/info-card";
import { useLanguage } from "@/integrations/language/use-language";

const title = {
  en: "Why Do People Trust Emergency Bangladesh?",
  bn: "কেন ইমারজেন্সি বাংলাদেশের প্রতি জনগণের আস্থা?",
};

const whyEmergencyBDInfo = [
  {
    icon: IconTagsOff,
    title: { en: "Zero Fees", bn: "কোনো ফি নেই" },
    description: {
      en: "From reporting issues to sending notifications, all services are free of cost",
      bn: "সমস্যা রিপোর্ট করা থেকে শুরু করে নোটিফিকেশন পাঠানো পর্যন্ত, সমস্ত পরিষেবা বিনামূল্যে",
    },
  },
  {
    icon: IconViewportWide,
    title: { en: "Covers Whole Bangladesh", bn: "সমগ্র বাংলাদেশ জুড়ে" },
    description: {
      en: "A volunteer-driven system with Nationwide reach/From villages to cities, the network connects every corner of Bangladesh",
      bn: "দেশব্যাপী বিস্তৃত: গ্রাম থেকে শহর পর্যন্ত বিস্তৃত এই ভলান্টিয়ার-চালিত সিস্টেম নেটওয়ার্কটি বাংলাদেশের প্রতিটি কোনাকে সংযুক্ত করে।",
    },
  },
  {
    icon: IconSquareForbid,
    title: {
      en: "Reliable Technology, Reliable Response",
      bn: "নির্ভরযোগ্য প্রযুক্তি , নির্ভরযোগ্য রেসপন্স",
    },
    description: {
      en: "The software follows micro-service architecture and KISS(Keep it simple and stupid), which makes it scalable and reliable",
      bn: "এই সফটওয়্যারটি মাইক্রো-সার্ভিস আর্কিটেকচার এবং KISS (কিপ ইট সিম্পল অ্যান্ড স্টুপিড) নীতি অনুসরণ করে যা এটিকে স্কেলেবল এবং নির্ভরযোগ্য করে তোলে।",
    },
  },
  {
    icon: IconSocial,
    title: { en: "Community Driven", bn: "কমিউনিটি ড্রিভেন" },
    description: {
      en: "Your voice, your platform/Shaped or improved by user feedback",
      bn: "আপনার আওয়াজ, আপনার প্ল্যাটফর্ম: ব্যবহারকারীর ফিডব্যাক দ্বারা উন্নত",
    },
  },
  {
    icon: IconRoute2,
    title: { en: "User Friendly", bn: "ব্যবহার করা সহজ" },
    description: {
      en: "The UX is designed for everyone, with tutorials when needed.",
      bn: "UX সবার জন্য ডিজাইন করা, টিউটোরিয়াল সহ।",
    },
  },
  {
    icon: IconLockOpen,
    title: {
      en: "Free and Open Source Software (FOSS)",
      bn: "ফ্রি এবং ওপেন সোর্স সফটওয়্যার (FOSS)",
    },
    description: {
      en: "Free to use, study, and improve",
      bn: "ব্যবহার, পড়াশোনা এবং উন্নয়নের জন্য উন্মুক্ত",
    },
  },
];

export const WhyEmergencyBDSection = () => {
  const { language } = useLanguage();

  return (
    <section className="lg:px-28 flex items-center flex-col gap-8 w-full">
      <h1 className="text-center">{title[language]}</h1>
      <div
        id="why-choose-us"
        className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-8 w-full"
      >
        {whyEmergencyBDInfo.map((info, index) => (
          <InfoCard
            key={index}
            icon={info.icon}
            title={info.title[language]}
            description={info.description[language]}
          />
        ))}
      </div>
    </section>
  );
};
