'use client'

import { MapPin, Building2, Navigation } from 'lucide-react'
import { BottomSheet } from './BottomSheet'
import { useOnboarded } from '@/lib/hooks'

export function OnboardingSheet() {
  const { onboarded, markOnboarded } = useOnboarded()

  return (
    <BottomSheet
      open={!onboarded}
      onClose={markOnboarded}
      title="Welcome to ClassPath"
      className="max-w-lg mx-auto"
    >
      <div className="px-6 pb-8 pt-4">
        <p className="mt-1.5 text-sm text-muted-foreground">
          Indoor wayfinding for UMass Boston campus.
        </p>

        <ul className="mt-6 space-y-4" role="list">
          <li className="flex items-start gap-3">
            <Building2
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden="true"
              strokeWidth={1.75}
            />
            <div>
              <p className="text-sm font-medium text-foreground">Browse the whole campus</p>
              <p className="text-sm text-muted-foreground">
                Explore all 7 buildings, floors, and rooms.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Navigation
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden="true"
              strokeWidth={1.75}
            />
            <div>
              <p className="text-sm font-medium text-foreground">Three live demo rooms</p>
              <p className="text-sm text-muted-foreground">
                Full navigation works for Classroom 4170, Digital Media Lab 4422, and Sculpture
                Studio 4400 — all in University Hall Level 4.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <MapPin
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden="true"
              strokeWidth={1.75}
            />
            <div>
              <p className="text-sm font-medium text-foreground">Save your routes</p>
              <p className="text-sm text-muted-foreground">
                Bookmark destinations for one-tap navigation next time.
              </p>
            </div>
          </li>
        </ul>

        <button
          onClick={markOnboarded}
          className="mt-8 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-80"
          autoFocus
        >
          Let&apos;s go
        </button>
      </div>
    </BottomSheet>
  )
}
