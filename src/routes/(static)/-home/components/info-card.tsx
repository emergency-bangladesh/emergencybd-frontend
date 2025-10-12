import { Card, CardContent, CardHeader } from '@/components/ui/card'

type InfoCardProps = {
  icon: React.ElementType
  title: string
  description: string
}

export const InfoCard = ({ icon: Icon, title, description }: InfoCardProps) => (
  <Card className="bg-[linear-gradient(180deg,var(--background)_25%,var(--accent)_100%)] hover:bg-none transition-all ease-in-out duration-300 h-full">
    <CardHeader>
      <Icon className="size-10 md:size-12" />
      <span className="font-bold text-xl">{title}</span>
    </CardHeader>
    <CardContent>{description}</CardContent>
  </Card>
)
