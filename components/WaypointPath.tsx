'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { Waypoint } from '@/lib/types'

interface WaypointPathProps {
  waypoints: Waypoint[]
  scale?: number
}

export function WaypointPath({ waypoints, scale = 1 }: WaypointPathProps) {
  const reduce = useReducedMotion()

  if (waypoints.length < 2) return null

  const d = waypoints
    .map((w, i) => `${i === 0 ? 'M' : 'L'} ${w.x} ${w.y}`)
    .join(' ')

  const s = scale
  const dashPeriod = 28 * s  // one full dash+gap cycle

  return (
    <g>
      {/* White halo for legibility over floor plan */}
      <path
        d={d}
        fill="none"
        stroke="white"
        strokeWidth={10 * s}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.55}
      />

      {/* Solid route line */}
      <motion.path
        d={d}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={6 * s}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Flowing white dashes indicating direction of travel */}
      {!reduce && (
        <motion.path
          d={d}
          fill="none"
          stroke="white"
          strokeWidth={2.5 * s}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${10 * s} ${18 * s}`}
          animate={{ strokeDashoffset: [dashPeriod, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
          initial={{ pathLength: 0 }}
        />
      )}
    </g>
  )
}
