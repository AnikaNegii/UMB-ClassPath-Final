'use client'

import { useRef, useCallback } from 'react'
import { Accessibility, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RoutePreference } from '@/lib/types'

const OPTIONS: { value: RoutePreference; label: string; description: string }[] = [
  {
    value: 'standard',
    label: 'Standard',
    description: 'Uses elevator to Level 4',
  },
  {
    value: 'accessible',
    label: 'Accessible',
    description: 'Step-free via elevator',
  },
]

interface RoutePreferenceControlProps {
  value: RoutePreference
  onChange: (value: RoutePreference) => void
  className?: string
}

export function RoutePreferenceControl({
  value,
  onChange,
  className,
}: RoutePreferenceControlProps) {
  const groupRef = useRef<HTMLDivElement>(null)

  // Left/right arrow key navigation (roving tabindex pattern)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      e.preventDefault()
      const nextIndex =
        e.key === 'ArrowRight'
          ? (currentIndex + 1) % OPTIONS.length
          : (currentIndex - 1 + OPTIONS.length) % OPTIONS.length
      onChange(OPTIONS[nextIndex].value)
      // Move DOM focus to the newly selected option
      const buttons = groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
      buttons?.[nextIndex].focus()
    },
    [onChange]
  )

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label="Route type"
      className={cn('flex gap-2', className)}
    >
      {OPTIONS.map((opt, i) => {
        const isSelected = value === opt.value
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={e => handleKeyDown(e, i)}
            className={cn(
              'flex flex-1 flex-col items-start rounded-lg border px-3 py-2.5 text-left outline-none',
              'transition-colors duration-[180ms]',
              'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              isSelected
                ? 'border-primary bg-accent text-accent-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30'
            )}
          >
            <span className={cn('flex items-center gap-1.5 text-sm font-semibold', isSelected ? 'text-primary' : 'text-foreground')}>
              {opt.value === 'accessible' && (
                <Accessibility className="size-3.5" aria-hidden="true" />
              )}
              {opt.value === 'standard' && (
                <ArrowRight className="size-3.5" aria-hidden="true" />
              )}
              {opt.label}
            </span>
            <span className="mt-0.5 text-xs">{opt.description}</span>
          </button>
        )
      })}
    </div>
  )
}
