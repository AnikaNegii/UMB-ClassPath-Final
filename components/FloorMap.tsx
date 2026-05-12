'use client'

import { motion, useReducedMotion } from 'motion/react'
import { WaypointPath } from './WaypointPath'
import type { FloorSVGData, Waypoint } from '@/lib/types'

type FloorRectType = 'room' | 'corridor' | 'elevator' | 'entry' | 'stair'

function mapFill(
  type: FloorRectType,
  navigableRoomId: string | undefined,
  destRoomId: string | undefined
): string {
  if (navigableRoomId && navigableRoomId === destRoomId) return 'var(--cp-map-dest)'
  switch (type) {
    case 'corridor':
    case 'entry':   return 'var(--cp-map-corridor)'
    case 'elevator':
    case 'stair':   return 'var(--cp-map-elevator)'
    default:        return 'var(--cp-map-room)'
  }
}

interface FloorMapProps {
  floorData: FloorSVGData
  pathWaypoints: Waypoint[]
  currentWaypoint: Waypoint | null
  destRoomId?: string
  destWaypoint?: Waypoint | null
}

export function FloorMap({
  floorData,
  pathWaypoints,
  currentWaypoint,
  destRoomId,
  destWaypoint,
}: FloorMapProps) {
  const reduce = useReducedMotion()

  // Scale overlay elements proportionally to coordinate space (600 = legacy schematic baseline)
  const coordScale = parseFloat(floorData.viewBox.split(' ')[2]) / 600

  // Destination pin: use waypoint position directly for image-based floors; rect center for schematic
  const destCenter = (() => {
    if (!destRoomId) return null
    if (floorData.imagePath && destWaypoint) {
      return { x: destWaypoint.x, y: destWaypoint.y }
    }
    const destRect = floorData.rects.find(r => r.navigableRoomId === destRoomId)
    return destRect
      ? { x: destRect.x + destRect.width / 2, y: destRect.y + destRect.height / 2 }
      : null
  })()

  const showDestPin =
    destCenter != null &&
    destWaypoint != null &&
    destWaypoint.floor === floorData.floor

  const s = coordScale

  return (
    <svg
      viewBox={floorData.viewBox}
      role="img"
      aria-label={`Floor map, Floor ${floorData.floor}`}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      style={{ background: floorData.imagePath ? '#f5f2ee' : 'var(--cp-map-bg)', display: 'block' }}
    >
      {floorData.imagePath ? (
        // Real architectural floor plan PNG as background
        <image
          href={floorData.imagePath}
          x={0}
          y={0}
          width={3400}
          height={2200}
          preserveAspectRatio="xMidYMin meet"
        />
      ) : (
        <>
          {/* Schematic geometry */}
          {floorData.rects.map(rect => (
            <rect
              key={rect.id}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              rx={3}
              fill={mapFill(rect.type, rect.navigableRoomId, destRoomId)}
              stroke="var(--cp-map-wall)"
              strokeWidth={2}
            />
          ))}

          {floorData.rects
            .filter(r => r.label && r.width > 55)
            .map(rect => (
              <text
                key={`label-${rect.id}`}
                x={rect.x + rect.width / 2}
                y={rect.y + rect.height / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={rect.type === 'elevator' || rect.type === 'stair' ? 8 : 10}
                fontWeight="600"
                fill="var(--cp-map-wall)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                {rect.label}
              </text>
            ))}
        </>
      )}

      {/* Route path */}
      <WaypointPath waypoints={pathWaypoints} scale={s} />

      {/* Destination pin — only on the destination floor */}
      {showDestPin && destCenter && (
        <g>
          <circle cx={destCenter.x} cy={destCenter.y} r={16 * s} fill="var(--primary)" opacity={0.18} />
          <circle cx={destCenter.x} cy={destCenter.y} r={11 * s} fill="var(--primary)" />
          <circle cx={destCenter.x} cy={destCenter.y} r={5 * s}  fill="white" />
        </g>
      )}

      {/* Current position — pulsing amber dot */}
      {currentWaypoint && (
        <g>
          {!reduce && (
            <motion.circle
              cx={currentWaypoint.x}
              cy={currentWaypoint.y}
              fill="none"
              stroke="var(--cp-amber)"
              strokeWidth={2 * s}
              animate={{ r: [12 * s, 26 * s, 12 * s], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <circle cx={currentWaypoint.x} cy={currentWaypoint.y} r={13 * s} fill="white" opacity={0.65} />
          <circle cx={currentWaypoint.x} cy={currentWaypoint.y} r={10 * s} fill="var(--cp-amber)" />
          <circle cx={currentWaypoint.x} cy={currentWaypoint.y} r={4 * s}  fill="white" />
          <text
            x={currentWaypoint.x}
            y={currentWaypoint.y + 22 * s}
            textAnchor="middle"
            fontSize={9 * s}
            fontWeight="700"
            fill="var(--cp-amber)"
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          >
            YOU
          </text>
        </g>
      )}
    </svg>
  )
}
