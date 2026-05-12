'use client'

import { useState, useMemo, useCallback, useId } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Clock, MapPin, ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  searchRooms,
  getBuildingById,
  getRoomById,
  getStartPoints,
} from '@/lib/data'
import { useRecentSearches } from '@/lib/hooks'
import { RoutePreferenceControl } from '@/components/RoutePreferenceControl'
import { BottomSheet } from '@/components/BottomSheet'
import { cn } from '@/lib/utils'
import type { Building, Room, RoutePreference, StartPoint } from '@/lib/types'

const EASE = [0.22, 1, 0.36, 1] as const

// ── Extracted group renderer to avoid TypeScript never-inference inside nested JSX ──
function SearchResultGroup({
  building,
  rooms,
  selectedRoomId,
  onSelect,
}: {
  building: Building
  rooms: Room[]
  selectedRoomId: string | null
  onSelect: (room: Room) => void
}) {
  return (
    <div>
      <div className="px-4 pb-1 pt-3">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          {building.name}
        </p>
      </div>
      {rooms.map((rm) => (
        <button
          key={rm.id}
          role="option"
          aria-selected={selectedRoomId === rm.id}
          onClick={() => onSelect(rm)}
          className={cn(
            'flex w-full items-center gap-3 px-4 py-2.5 text-left outline-none',
            'transition-colors duration-[120ms]',
            'hover:bg-accent/50 focus-visible:bg-accent/50'
          )}
        >
          <MapPin className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{rm.name}</p>
            <p className="text-xs text-muted-foreground">
              {building.name} · Floor {rm.floor}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}

export default function SearchPage() {
  const router = useRouter()
  const reduce = useReducedMotion()
  const listboxId = useId()
  const { recents, addRecent } = useRecentSearches()

  const startOptions = getStartPoints()
  const [selectedStart, setSelectedStart] = useState<StartPoint>(startOptions[0])
  const [showFromPicker, setShowFromPicker] = useState(false)

  const [query, setQuery] = useState('')
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [preference, setPreference] = useState<RoutePreference>('standard')

  // Typeahead results grouped by building
  const groupedResults = useMemo(() => {
    if (!query.trim()) return []
    const results = searchRooms(query)
    const map = new Map<string, Room[]>()
    for (const r of results) {
      const list = map.get(r.buildingId) ?? []
      list.push(r)
      map.set(r.buildingId, list)
    }
    return Array.from(map.entries()).map(([buildingId, roomList]) => ({
      building: getBuildingById(buildingId)!,
      rooms: roomList,
    }))
  }, [query])

  const recentRooms = useMemo(
    () => recents.map(id => getRoomById(id)).filter(Boolean) as Room[],
    [recents]
  )

  const showResults = query.trim().length > 0
  const showRecents = !showResults && recentRooms.length > 0
  const selectedRoomId = selectedRoom?.id ?? null

  const handleSelect = useCallback(
    (room: Room) => {
      setSelectedRoom(room)
      setQuery(room.name)
      addRecent(room.id)
    },
    [addRecent]
  )

  const handleClear = useCallback(() => {
    setSelectedRoom(null)
    setQuery('')
    setPreference('standard')
  }, [])

  function handleStart() {
    if (!selectedRoom) return
    if (selectedRoom.navigable) {
      router.push(`/navigate/${selectedRoom.id}?preference=${preference}&from=${selectedStart.id}`)
    } else {
      router.push(`/room/${selectedRoom.id}`)
    }
  }

  return (
    <main className="flex-1 px-4">
      <header className="pb-4 pt-10">
        <h1 className="font-heading text-2xl font-bold text-foreground">Search</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">Find a room and get directions.</p>
      </header>

      {/* From / To card */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {/* From row */}
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="w-8 text-right text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            From
          </span>
          <div className="h-4 w-px bg-border" aria-hidden="true" />
          <button
            onClick={() => setShowFromPicker(true)}
            className={cn(
              'flex flex-1 items-center gap-1.5 rounded-md py-0.5 text-left text-sm font-medium text-foreground',
              'outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring'
            )}
            aria-haspopup="listbox"
            aria-label={`Starting from: ${selectedStart.shortLabel}. Tap to change.`}
          >
            <MapPin className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            {selectedStart.shortLabel}
            <ChevronDown className="ml-auto size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          </button>
        </div>

        <div className="mx-4 h-px bg-border" aria-hidden="true" />

        {/* To row — search input */}
        <div
          role="combobox"
          aria-expanded={showResults && !selectedRoom}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-owns={listboxId}
          className="flex items-center gap-3 px-4 py-3"
        >
          <span className="w-8 text-right text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            To
          </span>
          <div className="h-4 w-px bg-border" aria-hidden="true" />
          <div className="relative flex flex-1 items-center">
            <Search
              className="pointer-events-none absolute left-0 size-3.5 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Building, room name, or number…"
              value={query}
              onChange={e => {
                setQuery(e.target.value)
                if (selectedRoom) setSelectedRoom(null)
              }}
              aria-label="Search for a destination"
              aria-autocomplete="list"
              aria-controls={listboxId}
              autoComplete="off"
              autoFocus
              className={cn(
                'w-full bg-transparent py-0.5 pl-6 pr-6 text-sm text-foreground outline-none',
                'placeholder:text-muted-foreground'
              )}
            />
            {query && (
              <button
                onClick={handleClear}
                aria-label="Clear destination"
                className="absolute right-0 rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Results listbox — expands inside the card */}
        <AnimatePresence>
          {showResults && !selectedRoom && (
            <motion.div
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reduce ? {} : { opacity: 0, height: 0 }}
              transition={{ ease: EASE, duration: 0.18 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="mx-4 h-px bg-border" aria-hidden="true" />
              <div
                id={listboxId}
                role="listbox"
                aria-label="Search results"
                className="pb-2"
              >
                {groupedResults.length === 0 ? (
                  <p className="px-4 py-5 text-center text-sm text-muted-foreground">
                    No rooms found for &ldquo;{query}&rdquo;. Try a shorter search or browse buildings.
                  </p>
                ) : (
                  groupedResults.map((group) => (
                    <SearchResultGroup
                      key={group.building.id}
                      building={group.building}
                      rooms={group.rooms}
                      selectedRoomId={selectedRoomId}
                      onSelect={handleSelect}
                    />
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recent searches */}
      <AnimatePresence>
        {showRecents && !selectedRoom && (
          <motion.section
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            aria-label="Recent searches"
            className="mt-5"
          >
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Recent
            </h2>
            <ul className="divide-y divide-border rounded-xl border border-border bg-card" role="list">
              {recentRooms.map(room => {
                const building = getBuildingById(room.buildingId)
                return (
                  <li key={room.id} role="listitem">
                    <button
                      onClick={() => handleSelect(room)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left outline-none hover:bg-accent/50 focus-visible:bg-accent/50"
                    >
                      <Clock className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{room.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {building?.name} · Floor {room.floor}
                        </p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Confirm panel — slides in after destination selected */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.section
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? {} : { height: 0, opacity: 0 }}
            transition={{ ease: EASE, duration: 0.28 }}
            style={{ overflow: 'hidden' }}
            aria-label="Route confirmation"
            aria-live="polite"
            className="mt-4"
          >
            <div className="rounded-xl border border-border bg-card p-4">
              {/* Walking time summary — no need to repeat from/to since the card above shows it */}
              {selectedRoom.walkingTime && (
                <p className="mb-4 text-sm text-muted-foreground">
                  {selectedRoom.walkingTime} walk from {selectedStart.shortLabel}
                </p>
              )}

              {selectedRoom.navigable && (
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Route type
                  </p>
                  <RoutePreferenceControl value={preference} onChange={setPreference} />
                </div>
              )}

              <button
                onClick={handleStart}
                className="w-full rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-80"
              >
                {selectedRoom.navigable ? 'Start navigation' : 'View room details'}
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* From picker sheet */}
      <BottomSheet
        open={showFromPicker}
        onClose={() => setShowFromPicker(false)}
        title="Choose starting point"
      >
        <div className="px-4 pb-8 pt-3">
          <h2 className="mb-3 font-heading text-base font-bold text-foreground">
            Where are you starting from?
          </h2>
          <ul role="listbox" aria-label="Starting point options" className="flex flex-col gap-2">
            {startOptions.map(option => {
              const isSelected = selectedStart.id === option.id
              return (
                <li key={option.id} role="option" aria-selected={isSelected}>
                  <button
                    onClick={() => { setSelectedStart(option); setShowFromPicker(false) }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left outline-none',
                      'transition-colors duration-[120ms]',
                      'focus-visible:ring-2 focus-visible:ring-ring',
                      isSelected
                        ? 'border-primary/40 bg-accent'
                        : 'border-border bg-card hover:bg-accent/50'
                    )}
                  >
                    <MapPin
                      className={cn('size-4 shrink-0', isSelected ? 'text-primary' : 'text-muted-foreground')}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className={cn('text-sm font-semibold', isSelected ? 'text-primary' : 'text-foreground')}>
                        {option.shortLabel}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{option.label}</p>
                    </div>
                    {isSelected && (
                      <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </BottomSheet>
    </main>
  )
}
