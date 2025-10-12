import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPolicyEn } from './-privacy-policy/privacy-policy-en'
import { PrivacyPolicyBn } from './-privacy-policy/privacy-policy-bn'
import { useLanguage } from '@/integrations/language/use-language'

export const Route = createFileRoute('/(static)/privacy-policy')({
  component: PrivacyPolicyPage,
})

const privacyPolicyNodes = {
  en: <PrivacyPolicyEn />,
  bn: <PrivacyPolicyBn />,
}

function PrivacyPolicyPage() {
  const { language } = useLanguage()
  return privacyPolicyNodes[language]
}
