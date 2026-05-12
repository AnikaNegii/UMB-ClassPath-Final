'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Pin body */}
      <path
        d="M16 1C7.7 1 1 7.7 1 16C1 24.2 6 30.5 16 39C26 30.5 31 24.2 31 16C31 7.7 24.3 1 16 1Z"
        className="fill-primary"
      />
      {/* Amber center dot — wayfinding accent */}
      <circle cx="16" cy="15" r="5.5" className="fill-cp-amber" />
    </svg>
  )
}

export default function LandingPage() {
  const reduce = useReducedMotion()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      {/* Logo: mark + wordmark */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: EASE, duration: 0.28, delay: 0 }}
        className="flex flex-col items-center gap-3"
      >
        <LogoMark className="h-12 w-auto" />
        <h1 className="font-display text-[3.25rem] leading-none text-foreground">
          ClassPath
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: EASE, duration: 0.28, delay: 0.12 }}
        className="text-lg text-muted-foreground"
      >
        Your campus, mapped.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: EASE, duration: 0.18, delay: 0.24 }}
      >
        <Link
          href="/home"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-80"
        >
          Get started
        </Link>
      </motion.div>
    </main>
  )
}
