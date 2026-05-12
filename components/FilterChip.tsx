'use client'

import { cn } from '@/lib/utils'

interface FilterChipProps {
  label: string
  active: boolean
  onToggle: () => void
}

export function FilterChip({ label, active, onToggle }: FilterChipProps) {
  return (
    <button
      role="checkbox"
      aria-checked={active}
      aria-label={`Filter by ${label}`}
      onClick={onToggle}
      className={cn(
        'inline-flex items-center rounded-sm px-3 py-1.5 text-xs font-medium outline-none',
        'border transition-colors duration-[120ms]',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        active
          ? 'border-primary/30 bg-accent text-accent-foreground'
          : 'border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/20'
      )}
    >
      {label}
    </button>
  )
}
