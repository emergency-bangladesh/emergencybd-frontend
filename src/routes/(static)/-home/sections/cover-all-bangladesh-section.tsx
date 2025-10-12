import { BangladeshTracedMap } from '../components/bd-traced-map'
import { useLanguage } from '@/integrations/language/use-language'

const title = {
  en: 'The System Is Meant to Cover All Over Bangladesh',
  bn: 'সমগ্র বাংলাদেশ বিস্তারে তৈরি সিস্টেম',
}
const description = {
  en: 'No matter where you are, alerts reach volunteers across the nation — Connecting communities with dedicated volunteers everywhere.',
  bn: 'যেখানেই থাকুন না কেন, সারা দেশের স্বেচ্ছাসেবকদের কাছে সতর্কবার্তা পৌঁছে যায় — সমাজকে যুক্ত করে নিবেদিত স্বেচ্ছাসেবকদের সাথে, সর্বত্র।',
}

export const CoverAllBangladeshSection = () => {
  const { language } = useLanguage()
  return (
    <section className="sm:px-6 md:px-10 lg:px-16 w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 max-w-[1124px] mx-auto">
        <BangladeshTracedMap />

        <div className="flex flex-col items-start gap-4 md:gap-6 lg:gap-8 text-center md:text-left max-w-xl">
          <h1>{title[language]}</h1>
          <p>{description[language]}</p>
        </div>
      </div>
    </section>
  )
}
