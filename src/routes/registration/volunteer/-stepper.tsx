import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
} from '@/components/ui/stepper'
import { useLanguage } from '@/integrations/language/use-language'

const steps = {
  en: ['1', '2', '3', '4', '5', '6'],
  bn: ['১', '২', '৩', '৪', '৫', '৬'],
}

export function VolunteerRegistrationStepper({
  currentStep,
}: {
  currentStep: number
}) {
  const { language } = useLanguage()
  return (
    <div className="mx-auto w-full max-w-lg text-center">
      <Stepper value={currentStep}>
        {steps[language].map((step, index) => (
          <StepperItem key={step} step={index + 1} className="not-last:flex-1">
            <StepperIndicator className="data-[state=active]:border-primary size-4 data-[state=active]:border-2 data-[state=active]:bg-transparent [&_span]:sr-only [&_svg]:size-3" />
            {index + 1 < steps[language].length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  )
}
