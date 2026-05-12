import Link from 'next/link'
import { Info } from 'lucide-react'

export function DemoOnlyNotice() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3">
      <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div>
        <p className="text-sm font-medium text-foreground">Navigation not available</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Turn-by-turn navigation is live for three rooms on University Hall Level 4.
          This room is included so you can browse the full floor plan.
        </p>
        <Link
          href="/browse/university-hall/4"
          className="mt-2 inline-block text-xs font-semibold text-primary underline underline-offset-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:rounded-sm"
        >
          Browse navigable rooms →
        </Link>
      </div>
    </div>
  )
}
