import { IconUserScan } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { BackButton } from '@/components/back-button'
import { LinkCard } from '@/components/ui/link-card'

export const Route = createFileRoute('/registration/')({
  component: RegistrationSelectorPage,
})

function RegistrationSelectorPage() {
  return (
    <div className="flex justify-center items-center max-w-lg w-full flex-col gap-8">
      <section className="flex flex-col items-center justify-start">
        <h1>Join Emergency Bangladesh</h1>
        <p>
          We allow joining through registering as a volunteer or a general user
        </p>
      </section>
      <section className="flex flex-col gap-4 items-center justify-start">
        <LinkCard
          to="/registration/volunteer/personal-information"
          icon={<IconUserScan size={48} />}
          heading="Register as a volunteer"
          subHeading="Report and respond to issues, join teams, and track updates. Requires NID/BRN verification."
        />
        <p>Click here to report a new issue to join as a general user →</p>
      </section>
      <BackButton />
    </div>
  )
}
