import { rooms } from '@/lib/data'
import { RoomPageClient } from './RoomPageClient'

export function generateStaticParams() {
  return rooms.map(room => ({ id: room.id }))
}

interface Props {
  params: Promise<{ id: string }>
}

export default function RoomPage({ params }: Props) {
  return <RoomPageClient params={params} />
}
