import { Suspense } from 'react'
import { rooms } from '@/lib/data'
import { NavigatePageClient } from './NavigatePageClient'

export function generateStaticParams() {
  return rooms.filter(r => r.navigable).map(room => ({ id: room.id }))
}

interface Props {
  params: Promise<{ id: string }>
}

export default function NavigatePage({ params }: Props) {
  return (
    <Suspense>
      <NavigatePageClient params={params} />
    </Suspense>
  )
}
