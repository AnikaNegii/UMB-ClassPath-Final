'use client'

import { notFound, useRouter } from 'next/navigation'
import { use, useState, useCallback } from 'react'
import {
  ArrowLeft, Clock, MapPin, Navigation,
  Footprints, Accessibility, CheckCircle2, Bookmark, BookmarkCheck,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { getRoomById, getBuildingById } from '@/lib/data'
import { useSavedRoutes } from '@/lib/hooks'
import { DemoOnlyNotice } from '@/components/DemoOnlyNotice'
import { cn } from '@/lib/utils'
import type { RoutePreference } from '@/lib/types'

interface Props {
  params: Promise<{ id: string }>
}

const EASE = [0.22, 1, 0.36, 1] as const

export function RoomPageClient({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const reduce = useReducedMotion()
  const { toggle, isSaved } = useSavedRoutes()
  const [preference, setPreference] = useState<RoutePreference>('standard')
  const [bouncing, setBouncing] = useState(false)

  const room = getRoomById(id)

  const handleSave = useCallback(() => {
    if (!room) return
    toggle(room.id)
    if (!reduce) setBouncing(true)
  }, [toggle, room, reduce])

  const handleStart = useCallback(() => {
    if (!room?.navigable) return
    router.push(`/navigate/${room.id}?preference=${preference}`)
  }, [room, router, preference])

  if (!room) return notFound()

  const building = getBuildingById(room.buildingId)
  const saved = isSaved(room.id)

  return (
    <main className="flex-1 px-4 pb-8">
      {/* Back button */}
      <div className="pb-2 pt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Go back"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </button>
      </div>

      {/* Starting point → Destination card */}
      <div className="mt-2 rounded-xl border border-border bg-card p-4">
        <div className="flex gap-3">
          {/* Connector line */}
          <div className="flex flex-col items-center pt-1">
            <MapPin className="size-4 text-primary shrink-0" aria-hidden="true" />
            <div className="my-1 h-6 w-px border-l-2 border-dashed border-muted-foreground/30" />
            <Navigation className="size-4 shrink-0" style={{ color: 'var(--cp-teal)' }} aria-hidden="true" />
          </div>
          <div className="flex-1 space-y-2.5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Starting Point
              </p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">
                Main Entrance — University Hall
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Destination
              </p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">
                {room.name}
                {building && (
                  <span className="ml-1 font-normal text-muted-foreground">
                    · Level {room.floor}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Save button */}
          <motion.button
            onClick={handleSave}
            animate={bouncing ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={bouncing ? { type: 'spring', stiffness: 400, damping: 12 } : undefined}
            onAnimationComplete={() => setBouncing(false)}
            aria-label={saved ? `Unsave ${room.name}` : `Save ${room.name}`}
            aria-pressed={saved}
            className="shrink-0 self-start rounded-full p-1.5 outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
          >
            {saved ? (
              <BookmarkCheck className="size-5 text-primary" aria-hidden="true" />
            ) : (
              <Bookmark className="size-5 text-muted-foreground" aria-hidden="true" />
            )}
          </motion.button>
        </div>

        {room.walkingTime && (
          <div className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
            <Clock className="size-3.5" aria-hidden="true" />
            {room.walkingTime} walking from main entrance
          </div>
        )}
      </div>

      {/* Demo-only notice */}
      {!room.navigable && (
        <div className="mt-4">
          <DemoOnlyNotice />
        </div>
      )}

      {/* Route style selection for navigable rooms */}
      {room.navigable && (
        <div className="mt-4">
          <p className="mb-3 text-sm font-semibold text-foreground">Select your route style</p>

          <div className="space-y-2.5">
            {/* Standard route */}
            <RouteCard
              id="standard"
              selected={preference === 'standard'}
              onSelect={() => setPreference('standard')}
              icon={Footprints}
              title="Quickest Route"
              description="Standard path through the building using all available access points."
              meta={[
                room.walkingTime ?? '~5 min',
                'Elevator included',
              ]}
              reduce={reduce ?? false}
            />

            {/* Accessible route */}
            <RouteCard
              id="accessible"
              selected={preference === 'accessible'}
              onSelect={() => setPreference('accessible')}
              icon={Accessibility}
              title="Accessible Route"
              description="Uses elevators and ramps throughout. Ideal for wheelchairs, strollers, or heavy bags."
              meta={[
                room.walkingTime ?? '~5 min',
                'Elevator required',
              ]}
              reduce={reduce ?? false}
            />
          </div>

          <button
            onClick={handleStart}
            className={cn(
              'mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-white',
              'outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-80'
            )}
          >
            <Navigation className="size-4" aria-hidden="true" />
            Start Navigation
          </button>
        </div>
      )}
    </main>
  )
}

interface RouteCardProps {
  id: string
  selected: boolean
  onSelect: () => void
  icon: React.ElementType
  title: string
  description: string
  meta: string[]
  reduce: boolean
}

function RouteCard({ id, selected, onSelect, icon: Icon, title, description, meta, reduce }: RouteCardProps) {
  return (
    <motion.button
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      initial={reduce ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.22 }}
      className={cn(
        'group relative w-full rounded-xl border p-4 text-left outline-none transition-colors duration-[150ms]',
        'focus-visible:ring-2 focus-visible:ring-ring',
        selected ? 'bg-card shadow-sm' : 'border-border bg-card hover:bg-accent/30'
      )}
      style={selected ? { borderColor: 'var(--cp-teal)', borderWidth: '1.5px' } : undefined}
    >
      {/* Checkmark */}
      {selected && (
        <CheckCircle2
          className="absolute right-3 top-3 size-5"
          style={{ color: 'var(--cp-teal)' }}
          aria-hidden="true"
        />
      )}

      <div className="flex items-start gap-3">
        {/* Icon */}
        <span
          className={cn(
            'flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-[150ms]',
            selected ? '' : 'bg-muted'
          )}
          style={selected ? { background: 'var(--cp-teal-light)' } : undefined}
        >
          <Icon
            className={cn('size-5', selected ? '' : 'text-muted-foreground')}
            style={selected ? { color: 'var(--cp-teal)' } : undefined}
            aria-hidden="true"
          />
        </span>

        <div className="min-w-0 flex-1 pr-6">
          <p
            className="font-heading text-[15px] font-bold leading-snug"
            style={selected ? { color: 'var(--cp-teal)' } : undefined}
          >
            {title}
          </p>
          <p className="mt-1 text-sm text-muted-foreground leading-snug">{description}</p>

          {/* Meta chips */}
          <div className="mt-2.5 flex flex-wrap gap-3">
            {meta.map(item => (
              <span key={item} className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="size-1 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  )
}
