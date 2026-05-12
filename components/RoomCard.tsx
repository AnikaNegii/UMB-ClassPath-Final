import Link from 'next/link'
import { ChevronRight, Clock, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Room, RoomType } from '@/lib/types'

const TYPE_LABELS: Record<RoomType, string> = {
  classroom: 'Classroom',
  lab: 'Lab',
  studio: 'Studio',
  office: 'Office',
  lounge: 'Lounge',
  cafe: 'Café',
  library: 'Library',
  other: 'Other',
}

interface RoomCardProps {
  room: Room
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Link
      href={`/room/${room.id}`}
      className={cn(
        'group flex items-center gap-3 rounded-md bg-card px-4 py-3',
        'border border-border',
        'transition-colors duration-[180ms]',
        'hover:border-primary/30 hover:bg-accent/30',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
      )}
      aria-label={`${room.name}${room.navigable ? ', navigable demo room' : ''}`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-heading text-[14px] font-semibold text-foreground truncate">
            {room.name}
          </span>
          {room.navigable && (
            <span className="inline-flex shrink-0 items-center gap-0.5 rounded-sm bg-cp-amber/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cp-amber">
              <Zap className="size-2.5" aria-hidden="true" />
              Demo
            </span>
          )}
        </div>

        <div className="mt-0.5 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Room {room.number}
          </span>
          <span className="text-muted-foreground/40" aria-hidden="true">·</span>
          <span className="text-xs text-muted-foreground">
            {TYPE_LABELS[room.type]}
          </span>
          {room.walkingTime && (
            <>
              <span className="text-muted-foreground/40" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground">
                <Clock className="size-3" aria-hidden="true" />
                {room.walkingTime}
              </span>
            </>
          )}
        </div>
      </div>

      <ChevronRight
        className="size-4 shrink-0 text-muted-foreground/40 transition-transform duration-[180ms] group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  )
}
