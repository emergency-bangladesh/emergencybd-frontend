import { createFileRoute } from '@tanstack/react-router'
import { IconCircleCheck, IconMail } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import Muted from '@/components/ui/typography/muted'

export const Route = createFileRoute('/registration/success')({
  component: RegistrationSuccessComponent,
})

function RegistrationSuccessComponent() {
  return (
    <div className="flex flex-col items-center justify-center max-w-md text-center">
      <div>
        <div className="flex justify-center items-center mb-4">
          <IconCircleCheck className="w-16 h-16 text-accent-foreground" />
        </div>
        <h2>Submission Successful</h2>
      </div>
      <div>
        <Muted>
          We received your request, wait until your information is cross checked
          and validated. You will be notified soon.
        </Muted>
        <Button className="mt-6 w-full" asChild>
          <a
            href="mailto:project.emergencybd@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconMail className="mr-2 h-4 w-4" /> Contact Us for Faster Validation
          </a>
        </Button>
      </div>
    </div>
  )
}
