import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
} from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import Logo from './logo'
import { Button } from './ui/button'
import { SOCIAL_LINKS } from '@/constants'
import { useLanguage } from '@/integrations/language/use-language'

const name = {
  en: 'Emergency Bangladesh',
  bn: 'ইমারজেন্সি বাংলাদেশ',
}

const year = { en: '2025', bn: '২০২৫' }

const privacyPolicyButtonText = {
  en: 'Privacy Policy',
  bn: 'গোপনীয়তা নিতি',
}

const aboutUsButtonText = {
  en: 'About Us',
  bn: 'আমাদের সম্পর্কে জানুন',
}

const termsAndConditionsButtonText = {
  en: 'Terms & Conditions',
  bn: 'শর্তাবলী এবং নিয়মাবলী',
}

export const Footer = () => {
  const { language } = useLanguage()

  return (
    <footer className="flex max-lg:p-4 max-lg:flex-col max-lg:gap-4 items-center max-md:justify-center justify-between px-6 py-2 bg-background w-full">
      <div
        id="footer-copyright"
        className="flex items-center justify-center gap-2"
      >
        <Logo /> {name[language]} &copy; {year[language]}
      </div>

      <div
        id="footer-redirects"
        className="flex items-center justify-center gap-2"
      >
        <Button variant={'outline'} asChild>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandInstagram />
          </a>
        </Button>
        <Button variant={'outline'} asChild>
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandFacebook />
          </a>
        </Button>
        <Button variant={'outline'} asChild>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin />
          </a>
        </Button>
        <Button variant={'outline'} asChild>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub />
          </a>
        </Button>
        <Button variant={'outline'} asChild>
          <a
            href="mailto:project.emergencybd@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconMail />
            <span className="max-md:hidden">project.emergencybd@gmail.com</span>
          </a>
        </Button>
      </div>
      <div
        id="footer-links"
        className="flex items-center justify-center max-md:justify-between gap-2"
      >
        <Button variant={'ghost'} asChild>
          <Link to="/privacy-policy">{privacyPolicyButtonText[language]}</Link>
        </Button>
        <Button variant={'ghost'} asChild>
          <Link to="/about-us">{aboutUsButtonText[language]}</Link>
        </Button>
        <Button variant={'ghost'} asChild>
          <Link to="/terms-and-conditions">
            {termsAndConditionsButtonText[language]}
          </Link>
        </Button>
      </div>
    </footer>
  )
}
