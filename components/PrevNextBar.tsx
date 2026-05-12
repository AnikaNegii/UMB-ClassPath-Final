'use client'

import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PrevNextBarProps {
  currentIndex: number
  totalSteps: number
  onPrev: () => void
  onNext: () => void
  onArrive: () => void
}

export function PrevNextBar({ currentIndex, totalSteps, onPrev, onNext, onArrive }: PrevNextBarProps) {
  const isFirst = currentIndex === 0
  const isLast  = currentIndex === totalSteps - 1

  return (
    <div
      className="fixed bottom-16 inset-x-0 z-30 px-4 pb-2"
      role="navigation"
      aria-label="Step navigation"
    >
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card/95 p-2 shadow-lg backdrop-blur-sm">
        {/* Previous */}
        <button
          onClick={onPrev}
          disabled={isFirst}
          aria-label="Previous step"
          aria-disabled={isFirst}
          className={cn(
            'flex size-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-[120ms] outline-none',
            isFirst
              ? 'text-muted-foreground/30 cursor-not-allowed'
              : 'text-foreground hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>

        {/* Step counter */}
        <div className="flex flex-1 flex-col items-center">
          <p className="text-xs font-semibold text-muted-foreground">
            Step {currentIndex + 1} of {totalSteps}
          </p>
          <div className="mt-1 flex gap-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <span
                key={i}
                className={cn(
                  'block h-1 rounded-full transition-all duration-[180ms]',
                  i < currentIndex
                    ? 'w-2 bg-primary/40'
                    : i === currentIndex
                    ? 'w-4 bg-primary'
                    : 'w-2 bg-border'
                )}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Next / Arrive */}
        {isLast ? (
          <button
            onClick={onArrive}
            aria-label="Mark as arrived"
            className={cn(
              'flex h-11 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground',
              'outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            <MapPin className="size-4" aria-hidden="true" />
            Arrive
          </button>
        ) : (
          <button
            onClick={onNext}
            aria-label="Next step"
            className={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-[120ms] outline-none',
              'text-foreground hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
