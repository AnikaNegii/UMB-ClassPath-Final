'use client'

import { BottomSheet } from './BottomSheet'
import type { RouteStep } from '@/lib/types'

interface AlreadyInsideSheetProps {
  open: boolean
  steps: RouteStep[]
  onSelect: (index: number) => void
  onClose: () => void
}

export function AlreadyInsideSheet({ open, steps, onSelect, onClose }: AlreadyInsideSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Pick your starting step">
      <div className="px-4 pb-6 pt-3">
        <h2 className="mb-3 font-heading text-base font-bold text-foreground">
          Where are you starting from?
        </h2>
        <ol role="list" className="flex flex-col divide-y divide-border rounded-lg border border-border bg-background">
          {steps.map((step, i) => (
            <li key={step.waypointId} role="listitem">
              <button
                onClick={() => { onSelect(i); onClose() }}
                className="flex w-full items-start gap-3 px-4 py-3 text-left outline-none hover:bg-accent/50 focus-visible:bg-accent/50"
              >
                <span
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <p className="text-sm text-foreground">{step.instruction}</p>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </BottomSheet>
  )
}
