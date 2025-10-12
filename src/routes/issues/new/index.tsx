import { createFileRoute } from '@tanstack/react-router'
import { IconCircleDashedX, IconDropletPlus } from '@tabler/icons-react'
import { BackButton } from '@/components/back-button'
import { LinkCard } from '@/components/ui/link-card'
import { useLanguage } from '@/integrations/language/use-language'

export const Route = createFileRoute('/issues/new/')({
  component: RouteComponent,
})

const title = { en: 'Report A new Issue', bn: 'নতুন সমস্যা রিপোর্ট করুন' }
const subtitile = {
  en: 'No account needed! Just select one and proceed',
  bn: 'কোনো অ্যাকাউন্টের প্রয়োজন নেই! সিলেক্ট করে এবং এগিয়ে যান।',
}
const smallText = {
  en: 'I need responses for -',
  bn: 'আমার সাহায্যের প্রয়োজন-',
}
const bloodNeededLinkText = { en: 'Blood Needed', bn: 'রক্তের প্রয়োজন' }
const lostAndFoundLinkText = { en: 'Someone Is Lost', bn: 'একজন নিখোঁজ হয়েছেন' }

function RouteComponent() {
  const { language } = useLanguage()
  return (
    <div className="flex justify-center items-center max-w-md md:w-md flex-col gap-8">
      <section className="text-center flex flex-col items-center justify-start">
        <h1>{title[language]}</h1>
        <p>{subtitile[language]}</p>
      </section>
      <small>{smallText[language]}</small>
      <section className="flex flex-col gap-4 items-center justify-start w-full">
        <LinkCard
          to="/issues/new/blood-donation/add-basic-information"
          icon={<IconDropletPlus size={24} />}
          heading={bloodNeededLinkText[language]}
        />
        <LinkCard
          to="/issues/new/lost-and-found/add-basic-information"
          icon={<IconCircleDashedX size={24} />}
          heading={lostAndFoundLinkText[language]}
        />
      </section>
      <BackButton />
    </div>
  )
}
