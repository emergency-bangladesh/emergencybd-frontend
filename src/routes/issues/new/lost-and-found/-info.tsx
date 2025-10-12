import { IconCircleDashedX } from '@tabler/icons-react'
import { Info } from '@/components/ui/info'

export function LostAndFoundInfo() {
  return (
    <Info
      icon={<IconCircleDashedX />}
      text="Information regarding ‘Someone Is Lost’"
    />
  )
}
