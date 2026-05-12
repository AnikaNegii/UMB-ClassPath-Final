'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  BookOpen, FlaskConical, Palette, Briefcase, Coffee,
  LibraryBig, MapPin, Navigation, Bookmark, BookmarkCheck,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useSavedRoutes } from '@/lib/hooks'
import { DemoOnlyNotice } from './DemoOnlyNotice'
import { cn } from '@/lib/utils'
import type { Room, RoomType } from '@/lib/types'

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

const TYPE_LABELS: Record<RoomType, string> = {
  classroom: 'Classroom',
  lab:       'Lab',
  studio:    'Studio',
  office:    'Office',
  lounge:    'Lounge',
  cafe:      'Café',
  library:   'Library',
  other:     'Room',
}

interface RoomSelectorProps {
  rooms: Room[]
}

export function RoomSelector({ rooms }: RoomSelectorProps) {
  const router = useRouter()
  const reduce = useReducedMotion()
  const { toggle, isSaved } = useSavedRoutes()

  const firstNavigable = rooms.find(r => r.navigable)
  const [selectedId, setSelectedId] = useState<string>(
    firstNavigable?.id ?? rooms[0]?.id ?? ''
  )

  const selectedRoom = rooms.find(r => r.id === selectedId)
  const canNavigate  = selectedRoom?.navigable ?? false
  const saved        = selectedRoom ? isSaved(selectedRoom.id) : false

  const handleStart = useCallback(() => {
    if (!selectedRoom?.navigable) return
    router.push(`/navigate/${selectedRoom.id}`)
  }, [router, selectedRoom])

  const handleSave = useCallback(() => {
    if (!selectedRoom) return
    toggle(selectedRoom.id)
  }, [toggle, selectedRoom])

  if (rooms.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-sm text-muted-foreground">
        No rooms on this floor.
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Select Room
      </p>

      {/* Room list with radio selection */}
      <ul className="space-y-2 px-4" role="radiogroup" aria-label="Select a room">
        {rooms.map((room, i) => {
          const Icon = TYPE_ICONS[room.type]
          const isSelected = room.id === selectedId

          return (
            <motion.li
              key={room.id}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: EASE, duration: 0.22, delay: reduce ? 0 : i * 0.04 }}
            >
              <button
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedId(room.id)}
                className={cn(
                  'group w-full flex items-center gap-3 rounded-xl border p-4 text-left outline-none transition-colors duration-[150ms]',
                  'focus-visible:ring-2 focus-visible:ring-ring',
                  isSelected
                    ? 'border-cp-teal bg-card shadow-sm'
                    : 'border-border bg-card hover:bg-accent/30'
                )}
                style={isSelected ? { borderColor: 'var(--cp-teal)' } : undefined}
              >
                {/* Type icon */}
                <span
                  className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-[150ms]',
                    isSelected ? '' : 'bg-muted'
                  )}
                  style={isSelected ? { background: 'var(--cp-teal-light)' } : undefined}
                >
                  <Icon
                    className={cn('size-4.5', isSelected ? '' : 'text-muted-foreground')}
                    style={isSelected ? { color: 'var(--cp-teal)' } : undefined}
                    aria-hidden="true"
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="font-heading text-[14px] font-semibold text-foreground">
                    {room.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {TYPE_LABELS[room.type]}
                    {!room.navigable && ' · Browse only'}
                  </p>
                </div>

                {/* Radio indicator */}
                <span
                  className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-[150ms]',
                    isSelected ? 'border-cp-teal' : 'border-border'
                  )}
                  style={isSelected ? { borderColor: 'var(--cp-teal)' } : undefined}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: 'var(--cp-teal)' }}
                    />
                  )}
                </span>
              </button>
            </motion.li>
          )
        })}
      </ul>

      {/* Explain why navigation is unavailable for the selected room */}
      {selectedRoom && !canNavigate && (
        <div className="px-4 pt-4">
          <DemoOnlyNotice />
        </div>
      )}

      {/* CTAs — flow below room list, pb clears the fixed nav */}
      <div className="px-4 pt-5 pb-10 space-y-2.5">
        <button
          onClick={handleStart}
          disabled={!canNavigate}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-white transition-opacity',
            'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            canNavigate
              ? 'bg-primary hover:opacity-90 active:opacity-80'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
        >
          <Navigation className="size-4" aria-hidden="true" />
          Start Navigation
        </button>

        <button
          onClick={handleSave}
          disabled={!selectedRoom}
          aria-pressed={saved}
          aria-label={saved ? `Unsave ${selectedRoom?.name}` : `Save ${selectedRoom?.name}`}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl border py-3.5 font-semibold transition-colors duration-[150ms]',
            'outline-none focus-visible:ring-2 focus-visible:ring-ring',
            saved
              ? 'border-primary/30 bg-accent text-primary'
              : 'border-border bg-card text-foreground hover:bg-accent/40',
            !selectedRoom && 'opacity-50 cursor-not-allowed'
          )}
        >
          {saved ? (
            <BookmarkCheck className="size-4" aria-hidden="true" />
          ) : (
            <Bookmark className="size-4" aria-hidden="true" />
          )}
          {saved ? 'Saved to Routes' : 'Save to Routes'}
        </button>
      </div>
    </div>
  )
}
