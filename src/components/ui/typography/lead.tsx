export default function Lead({
  children,
  ...props
}: { children: React.ReactNode } & Omit<
  React.ComponentProps<'p'>,
  'className'
>) {
  return (
    <p className="text-muted-foreground text-xl" {...props}>
      {children}
    </p>
  )
}
