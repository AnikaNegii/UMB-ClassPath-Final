'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RouteStep } from '@/lib/types'

interface StepListProps {
  steps: RouteStep[]
  currentIndex: number
  onStepTap: (index: number) => void
}

export function StepList({ steps, currentIndex, onStepTap }: StepListProps) {
  return (
    <ol role="list" aria-label="Navigation steps" className="flex flex-col gap-1">
      {steps.map((step, i) => {
        const isDone    = i < currentIndex
        const isCurrent = i === currentIndex

        return (
          <li
            key={step.waypointId}
            role="listitem"
            aria-current={isCurrent ? 'step' : undefined}
          >
            <button
              onClick={() => onStepTap(i)}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none',
                'transition-colors duration-[120ms]',
                isCurrent
                  ? 'bg-accent'
                  : 'hover:bg-accent/40 focus-visible:bg-accent/40'
              )}
            >
              {/* Step number / check */}
              <span
                className={cn(
                  'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
                  isDone
                    ? 'bg-primary/20 text-primary'
                    : isCurrent
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                )}
                aria-hidden="true"
              >
                {isDone ? <Check className="size-3" /> : i + 1}
              </span>

              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    'text-sm leading-snug',
                    isDone
                      ? 'text-muted-foreground'
                      : isCurrent
                      ? 'font-semibold text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {step.instruction}
                </p>
              </div>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
