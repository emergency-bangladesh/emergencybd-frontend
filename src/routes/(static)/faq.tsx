import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/integrations/language/use-language";
import { faqsBn } from "./-faq/faq-bn";
import { faqsEn } from "./-faq/faq-en";

export const Route = createFileRoute("/(static)/faq")({
  component: FaqPage,
});

const title = {
  en: "Frequently Asked Questions",
  bn: "সচারচর জিজ্ঞাসিত প্রশ্ন",
};

const subtitle = {
  en: "Here are some of our most asked questions. If you have any other questions, please feel free to contact us.",
  bn: "এখানে সবচেয়ে জিজ্ঞাসিত কিছু প্রশ্ন ও উত্তর দেওয়া হলো। এর বাইরে অন্য প্রশ্নের জন্য অনুগ্রহপূর্বক আমাদের সাথে যোগাযোগ করুন।",
};

const faqs = { en: faqsEn, bn: faqsBn };

function FaqPage() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto max-w-3xl py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{title[language]}</h1>
        <p className="mt-4 text-muted-foreground">{subtitle[language]}</p>
      </div>
      <div className="mt-12">
        <Accordion type="single" collapsible className="w-full">
          {faqs[language].map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={faq.question}>
              <AccordionTrigger className="text-[1rem]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
