'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import {
  GraduationCap,
  BookOpen,
  Building2,
  Users,
  FlaskConical,
  LibraryBig,
  Briefcase,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Building } from '@/lib/types'

const EASE = [0.22, 1, 0.36, 1] as const

const BUILDING_ICONS: Record<string, React.ElementType> = {
  'university-hall':           GraduationCap,
  'wheatley-hall':             BookOpen,
  'mccormack-hall':            Building2,
  'campus-center':             Users,
  'integrated-science-complex': FlaskConical,
  'healey-library':            LibraryBig,
  'quinn-administration':      Briefcase,
}

const BUILDING_ICON_COLORS: Record<string, { bg: string; color: string }> = {
  'university-hall':           { bg: 'bg-primary',    color: 'text-white' },
  'wheatley-hall':             { bg: '',              color: '' }, // teal — inline style
  'mccormack-hall':            { bg: 'bg-slate-100',  color: 'text-slate-600' },
  'campus-center':             { bg: 'bg-orange-100', color: 'text-orange-600' },
  'integrated-science-complex': { bg: 'bg-purple-100', color: 'text-purple-600' },
  'healey-library':            { bg: 'bg-amber-100',  color: 'text-amber-600' },
  'quinn-administration':      { bg: 'bg-blue-100',   color: 'text-blue-600' },
}

interface BuildingCardProps {
  building: Building
  floorCount: number
  roomCount: number
  index: number
  featured?: boolean
}

export function BuildingCard({
  building,
  floorCount,
  roomCount,
  index,
  featured = false,
}: BuildingCardProps) {
  const reduce = useReducedMotion()
  const Icon = BUILDING_ICONS[building.id] ?? Building2
  const colors = BUILDING_ICON_COLORS[building.id] ?? { bg: 'bg-accent', color: 'text-primary' }
  const isTeal = building.id === 'wheatley-hall'

  if (featured) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: EASE, duration: 0.28, delay: 0 }}
      >
        <Link
          href={`/browse/${building.id}`}
          className={cn(
            'group flex flex-col justify-end rounded-2xl bg-primary p-5',
            'min-h-[160px] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'active:opacity-90'
          )}
          aria-label={`${building.name}, ${floorCount} floors, ${roomCount} rooms`}
        >
          <span
            className="mb-3 self-start rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide"
            style={{ background: 'var(--cp-teal)', color: 'white' }}
          >
            ACADEMIC
          </span>
          <p className="font-heading text-xl font-bold leading-snug text-white">{building.name}</p>
          <p className="mt-1 text-sm text-white/60">
            {roomCount} room{roomCount !== 1 ? 's' : ''} &bull; {floorCount} floor{floorCount !== 1 ? 's' : ''}
          </p>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="w-full"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: EASE, duration: 0.28, delay: reduce ? 0 : 0.04 + index * 0.04 }}
    >
      <Link
        href={`/browse/${building.id}`}
        className={cn(
          'group flex aspect-square w-full flex-col justify-between rounded-2xl bg-card p-4',
          'border border-border shadow-sm',
          'outline-none hover:bg-accent/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'active:opacity-80'
        )}
        aria-label={`${building.name}, ${floorCount} floors, ${roomCount} rooms`}
      >
        <span
          className={cn('flex size-11 shrink-0 items-center justify-center rounded-xl', colors.bg)}
          style={isTeal ? { background: 'var(--cp-teal-light)' } : undefined}
        >
          <Icon
            className={cn('size-5', colors.color)}
            style={isTeal ? { color: 'var(--cp-teal)' } : undefined}
            aria-hidden="true"
          />
        </span>
        <div className="min-w-0">
          <p className="font-heading text-[14px] font-bold leading-snug text-foreground">
            {building.name}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {floorCount} floor{floorCount !== 1 ? 's' : ''}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
