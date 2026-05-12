'use client'

import { useState, useMemo } from 'react'
import { FilterChip } from './FilterChip'
import { RoomCard } from './RoomCard'
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

// Canonical type order for display
const TYPE_ORDER: RoomType[] = [
  'classroom', 'lab', 'studio', 'office', 'lounge', 'cafe', 'library', 'other',
]

interface RoomListWithFiltersProps {
  rooms: Room[]
}

export function RoomListWithFilters({ rooms }: RoomListWithFiltersProps) {
  const [activeTypes, setActiveTypes] = useState<Set<RoomType>>(new Set())

  // Compute unique types present in this room list (in canonical order)
  const availableTypes = useMemo(() => {
    const typeSet = new Set(rooms.map(r => r.type))
    return TYPE_ORDER.filter(t => typeSet.has(t))
  }, [rooms])

  // Count rooms per type so chips show how many results each filter yields
  const countByType = useMemo(() => {
    const map = new Map<RoomType, number>()
    for (const r of rooms) map.set(r.type, (map.get(r.type) ?? 0) + 1)
    return map
  }, [rooms])

  // Filter rooms based on active type filters (empty set = show all)
  const filteredRooms = useMemo(() => {
    if (activeTypes.size === 0) return rooms
    return rooms.filter(r => activeTypes.has(r.type))
  }, [rooms, activeTypes])

  function toggleType(type: RoomType) {
    setActiveTypes(prev => {
      const next = new Set(prev)
      if (next.has(type)) {
        next.delete(type)
      } else {
        next.add(type)
      }
      return next
    })
  }

  return (
    <div>
      {/* Type filter chips — only rendered when there are multiple types */}
      {availableTypes.length > 1 && (
        <div
          className="flex flex-wrap items-center gap-2 px-4 pb-3 pt-4"
          role="group"
          aria-label="Filter by room type"
        >
          {availableTypes.map(type => (
            <FilterChip
              key={type}
              label={`${TYPE_LABELS[type]} (${countByType.get(type) ?? 0})`}
              active={activeTypes.has(type)}
              onToggle={() => toggleType(type)}
            />
          ))}
          {/* Clear all — only visible when at least one filter is active */}
          {activeTypes.size > 0 && (
            <button
              onClick={() => setActiveTypes(new Set())}
              className="text-xs font-medium text-primary underline-offset-2 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1"
              aria-label="Clear all filters"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Room list */}
      <ul
        className="divide-y divide-border px-4"
        role="list"
        aria-label={
          activeTypes.size > 0
            ? `Filtered rooms (${filteredRooms.length})`
            : `All rooms (${rooms.length})`
        }
        aria-live="polite"
        aria-atomic="false"
      >
        {filteredRooms.map(room => (
          <li key={room.id} className="py-1" role="listitem">
            <RoomCard room={room} />
          </li>
        ))}
        {filteredRooms.length === 0 && (
          <li className="py-8 text-center text-sm text-muted-foreground" role="listitem">
            No rooms match the selected filters.
          </li>
        )}
      </ul>
    </div>
  )
}
