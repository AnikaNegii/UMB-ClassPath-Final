'use client'

import Link from 'next/link'
import { Search, Building2, Bookmark, GraduationCap, Navigation } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { OnboardingSheet } from '@/components/OnboardingSheet'

const EASE = [0.22, 1, 0.36, 1] as const

// Quick-access demo rooms shown on the home screen for returning users
const QUICK_ROOMS = [
  { id: 'uh-4170', label: 'Classroom 4170', sub: 'UH · Level 4' },
  { id: 'uh-4422', label: 'Digital Media Lab', sub: 'UH · Level 4' },
  { id: 'uh-4400', label: 'Sculpture Studio', sub: 'UH · Level 4' },
]

export default function HomePage() {
  const reduce = useReducedMotion()

  return (
    <>
      <main className="flex-1 px-4">
        {/* App identity */}
        <div className="flex flex-col items-center pt-10 pb-6">
          <motion.div
            initial={reduce ? false : { scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ease: EASE, duration: 0.28 }}
            className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary shadow-lg"
          >
            <GraduationCap className="size-8 text-primary-foreground" aria-hidden="true" />
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE, duration: 0.28, delay: reduce ? 0 : 0.08 }}
            className="font-heading text-3xl font-bold text-foreground"
          >
            Class Path
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE, duration: 0.28, delay: reduce ? 0 : 0.14 }}
            className="mt-1 text-sm text-muted-foreground"
          >
            Find your path to success.
          </motion.p>
        </div>

        <div className="space-y-3">
          {/* Primary: large search card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE, duration: 0.28, delay: reduce ? 0 : 0.18 }}
          >
            <Link
              href="/search"
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-primary p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-90"
              aria-label="Search for a room"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Search className="size-6 text-white" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-heading text-lg font-bold leading-snug text-white">
                  Search for Room
                </p>
                <p className="text-sm text-white/65">Enter a code or name to start</p>
              </div>
              {/* Decorative background icon */}
              <Search
                className="absolute right-4 top-1/2 size-20 -translate-y-1/2 text-white/10"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {/* Secondary: Browse + Saved in 2-col grid */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: EASE, duration: 0.28, delay: reduce ? 0 : 0.24 }}
            >
              <Link
                href="/browse"
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 outline-none hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring active:opacity-80"
                aria-label="Browse buildings"
              >
                <span
                  className="flex size-11 items-center justify-center rounded-xl"
                  style={{ background: 'var(--cp-teal-light)' }}
                >
                  <Building2 className="size-5" style={{ color: 'var(--cp-teal)' }} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-[15px] font-bold leading-snug text-foreground">
                    Browse Buildings
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Explore campus halls</p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: EASE, duration: 0.28, delay: reduce ? 0 : 0.30 }}
            >
              <Link
                href="/saved"
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 outline-none hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring active:opacity-80"
                aria-label="Saved routes"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-orange-100">
                  <Bookmark className="size-5 text-orange-500" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-[15px] font-bold leading-snug text-foreground">
                    Saved Routes
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Your frequent paths</p>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Quick-navigate demo rooms — Flexibility & Efficiency of Use:
              Returning users can jump straight to a navigable room without
              going through Search → Select → Confirm. */}
          <motion.section
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE, duration: 0.28, delay: reduce ? 0 : 0.36 }}
            aria-label="Quick navigate"
          >
            <h2 className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Quick Navigate
            </h2>
            <ul className="divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden" role="list">
              {QUICK_ROOMS.map(({ id, label, sub }) => (
                <li key={id} role="listitem">
                  <Link
                    href={`/room/${id}`}
                    className="flex items-center gap-3 px-4 py-3 outline-none hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring active:opacity-80"
                    aria-label={`Navigate to ${label}`}
                  >
                    <Navigation className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground truncate">{label}</p>
                      <p className="text-xs text-muted-foreground">{sub}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.section>
        </div>
      </main>

      <OnboardingSheet />
    </>
  )
}
