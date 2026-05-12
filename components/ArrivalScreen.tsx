'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Bookmark, BookmarkCheck, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ArrivalScreenProps {
  roomName: string
  isSaved: boolean
  onSave: () => void
  onDone: () => void
}

const EASE = [0.22, 1, 0.36, 1] as const

export function ArrivalScreen({ roomName, isSaved, onSave, onDone }: ArrivalScreenProps) {
  const reduce = useReducedMotion()

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center"
      role="status"
      aria-live="assertive"
      aria-label="You have arrived"
    >
      {/* Teal checkmark with glow */}
      <motion.div
        initial={reduce ? false : { scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: 'spring', stiffness: 320, damping: 22, delay: 0.05 }
        }
        className="relative mb-6 flex size-24 items-center justify-center"
      >
        {/* Outer glow ring */}
        <span
          className="absolute inset-0 rounded-full opacity-20"
          style={{ background: 'var(--cp-teal)' }}
          aria-hidden="true"
        />
        <span
          className="absolute inset-3 rounded-full opacity-30"
          style={{ background: 'var(--cp-teal)' }}
          aria-hidden="true"
        />
        {/* Check circle */}
        <span
          className="relative flex size-16 items-center justify-center rounded-full"
          style={{ background: 'var(--cp-teal)' }}
        >
          {/* Checkmark SVG */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-7"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { ease: EASE, duration: 0.28, delay: 0.18 }}
      >
        <h1 className="font-heading text-2xl font-bold text-foreground">You have arrived!</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          You&apos;ve reached the{' '}
          <span className="font-semibold" style={{ color: 'var(--cp-teal)' }}>
            {roomName}
          </span>
          .
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { ease: EASE, duration: 0.28, delay: 0.28 }}
        className="mt-8 flex w-full max-w-xs flex-col gap-3"
      >
        {/* Save this route — primary */}
        <button
          onClick={onSave}
          aria-pressed={isSaved}
          aria-label={isSaved ? `Unsave ${roomName}` : `Save route to ${roomName}`}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-white',
            'outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            isSaved ? 'bg-primary/70' : 'bg-primary'
          )}
        >
          {isSaved ? (
            <BookmarkCheck className="size-4" aria-hidden="true" />
          ) : (
            <Bookmark className="size-4" aria-hidden="true" />
          )}
          {isSaved ? 'Saved to Routes' : 'Save this Route'}
        </button>

        {/* Back to Home — outlined */}
        <button
          onClick={onDone}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3.5 font-semibold text-foreground',
            'outline-none hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          )}
        >
          <Home className="size-4" aria-hidden="true" />
          Back to Home
        </button>
      </motion.div>
    </div>
  )
}
