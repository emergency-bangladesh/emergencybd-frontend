type PilProps = {
  icon: React.ReactNode
  text: string
}

export const Pil = ({ icon, text }: PilProps) => {
  return (
    <div className="inline-flex gap-1 items-center justify-center px-2 py-0.5 rounded-xl bg-[linear-gradient(180deg,rgba(252,252,252,0.30)_51.28%,rgba(0,112,90,0.30)_188.46%)] shadow-xs shadow-foreground/50 text-xs sm:text-sm">
      {icon}
      {text}
    </div>
  )
}
