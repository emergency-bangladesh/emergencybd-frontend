import { cn } from '@/lib/utils'

export function BackgroundBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex w-full max-w-screen-lg h-fit mx-auto items-center justify-center bg-background px-4 py-8 md:py-16">
      <div className="absolute inset-0 opacity-75">
        <div
          className={cn(
            'absolute inset-0',
            '[background-size:40px_40px]',
            '[background-image:linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)]',
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_60%_40%_at_center,transparent_20%,black)]"></div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
