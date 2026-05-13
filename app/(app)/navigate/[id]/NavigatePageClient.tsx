'use client'

import { use, useState, useCallback, useMemo } from 'react'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Layers, Footprints, ChevronLeft, ChevronRight, MapPin, Ban } from 'lucide-react'
import { getRoomById, getRouteByRoomIdAndStart } from '@/lib/data'
import { getFloorSVG } from '@/lib/floor-svgs'
import { useSavedRoutes } from '@/lib/hooks'
import { FloorMap } from '@/components/FloorMap'
import { ArrivalScreen } from '@/components/ArrivalScreen'
import { cn } from '@/lib/utils'
import type { Waypoint } from '@/lib/types'

const EASE = [0.22, 1, 0.36, 1] as const

interface Props {
  params: Promise<{ id: string }>
}

export function NavigatePageClient({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const reduce = useReducedMotion()
  const { toggle, isSaved } = useSavedRoutes()

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [arrived, setArrived] = useState(false)

  const startId = searchParams.get('from') ?? 'uh-main'
  const room  = getRoomById(id)
  const route = room ? getRouteByRoomIdAndStart(id, startId) : undefined

  const handleSave   = useCallback(() => { if (room) toggle(room.id) }, [toggle, room])
  const handlePrev   = useCallback(() => setCurrentStepIndex(i => Math.max(0, i - 1)), [])
  const handleNext   = useCallback(() => {
    if (!route) return
    setCurrentStepIndex(i => Math.min(route.steps.length - 1, i + 1))
  }, [route])
  const handleArrive = useCallback(() => setArrived(true), [])

  if (!room || !route) return notFound()

  const currentStep     = route.steps[currentStepIndex]
  const currentWaypoint: Waypoint | undefined = route.waypoints.find(w => w.id === currentStep.waypointId)
  const destWaypoint    = route.waypoints[route.waypoints.length - 1]
  const currentFloor    = currentWaypoint?.floor ?? 1
  const isFirst         = currentStepIndex === 0
  const isLast          = currentStepIndex === route.steps.length - 1

  const pathWaypoints: Waypoint[] = useMemo(() => {
    const upToNow = route.steps
      .slice(0, currentStepIndex + 1)
      .map(s => route.waypoints.find(w => w.id === s.waypointId))
      .filter((w): w is Waypoint => !!w)
    return upToNow.filter(w => w.floor === currentFloor)
  }, [route, currentStepIndex, currentFloor])

  const floorData = getFloorSVG('university-hall', currentFloor)
  const saved     = isSaved(room.id)
  const StepIcon  = currentStep.isFloorChange ? Layers : Footprints

  return (
    <main className="flex flex-1 flex-col pb-3">
      {arrived ? (
        <ArrivalScreen
          roomName={room.name}
          isSaved={saved}
          onSave={handleSave}
          onDone={() => router.push('/home')}
        />
      ) : (
        <>
          {/* ── Floor map — flex-1 so it grows to fill available height ─── */}
          <div
            className="relative mx-4 mt-4 flex-1 min-h-[160px] overflow-hidden rounded-2xl border border-border shadow-sm"
            style={{ background: '#f5f2ee' }}
          >
            {/* Floor badge — top left */}
            <div
              className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-md bg-card/90 px-2.5 py-1.5 text-xs font-bold text-foreground shadow backdrop-blur-sm"
              aria-live="polite"
              aria-atomic="true"
            >
              <Layers className="size-3.5 text-muted-foreground" aria-hidden="true" />
              Floor {currentFloor}
            </div>

            {/* Destination label — top right */}
            <div className="absolute right-3 top-3 z-10 flex max-w-[55%] items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow backdrop-blur-sm">
              <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span className="truncate">{room.name}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`floor-${currentFloor}`}
                initial={reduce ? false : { opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? {} : { opacity: 0, y: -50 }}
                transition={{ ease: EASE, duration: 0.28 }}
                className="h-full w-full"
              >
                {floorData ? (
                  <FloorMap
                    key={`map-step-${currentStepIndex}`}
                    floorData={floorData}
                    pathWaypoints={pathWaypoints}
                    currentWaypoint={currentWaypoint ?? null}
                    destRoomId={room.id}
                    destWaypoint={destWaypoint}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">Map not available for this floor</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Instruction card — static wrapper, only content inside animates ── */}
          <div
            className="mx-4 mt-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* Animated step content only */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`step-${currentStepIndex}`}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? {} : { opacity: 0, y: -6 }}
                transition={{ ease: EASE, duration: 0.20 }}
              >
                {/* Icon + label row */}
                <div className="mb-3 flex items-center gap-2.5">
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: 'var(--cp-teal-light)' }}
                  >
                    <StepIcon className="size-[18px]" style={{ color: 'var(--cp-teal)' }} aria-hidden="true" />
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Current Instruction
                  </p>
                </div>

                {/* Instruction text */}
                <p className="font-heading text-[16px] font-bold leading-snug text-foreground">
                  {currentStep.instruction}
                </p>

                {/* Step counter + progress bar */}
                <div className="mt-2.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold" style={{ color: 'var(--cp-teal)' }}>
                      Step {currentStepIndex + 1} of {route.steps.length}
                    </p>
                    <div className="flex gap-1.5" aria-hidden="true">
                      {Array.from({ length: route.steps.length }, (_, i) => (
                        <span
                          key={i}
                          className={cn(
                            'block size-2 rounded-full transition-all duration-[180ms]',
                            i < currentStepIndex
                              ? 'bg-muted-foreground/40'
                              : i === currentStepIndex
                              ? 'bg-primary'
                              : 'bg-border'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full bg-border"
                    role="progressbar"
                    aria-valuenow={currentStepIndex + 1}
                    aria-valuemin={1}
                    aria-valuemax={route.steps.length}
                    aria-label={`Step ${currentStepIndex + 1} of ${route.steps.length}`}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentStepIndex + 1) / route.steps.length) * 100}%`,
                        background: 'var(--cp-teal)',
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Static buttons — never animate on step change */}
            <div className="mt-3.5 flex gap-2.5">
              <button
                onClick={handlePrev}
                disabled={isFirst}
                aria-label="Previous step"
                aria-disabled={isFirst}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-3 text-sm font-semibold transition-colors duration-[120ms] outline-none',
                  isFirst
                    ? 'border-border text-muted-foreground/40 cursor-not-allowed'
                    : 'border-border text-foreground hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring'
                )}
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
                Previous Step
              </button>

              {isLast ? (
                <button
                  onClick={handleArrive}
                  aria-label="Mark as arrived"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-sm font-semibold text-white outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <MapPin className="size-4" aria-hidden="true" />
                  Arrived
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  aria-label="Next step"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-sm font-semibold text-white outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Next Step
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <button
              onClick={() => router.back()}
              className={cn(
                'mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-border py-2.5',
                'text-sm font-semibold text-muted-foreground outline-none',
                'hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              <Ban className="size-4" aria-hidden="true" />
              Exit Navigation
            </button>
          </div>
        </>
      )}
    </main>
  )
}
