import { IconDropletPlus } from '@tabler/icons-react'
import { Info } from '@/components/ui/info'
import { useLanguage } from '@/integrations/language/use-language'

export function BloodDonationInfo() {
  const { language } = useLanguage()
  return (
    <Info
      icon={<IconDropletPlus />}
      text={
        language === 'en'
          ? 'Information regarding ‘Blood Needed’'
          : '‘রক্তের প্রয়োজন’ সম্পর্কিত তথ্য'
      }
    />
  )
}
