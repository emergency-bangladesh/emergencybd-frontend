import { IconArrowRight } from '@tabler/icons-react'
import { Button } from './ui/button'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const NextButton = ({
  onClick,
  className,
  type,
  ...props
}: Omit<ComponentProps<typeof Button>, 'children' | 'asChild' | 'onClick'> & {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) => {
  return (
    <Button
      className={cn('w-full', className)}
      onClick={onClick}
      {...props}
      type={type || 'button'}
    >
      <IconArrowRight />
      Continue
    </Button>
  )
}
