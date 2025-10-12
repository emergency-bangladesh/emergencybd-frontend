import { cn } from '@/lib/utils'

export default function Large({
  children,
  className,
}: { children: React.ReactNode; className?: string } & Omit<
  React.ComponentProps<'div'>,
  'className'
>) {
  return (
    <div className={cn('text-lg font-semibold', className)}>{children}</div>
  )
}
