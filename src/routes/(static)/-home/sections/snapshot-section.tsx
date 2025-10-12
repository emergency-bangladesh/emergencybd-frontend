import {
  IconAlertCircle,
  IconBell,
  IconCircleDotted,
  IconUsers,
} from '@tabler/icons-react'
import { Info } from '@/components/ui/info'
import { useLanguage } from '@/integrations/language/use-language'

const copies = {
  title: { en: 'What Is Emergency Bangladesh?', bn: 'ইমারজেন্সি বাংলাদেশ কি?' },
}

const infoCopies = [
  {
    icon: <IconAlertCircle />,
    copy: { en: 'Incident Tracker', bn: 'ঘটনা ট্র্যাকার' },
  },
  {
    icon: <IconBell />,
    copy: {
      en: 'A Proper Notification Bridge',
      bn: 'একটি যথাযথ নোটিফিকেশন ব্রীজ',
    },
  },
  {
    icon: <IconCircleDotted />,
    copy: {
      en: 'Updates Manager',
      bn: 'আপডেট ম্যানেজার',
    },
  },
  {
    icon: <IconUsers />,
    copy: {
      en: 'A Community Driven Issue Resolver',
      bn: 'কমিউনিটি ড্রিভেন সমস্যা সমাধানকারী সিস্টেম',
    },
  },
]

export const SnapshotSection = () => {
  const { language } = useLanguage()
  return (
    <section className="lg:px-10 w-full">
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <h2 className="text-center">{copies.title[language]}</h2>
        <div className="inline-flex flex-wrap items-center justify-center gap-6 w-full p-2">
          {infoCopies.map((info, index) => (
            <Info key={index} icon={info.icon} text={info.copy[language]} />
          ))}
        </div>
      </div>
    </section>
  )
}
