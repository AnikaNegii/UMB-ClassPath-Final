'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Navigation, Trash2,
  BookOpen, FlaskConical, Palette, Briefcase, Coffee, LibraryBig, MapPin,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { getRoomById, getBuildingById } from '@/lib/data'
import { useSavedRoutes } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import type { RoomType } from '@/lib/types'

const EASE = [0.22, 1, 0.36, 1] as const

const TYPE_ICONS: Record<RoomType, React.ElementType> = {
  classroom: BookOpen,
  lab:       FlaskConical,
  studio:    Palette,
  office:    Briefcase,
  lounge:    Coffee,
  cafe:      Coffee,
  library:   LibraryBig,
  other:     MapPin,
}

export default function SavedPage() {
  const router = useRouter()
  const reduce = useReducedMotion()
  const { savedIds, unsave } = useSavedRoutes()

  const savedRooms = useMemo(
    () => savedIds.map(id => getRoomById(id)).filter(Boolean) as NonNullable<ReturnType<typeof getRoomById>>[],
    [savedIds]
  )

  return (
    <main className="flex-1 px-4">
      <header className="pb-4 pt-10">
        <h1 className="font-heading text-2xl font-bold text-foreground">Saved Routes</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Quickly access your frequent lab and classroom destinations.
        </p>
      </header>

      {savedRooms.length === 0 ? (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: EASE, duration: 0.28 }}
          className="mt-8 flex flex-col items-center gap-3 text-center"
        >
          <div
            className="flex size-14 items-center justify-center rounded-full"
            style={{ background: 'var(--cp-teal-light)' }}
          >
            <Navigation className="size-6" style={{ color: 'var(--cp-teal)' }} aria-hidden="true" />
          </div>
          <div>
            <p className="font-heading text-base font-semibold text-foreground">No saved routes yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Bookmark a destination and it will appear here.
            </p>
          </div>
          <button
            onClick={() => router.push('/browse')}
            className="mt-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Browse campus
          </button>
        </motion.div>
      ) : (
        <ul className="space-y-2.5 pb-4" role="list">
          {savedRooms.map((room, i) => {
            const building = getBuildingById(room.buildingId)
            const Icon = TYPE_ICONS[room.type] ?? MapPin

            return (
              <motion.li
                key={room.id}
                role="listitem"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: EASE, duration: 0.22, delay: reduce ? 0 : 0.04 + i * 0.05 }}
              >
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                  {/* Room icon */}
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
                  </span>

                  {/* Room info */}
                  <button
                    onClick={() => router.push(`/room/${room.id}`)}
                    className="min-w-0 flex-1 text-left outline-none"
                    aria-label={`View ${room.name}`}
                  >
                    <p className="truncate font-heading text-[14px] font-bold text-foreground">
                      {room.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {building?.name} &middot; Level {room.floor}
                    </p>
                  </button>

                  <div className="flex shrink-0 items-center gap-2">
                    {/* Delete */}
                    <button
                      onClick={() => unsave(room.id)}
                      aria-label={`Remove ${room.name} from saved`}
                      className="flex size-9 items-center justify-center rounded-lg text-destructive outline-none hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>

                    {/* Start */}
                    {room.navigable && (
                      <button
                        onClick={() => router.push(`/navigate/${room.id}`)}
                        aria-label={`Navigate to ${room.name}`}
                        className={cn(
                          'rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white',
                          'outline-none hover:opacity-90 active:opacity-80 focus-visible:ring-2 focus-visible:ring-ring'
                        )}
                      >
                        Start
                      </button>
                    )}
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ul>
      )}
    </main>
  )
}
