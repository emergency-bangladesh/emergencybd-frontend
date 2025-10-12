'use client'

import { useLanguage } from '@/integrations/language/use-language'
import { useTheme } from '@/integrations/theme/use-theme'

export const HowItWorksSection = () => {
  const { theme } = useTheme()
  const { language } = useLanguage()

  const imageSource = `/how-it-works-${theme}-${language.toLowerCase()}.webp`

  return (
    <section className="flex flex-col items-center justify-center gap-4 px-4 text-center sm:gap-6 sm:px-6 md:gap-8 md:px-10 lg:px-16">
      <h1>
        {language === 'en'
          ? 'From Issue to Action: Turning Alerts into Actions'
          : 'সমস্যা থেকে অ্যাকশন: সতর্কবার্তাকে অ্যাকশনে রূপান্তরিত করা'}
      </h1>
      <img
        src={imageSource}
        alt="Representation of 'From Issue to Action: Turning Alerts into Actions'"
        className="h-auto w-full max-w-7xl rounded-lg object-contain"
      />
    </section>
  )
}
